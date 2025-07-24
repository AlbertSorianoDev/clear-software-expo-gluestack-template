import { Circle } from "lucide-react-native";

import { EditRadioChoice } from "./edit-radio-choice";

import { HStack } from "@/screens/components/ui/hstack";
import { Icon } from "@/screens/components/ui/icon";
import { Pressable } from "@/screens/components/ui/pressable";
import { Text } from "@/screens/components/ui/text";
import { VStack } from "@/screens/components/ui/vstack";
import { FormInputTypeEnum } from "@/screens/features/types/form-input-type";

export const EditSingleChoiceQuestion = () => {
  return (
    <VStack space="md">
      {[
        { id: 1, label: "dsaadssa" },
        { id: 2, label: "assaduasdusda" },
      ].map((item, index) => (
        <EditRadioChoice
          index={index}
          key={index}
          id={item.id}
          label={item.label}
          type={FormInputTypeEnum.singleChoice}
        />
      ))}
      <HStack className="h-9 items-center" space="xs">
        <Pressable>
          <HStack className="items-center" space="sm">
            <Icon as={Circle} className="text-typography-500" size="md" />
            <Text size="sm">Add option</Text>
          </HStack>
        </Pressable>
      </HStack>
    </VStack>
  );
};
