import { Circle, Square, X } from "lucide-react-native";
import { useState } from "react";

import { InputTypeEnum } from "@/data/forms/types/form-field";
import { HStack } from "@/screens/components/ui/hstack";
import { Icon } from "@/screens/components/ui/icon";
import { Input, InputField } from "@/screens/components/ui/input";
import { Pressable } from "@/screens/components/ui/pressable";
import { Text } from "@/screens/components/ui/text";

export const EditRadioChoice = ({
  id,
  index,
  label,
  type,
}: {
  id: number;
  index: number;
  label: string;
  type: InputTypeEnum;
}) => {
  const [editLabelRadio, setEditRadioChoice] = useState(label);

  const renderIcon = () => {
    if (type === InputTypeEnum.multipleChoice)
      return <Icon as={Square} className="text-typography-500" size="md" />;
    if (type === InputTypeEnum.singleChoice)
      return <Icon as={Circle} className="text-typography-500" size="md" />;
    if (type === InputTypeEnum.dropdown)
      return <Text className="w-6 text-center text-typography-500">{index + 1}</Text>;
    return null;
  };

  return (
    <HStack className="items-center" space="sm">
      {renderIcon()}

      <Input variant="underlined" size="sm" className="flex-1">
        <InputField value={editLabelRadio} onChangeText={setEditRadioChoice} />
      </Input>
      <Pressable>
        <Icon as={X} className="text-typography-500" size="lg" />
      </Pressable>
    </HStack>
  );
};
