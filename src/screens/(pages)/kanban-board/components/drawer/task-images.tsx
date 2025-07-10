import { useState } from "react";
import { ScrollView } from "react-native";

import { tasks } from "../../data/initial_data";
import { useKanbanBoardPageStore } from "../../store/kanban-board-store";

import { HStack } from "@/screens/components/ui/hstack";
import { Image } from "@/screens/components/ui/image";
import { Pressable } from "@/screens/components/ui/pressable";

export const TaskImages = () => {
  const { currentTaskId, setShowImageModal, setCurrentImageUri } = useKanbanBoardPageStore();
  const task = tasks.find((task) => currentTaskId == task.id);
  const [images] = useState(task?.images);

  return (
    <ScrollView horizontal>
      <HStack space="sm">
        {images?.map(
          (image, index) =>
            image && (
              <Pressable
                key={index}
                onPress={() => {
                  setCurrentImageUri(image.uri);
                  setShowImageModal(true);
                }}
              >
                <Image
                  className="rounded-lg transition delay-150 hover:scale-95 hover:shadow"
                  source={{ uri: image?.uri }}
                  alt={image.name}
                  size="2xl"
                  resizeMode="cover"
                />
              </Pressable>
            ),
        )}
      </HStack>
    </ScrollView>
  );
};
