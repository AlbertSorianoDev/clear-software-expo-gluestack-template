import clsx from "clsx";
import { useState } from "react";

import { InputTypeEnum } from "@/data/forms/types/enums";
import { Input, InputField } from "@/screens/components/ui/input";

export const ShortTextQuestion = ({
  type,
}: {
  type: InputTypeEnum.shortText | InputTypeEnum.longText;
}) => {
  const [textAnswer, setTextAnswer] = useState("");
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
