import clsx from "clsx";
import { useEffect, useState } from "react";

import { useParsedSearchParams } from "../hooks/use-parsed-submission-page-params";
import { useQuestionContext } from "../hooks/use-question-context";

import { useGetFormSubmission } from "@/data/forms/hooks/use-get-form-submission";
import { usePostFormFieldResponse } from "@/data/forms/hooks/use-post-form-field-response";
import { useUpdateFormFieldResponse } from "@/data/forms/hooks/use-update-form-field-response";
import { InputTypeEnum } from "@/data/forms/types/enums";
import { Input, InputField } from "@/screens/components/ui/input";
import { Text } from "@/screens/components/ui/text";
import { Textarea, TextareaInput } from "@/screens/components/ui/textarea";

export const TextQuestion = ({
  id,
  type,
}: {
  id: number;
  type: InputTypeEnum.shortText | InputTypeEnum.longText;
}) => {
  const { submissionId } = useParsedSearchParams();
  useParsedSearchParams();
  const { data: formSubmission } = useGetFormSubmission(submissionId ?? 0);
  const { fieldSubmission, isLoading } = useQuestionContext(id);
  const { mutateAsync: postFormFieldResponse } = usePostFormFieldResponse();
  const { mutateAsync: updateFormFieldResponse } = useUpdateFormFieldResponse();

  const [textAnswer, setTextAnswer] = useState("");
  const [optionKey, setOptionKey] = useState(0);

  useEffect(() => {
    if (fieldSubmission?.textResponse) setOptionKey((prev) => prev + 1);
    if (fieldSubmission?.textResponse) {
      setTextAnswer(fieldSubmission.textResponse.text);
    }
  }, [fieldSubmission?.textResponse]);

  if (isLoading) return <Text>Loading...</Text>;

  return type == InputTypeEnum.shortText ? (
    <Input
      key={optionKey}
      variant="underlined"
      className={clsx("", { "w-1/2": type == InputTypeEnum.shortText })}
      isReadOnly={formSubmission?.isSubmitted}
    >
      <InputField
        placeholder={"Your answer"}
        value={textAnswer}
        onChangeText={setTextAnswer}
        onBlur={async () => {
          if (!fieldSubmission?.textResponse) {
            await postFormFieldResponse({
              formSubmissionId: submissionId ?? 0,
              body: { formFieldId: id, textAnswer: textAnswer },
            });
          } else {
            await updateFormFieldResponse({
              fieldResponseId: fieldSubmission.id ?? 0,
              body: { textAnswer: textAnswer },
            });
          }
        }}
      />
    </Input>
  ) : (
    <Textarea size="md" isReadOnly={formSubmission?.isSubmitted} className="h-32 w-full">
      <TextareaInput placeholder="Your answer" />
    </Textarea>
  );
};
