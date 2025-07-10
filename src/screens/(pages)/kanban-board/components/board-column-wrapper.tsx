import { Plus } from "lucide-react-native";
import { ReactNode, useState } from "react";

import { useKanbanBoardPageStore } from "../store/kanban-board-store";

import { Box } from "@/screens/components/ui/box";
import { Button, ButtonIcon } from "@/screens/components/ui/button";
import { HStack } from "@/screens/components/ui/hstack";
import { Icon } from "@/screens/components/ui/icon";
import { Input, InputField } from "@/screens/components/ui/input";
import { Pressable } from "@/screens/components/ui/pressable";
import { ScrollView } from "@/screens/components/ui/scroll-view";
import { Text } from "@/screens/components/ui/text";

export const BoardColumnWrapper = ({
  id,
  name: initialName,
  children,
}: {
  id: number;
  name: string;
  children: ReactNode;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const { addTask, toggleShowTaskDrawer, setCurrentTaskId } = useKanbanBoardPageStore();
  const [name, setName] = useState(initialName);

  const handleAddTask = () => {
    const newTaskId = addTask(id);
    setCurrentTaskId(newTaskId);
    toggleShowTaskDrawer();
  };

  return (
    <Box className="min-w-[260px] max-w-[260px]">
      <HStack className="mb-4 min-h-9 items-center justify-between">
        {isEditing ? (
          <Input size="sm">
            <InputField
              autoFocus
              value={name}
              onChangeText={setName}
              onBlur={() => setIsEditing(false)}
              returnKeyType="done"
            />
          </Input>
        ) : (
          <Pressable onPress={() => setIsEditing(true)}>
            <Text className="text-typography-950" bold>
              {initialName}
            </Text>
          </Pressable>
        )}
        <Pressable className="h-6 w-6 items-center justify-center" onPress={handleAddTask}>
          <Icon as={Plus} className="text-typography-950" />
        </Pressable>
      </HStack>
      <ScrollView>
        <Box className="flex-1 gap-5">
          {children}
          <Box className="flex min-h-10 items-center justify-center">
            <Button variant="link" onPress={handleAddTask}>
              <ButtonIcon as={Plus} className="text-typography-950" />
            </Button>
          </Box>
        </Box>
      </ScrollView>
    </Box>
  );
};
