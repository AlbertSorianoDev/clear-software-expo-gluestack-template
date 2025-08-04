import { Check } from "lucide-react-native";
import { useEffect, useState } from "react";

import { useParsedSearchParams } from "../hooks/use-parsed-submission-page-params";
import { useQuestionContext } from "../hooks/use-question-context";

import { useGetFormSubmission } from "@/data/forms/hooks/use-get-form-submission";
import { usePostFormFieldResponse } from "@/data/forms/hooks/use-post-form-field-response";
import { useUpdateFormFieldResponse } from "@/data/forms/hooks/use-update-form-field-response";
import {
  Checkbox,
  CheckboxGroup,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
} from "@/screens/components/ui/checkbox";
import { Text } from "@/screens/components/ui/text";
import { VStack } from "@/screens/components/ui/vstack";

export const MultipleChoiceQuestion = ({ id }: { id: number }) => {
  const { submissionId } = useParsedSearchParams();

  const { data: formSubmission } = useGetFormSubmission(submissionId ?? 0);
  const { fieldSubmission, options, isLoading } = useQuestionContext(id);
  const { mutateAsync: postFormFieldResponse } = usePostFormFieldResponse();
  const { mutateAsync: updateFormFieldResponse } = useUpdateFormFieldResponse();

  const [values, setValues] = useState<string[]>([]);
  const [optionKey, setOptionKey] = useState(0);

  useEffect(() => {
    if (fieldSubmission?.optionResponse) setOptionKey((prev) => prev + 1);
    if (fieldSubmission?.optionResponse) {
      setValues(fieldSubmission.optionResponse.fieldOptionIds.map((id) => id.toString()));
    }
  }, [fieldSubmission?.optionResponse]);

  if (isLoading) return <Text>Loading...</Text>;

  return (
    <VStack space="md">
      <CheckboxGroup
        key={optionKey}
        isReadOnly={formSubmission?.isSubmitted}
        value={values}
        onChange={async (keys) => {
          setValues(keys);
          const ids = (keys as string[]).map((key) => parseInt(key));

          if (!fieldSubmission) {
            await postFormFieldResponse({
              formSubmissionId: submissionId ?? 0,
              body: { formFieldId: id, optionsIds: ids },
            });
          } else {
            await updateFormFieldResponse({
              fieldResponseId: fieldSubmission.id ?? 0,
              body: { optionsIds: ids },
            });
          }
        }}
      >
        <VStack space="md">
          {options
            ?.sort((a, b) => a.order - b.order)
            .map((option, index) => (
              <Checkbox value={option.id.toString()} size="sm" key={index}>
                <CheckboxIndicator>
                  <CheckboxIcon as={Check} />
                </CheckboxIndicator>
                <CheckboxLabel>{option.label}</CheckboxLabel>
              </Checkbox>
            ))}
        </VStack>
      </CheckboxGroup>
    </VStack>
  );
};
