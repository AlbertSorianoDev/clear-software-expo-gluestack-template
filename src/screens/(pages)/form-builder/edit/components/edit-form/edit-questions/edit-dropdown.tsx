import { useState } from "react";

import { EditRadioChoice } from "./edit-radio-choice";

import { InputTypeEnum } from "@/data/forms/types/form-field";
import { HStack } from "@/screens/components/ui/hstack";
import { Pressable } from "@/screens/components/ui/pressable";
import { Text } from "@/screens/components/ui/text";
import { VStack } from "@/screens/components/ui/vstack";

export const EditDropdownQuestion = () => {
  const [dropdownOptions] = useState<{ id: number; label: string }[]>([
    { id: 1, label: "Option 1" },
    { id: 1, label: "Option 2" },
  ]);

  return (
    <VStack space="md">
      {dropdownOptions.map((item, index) => (
        <EditRadioChoice
          index={index}
          key={index}
          id={item.id}
          label={item.label}
          type={InputTypeEnum.dropdown}
        />
      ))}
      <HStack className="h-9 items-center" space="xs">
        <Pressable>
          <HStack className="items-center" space="sm">
            <Text className="w-6 text-center text-typography-500">
              {dropdownOptions.length + 1}
            </Text>
            <Text size="sm">Add option</Text>
          </HStack>
        </Pressable>
      </HStack>
    </VStack>
  );
};
