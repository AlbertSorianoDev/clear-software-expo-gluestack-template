import clsx from "clsx";
import { useState } from "react";

import { Input, InputField } from "@/screens/components/ui/input";
import { FormInputTypeEnum } from "@/screens/features/types/form-input-type";

export const ShortTextQuestion = ({
  type,
}: {
  type: FormInputTypeEnum.shortText | FormInputTypeEnum.longText;
}) => {
  const [textAnswer, setTextAnswer] = useState("");
  return (
    <Input
      variant="underlined"
      className={clsx(
        "",
        { "w-1/2": type == FormInputTypeEnum.shortText },
        { "w-full": type == FormInputTypeEnum.longText },
      )}
    >
      <InputField
        placeholder={`${type == FormInputTypeEnum.shortText ? "Short" : "Long"} answer text`}
        value={textAnswer}
        onChangeText={setTextAnswer}
      />
    </Input>
  );
};
