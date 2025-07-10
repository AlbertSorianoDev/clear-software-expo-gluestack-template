import { Download } from "lucide-react-native";
import { useState } from "react";
import { Linking, Pressable } from "react-native";

import { tasks } from "../../data/initial_data";
import { useKanbanBoardPageStore } from "../../store/kanban-board-store";

import { Icon } from "@/screens/components/ui/icon";
import { Text } from "@/screens/components/ui/text";
import { VStack } from "@/screens/components/ui/vstack";

export const TaskDocuments = () => {
  const { currentTaskId } = useKanbanBoardPageStore();
  const task = tasks.find((task) => currentTaskId == task.id);
  const [files] = useState(task?.files);
  const openLink = async (url: string) => {
    await Linking.openURL(url);
  };
  return (
    <VStack space="md">
      {files?.map(
        (file, index) =>
          file && (
            <Pressable
              key={index}
              onPress={() => openLink(file.uri)}
              className="group flex flex-row items-center gap-2"
            >
              <Text className="text-typography-600 group-hover:text-blue-500">{file.name}</Text>
              <Icon as={Download} className="text-typography-600 group-hover:text-blue-500" />
            </Pressable>
          ),
      )}
    </VStack>
  );
};
