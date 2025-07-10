import * as Clipboard from "expo-clipboard";

import { useKanbanBoardPageStore } from "../../store/kanban-board-store";

import { Heading } from "@/screens/components/ui/heading";
import { HStack } from "@/screens/components/ui/hstack";
import { CopyIcon, Icon } from "@/screens/components/ui/icon";
import { Pressable } from "@/screens/components/ui/pressable";
import { Text } from "@/screens/components/ui/text";

export const TaskBranchName = () => {
  const { currentTaskId, tasks } = useKanbanBoardPageStore();
  const task = tasks.find((task) => currentTaskId == task.id);

  const branchName =
    "CS" +
    `${currentTaskId}-${task?.name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
      .replace(/-+/g, "-")}`;

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(branchName);
  };
  return (
    <>
      <HStack className="items-baseline gap-2.5">
        <Heading size="xs">Branch name</Heading>
        <Text>{branchName}</Text>
        <Pressable onPress={copyToClipboard}>
          <Icon as={CopyIcon} size="xs" className="text-primary-500" />
        </Pressable>
      </HStack>
    </>
  );
};
