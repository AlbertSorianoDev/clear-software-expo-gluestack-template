import { useEffect, useState } from "react";

import { useParsedSearchParams } from "../hooks/use-parsed-submission-page-params";
import { useQuestionContext } from "../hooks/use-question-context";
import { findSelectInitialLabel } from "../utils/find-select-initial-label";

import { useGetFormSubmission } from "@/data/forms/hooks/use-get-form-submission";
import { usePostFormFieldResponse } from "@/data/forms/hooks/use-post-form-field-response";
import { useUpdateFormFieldResponse } from "@/data/forms/hooks/use-update-form-field-response";
import { ChevronDownIcon } from "@/screens/components/ui/icon";
import {
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from "@/screens/components/ui/select";
import { Text } from "@/screens/components/ui/text";
import { VStack } from "@/screens/components/ui/vstack";

export const DropdownQuestion = ({ id }: { id: number }) => {
  const { submissionId } = useParsedSearchParams();

  const { data: formSubmission } = useGetFormSubmission(submissionId ?? 0);
  const { fieldSubmission, options, isLoading } = useQuestionContext(id);
  const { mutateAsync: postFormFieldResponse } = usePostFormFieldResponse();
  const { mutateAsync: updateFormFieldResponse } = useUpdateFormFieldResponse();

  const [dropdownValue, setDropdownValue] = useState("");
  const [optionKey, setOptionKey] = useState(0);

  useEffect(() => {
    if (fieldSubmission?.optionResponse) setOptionKey((prev) => prev + 1);
    if (fieldSubmission?.optionResponse?.fieldOptionIds.length) {
      setDropdownValue(fieldSubmission.optionResponse.fieldOptionIds[0].toString());
    }
  }, [fieldSubmission?.optionResponse, options]);

  const initialLabel = findSelectInitialLabel(
    fieldSubmission?.optionResponse?.fieldOptionIds?.[0],
    options,
  );

  if (isLoading) return <Text>Loading...</Text>;

  return (
    <VStack space="md" className="md:max-w-[50%]">
      <Select
        key={optionKey}
        selectedValue={dropdownValue}
        isDisabled={formSubmission?.isSubmitted}
        onValueChange={async (e) => {
          setDropdownValue(e);

          if (!fieldSubmission) {
            await postFormFieldResponse({
              formSubmissionId: submissionId ?? 0,
              body: { formFieldId: id, optionsIds: [parseInt(e)] },
            });
          } else {
            await updateFormFieldResponse({
              fieldResponseId: fieldSubmission.id ?? 0,
              body: { optionsIds: [parseInt(e)] },
            });
          }
        }}
        {...(initialLabel ? { initialLabel } : {})}
      >
        <SelectTrigger variant="outline" size="md">
          <SelectInput placeholder="Select option" />
          <SelectIcon className="mr-3" as={ChevronDownIcon} />
        </SelectTrigger>
        <SelectPortal>
          <SelectBackdrop />
          <SelectContent>
            <SelectDragIndicatorWrapper>
              <SelectDragIndicator />
            </SelectDragIndicatorWrapper>
            {options
              ?.sort((a, b) => a.order - b.order)
              .map((option, index) => (
                <SelectItem key={index} value={option.id.toString()} label={option.label} />
              ))}
          </SelectContent>
        </SelectPortal>
      </Select>
    </VStack>
  );
};
