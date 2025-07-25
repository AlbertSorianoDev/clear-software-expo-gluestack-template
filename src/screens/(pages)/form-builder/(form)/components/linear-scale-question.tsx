import { useState } from "react";

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

export const LinearScaleQuestion = () => {
  const [value, setValue] = useState<string>("-1");

  return (
    <Box className="flex flex-col gap-2 md:flex-row md:items-end">
      <Text className="md:mx-4">{scale.min.label}</Text>

      <RadioGroup value={value.toString()} onChange={setValue} className="flex-1">
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
