import { Circle } from "lucide-react-native";
import { useEffect, useState } from "react";

import { useParsedSearchParams } from "../hooks/use-parsed-submission-page-params";
import { useQuestionContext } from "../hooks/use-question-context";

import { useGetFormSubmission } from "@/data/forms/hooks/use-get-form-submission";
import { usePostFormFieldResponse } from "@/data/forms/hooks/use-post-form-field-response";
import { useUpdateFormFieldResponse } from "@/data/forms/hooks/use-update-form-field-response";
import {
  Radio,
  RadioGroup,
  RadioIcon,
  RadioIndicator,
  RadioLabel,
} from "@/screens/components/ui/radio";
import { Text } from "@/screens/components/ui/text";
import { VStack } from "@/screens/components/ui/vstack";

export const SingleChoiceQuestion = ({ id }: { id: number }) => {
  const { submissionId } = useParsedSearchParams();

  const { data: formSubmission } = useGetFormSubmission(submissionId ?? 0);
  const { fieldSubmission, options, isLoading } = useQuestionContext(id);
  const { mutateAsync: postFormFieldResponse } = usePostFormFieldResponse();
  const { mutateAsync: updateFormFieldResponse } = useUpdateFormFieldResponse();

  const [singleChoice, setSingleChoice] = useState("");
  const [optionKey, setOptionKey] = useState(0);

  useEffect(() => {
    if (fieldSubmission?.optionResponse) setOptionKey((prev) => prev + 1);
    if (fieldSubmission?.optionResponse?.fieldOptionIds.length) {
      setSingleChoice(fieldSubmission.optionResponse.fieldOptionIds[0].toString());
    }
  }, [fieldSubmission?.optionResponse]);

  if (isLoading) return <Text>Loading...</Text>;

  return (
    <VStack space="md">
      <RadioGroup
        isReadOnly={formSubmission?.isSubmitted}
        key={optionKey}
        value={singleChoice}
        onChange={async (e) => {
          setSingleChoice(e);
          if (!fieldSubmission?.optionResponse) {
            await postFormFieldResponse({
              formSubmissionId: submissionId ?? 0,
              body: { formFieldId: id, optionsIds: [e] },
            });
          } else {
            await updateFormFieldResponse({
              fieldResponseId: fieldSubmission.id ?? 0,
              body: { optionsIds: [parseInt(e)] },
            });
          }
        }}
      >
        {options
          ?.sort((a, b) => a.order - b.order)
          .map((option, index) => (
            <Radio value={option.id.toString()} size="sm" key={index}>
              <RadioIndicator>
                <RadioIcon as={Circle} />
              </RadioIndicator>
              <RadioLabel>{option.label}</RadioLabel>
            </Radio>
          ))}
      </RadioGroup>
    </VStack>
  );
};
