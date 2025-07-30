import { EllipsisVertical, PlusCircle, Trash } from "lucide-react-native";
import { ReactNode, useState } from "react";

import { useEditFormBuilderPageStore } from "../../../store/edit-form-builder-page-store";

import { InputTypeEnum } from "@/data/forms/types/enums";
import { Badge, BadgeText } from "@/screens/components/ui/badge";
import { Box } from "@/screens/components/ui/box";
import { Divider } from "@/screens/components/ui/divider";
import { HStack } from "@/screens/components/ui/hstack";
import { Icon } from "@/screens/components/ui/icon";
import { Input, InputField } from "@/screens/components/ui/input";
import { Pressable } from "@/screens/components/ui/pressable";
import { Switch } from "@/screens/components/ui/switch";
import { Text } from "@/screens/components/ui/text";
import { VStack } from "@/screens/components/ui/vstack";

export const EditQuestionWrapper = ({
  title,
  description,
  type = InputTypeEnum.shortText,
  children,
}: {
  title: string;
  description: string;
  type?: InputTypeEnum;
  children: ReactNode;
}) => {
  const setShowInputTypeActionSheet = useEditFormBuilderPageStore(
    (state) => state.setShowInputTypeActionSheet,
  );

  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description);
  const [editRequired, setEditRequired] = useState(false);

  return (
    <VStack space="sm" className={"bg-white p-5"}>
      <HStack space="sm">
        <Input className="flex-1 border-x-0 border-t-0 bg-typography-50/55 hover:bg-typography-50/70">
          <InputField placeholder="Tittle" value={editTitle} onChangeText={setEditTitle} />
        </Input>
        <Badge action="info" size="sm">
          <BadgeText>{type}</BadgeText>
        </Badge>
      </HStack>

      <Input className="border-x-0 border-t-0 bg-typography-50/55 hover:bg-typography-50/70">
        <InputField
          placeholder="Description"
          value={editDescription}
          onChangeText={setEditDescription}
        />
      </Input>

      <Box className="my-2">{children}</Box>

      <Divider />

      <HStack className="mt-2 flex h-fit items-center justify-end" space="lg">
        <Pressable onPress={() => setShowInputTypeActionSheet(true)}>
          <Icon as={PlusCircle} className="text-typography-600" size="lg" />
        </Pressable>
        <Pressable>
          <Icon as={Trash} className="text-typography-600" size="lg" />
        </Pressable>

        <Divider orientation="vertical" className="flex h-6" />

        <HStack className="items-center" space="lg">
          <Text className="text-typography-500" size="sm">
            Required
          </Text>
          <Switch
            value={editRequired}
            onToggle={setEditRequired}
            trackColor={{ false: "#e2e2e2", true: "#3dd2cc" }}
            thumbColor={"#3dd2cc"}
            ios_backgroundColor={"#e2e2e2"}
          />
        </HStack>

        <Pressable>
          <Icon as={EllipsisVertical} className="text-typography-600" size="lg" />
        </Pressable>
      </HStack>
    </VStack>
  );
};
