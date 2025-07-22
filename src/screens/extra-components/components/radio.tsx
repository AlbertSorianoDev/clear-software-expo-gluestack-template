import { useState } from "react";

import { HStack } from "@/screens/components/ui/hstack";
import { CircleIcon } from "@/screens/components/ui/icon";
import {
  Radio,
  RadioGroup,
  RadioIcon,
  RadioIndicator,
  RadioLabel,
} from "@/screens/components/ui/radio";

const values: { value: string; label: string }[] = [
  { label: "Label 1", value: "1" },
  { label: "Label 2", value: "2" },
  { label: "Label 3", value: "3" },
  { label: "Label 4", value: "4" },
  { label: "Label 5", value: "5" },
];

export const RadioComponent = () => {
  const [selected, setSelected] = useState(values[0].value);
  return (
    <RadioGroup value={selected} onChange={setSelected}>
      <HStack space="md" className="flex-wrap">
        {values.map((item) => (
          <Radio key={item.value} value={item.value} size="sm">
            <RadioIndicator>
              <RadioIcon as={CircleIcon} />
            </RadioIndicator>
            <RadioLabel>{item.label}</RadioLabel>
          </Radio>
        ))}
      </HStack>
    </RadioGroup>
  );
};
