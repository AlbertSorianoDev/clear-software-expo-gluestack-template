import clsx from "clsx";
import { useEffect, useState } from "react";

import { useQuestionContext } from "../hooks/use-question-context";

import { InputTypeEnum } from "@/data/forms/types/enums";
import { Input, InputField } from "@/screens/components/ui/input";
import { Text } from "@/screens/components/ui/text";

export const TextQuestion = ({
  id,
  type,
}: {
  id: number;
  type: InputTypeEnum.shortText | InputTypeEnum.longText;
}) => {
  const { submission, isLoading } = useQuestionContext(id);
  const [textAnswer, setTextAnswer] = useState("");

  useEffect(() => {
    if (submission?.textResponse) {
      setTextAnswer(submission.textResponse.text);
    }
  }, [submission?.textResponse]);

  if (isLoading) return <Text>Loading...</Text>;

  return (
    <Input
      variant="underlined"
      className={clsx(
        "",
        { "w-1/2": type == InputTypeEnum.shortText },
        { "w-full": type == InputTypeEnum.longText },
      )}
    >
      <InputField
        placeholder={`${type == InputTypeEnum.shortText ? "Short" : "Long"} answer text`}
        value={textAnswer}
        onChangeText={setTextAnswer}
      />
    </Input>
  );
};
