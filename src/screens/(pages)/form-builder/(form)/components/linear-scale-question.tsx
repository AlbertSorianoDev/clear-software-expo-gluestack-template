import { useEffect, useState } from "react";

import { useParsedSearchParams } from "../hooks/use-parsed-submission-page-params";
import { useQuestionContext } from "../hooks/use-question-context";

import { useGetFormSubmission } from "@/data/forms/hooks/use-get-form-submission";
import { usePostFormFieldResponse } from "@/data/forms/hooks/use-post-form-field-response";
import { useUpdateFormFieldResponse } from "@/data/forms/hooks/use-update-form-field-response";
import { Box } from "@/screens/components/ui/box";
import { CircleIcon } from "@/screens/components/ui/icon";
import {
  Radio,
  RadioGroup,
  RadioIcon,
  RadioIndicator,
  RadioLabel,
} from "@/screens/components/ui/radio";
import { Text } from "@/screens/components/ui/text";

interface ScaleValue {
  label: string;
  value: number;
}

const scale: { min: ScaleValue; max: ScaleValue } = {
  min: { value: 0, label: "Negative" },
  max: { value: 10, label: "Positive" },
};

const options = Array.from(
  { length: scale.max.value - scale.min.value + 1 },
  (_, i) => scale.min.value + i,
);

export const LinearScaleQuestion = ({ id }: { id: number }) => {
  const { submissionId } = useParsedSearchParams();

  const { data: formSubmission } = useGetFormSubmission(submissionId ?? 0);
  const { fieldSubmission, isLoading } = useQuestionContext(id);
  const { mutateAsync: postFormFieldResponse } = usePostFormFieldResponse();
  const { mutateAsync: updateFormFieldResponse } = useUpdateFormFieldResponse();

  const [value, setValue] = useState("");
  const [optionKey, setOptionKey] = useState(0);

  useEffect(() => {
    if (fieldSubmission?.numericResponse) setOptionKey((prev) => prev + 1);
    if (fieldSubmission?.numericResponse?.number) {
      setValue(fieldSubmission.numericResponse.number.toString());
    }
  }, [fieldSubmission?.numericResponse]);

  if (isLoading) return <Text>Loading...</Text>;

  return (
    <Box className="flex flex-col gap-2 md:flex-row md:items-end">
      <Text className="md:mx-4">{scale.min.label}</Text>

      <RadioGroup
        key={optionKey}
        value={value.toString()}
        isReadOnly={formSubmission?.isSubmitted}
        onChange={async (e) => {
          setValue(e);
          if (!fieldSubmission) {
            await postFormFieldResponse({
              formSubmissionId: submissionId ?? 0,
              body: { formFieldId: id, numericAnswer: parseInt(e) },
            });
          } else {
            await updateFormFieldResponse({
              fieldResponseId: fieldSubmission.id ?? 0,
              body: { numericAnswer: parseInt(value) },
            });
          }
        }}
        className="flex-1"
      >
        <Box className="ml-8 flex-1 flex-col md:ml-0 md:flex-row md:justify-between">
          {options.map((option) => (
            <Radio
              key={option}
              value={option.toString()}
              size="md"
              className="flex-row items-center gap-2 md:flex-col-reverse"
            >
              <RadioIndicator>
                <RadioIcon as={CircleIcon} />
              </RadioIndicator>
              <RadioLabel>{option}</RadioLabel>
            </Radio>
          ))}
        </Box>
      </RadioGroup>

      <Text className="md:mx-4">{scale.max.label}</Text>
    </Box>
  );
};
