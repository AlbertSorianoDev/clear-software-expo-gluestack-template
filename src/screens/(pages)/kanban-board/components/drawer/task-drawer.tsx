import { ArrowRightToLine, ImagePlus, Paperclip, Trash } from "lucide-react-native";
import { useEffect, useRef } from "react";
import { TextInputProps } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useKanbanBoardPageStore } from "../../store/kanban-board-store";
import { useTaskStore } from "../../store/task-store";
import { TaskBranchName } from "./task-branch-name";
import { TaskDocuments } from "./task-documents";
import { TaskDrawerPrincipalInfo } from "./task-drawer-principal-info";
import { TaskImages } from "./task-images";
import { TaskName } from "./task-name";
import { TaskNotes } from "./task-notes";
import { WorkSessions } from "./task-work-sessions";

import { Box } from "@/screens/components/ui/box";
import { Button, ButtonIcon } from "@/screens/components/ui/button";
import {
  Drawer,
  DrawerBackdrop,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
} from "@/screens/components/ui/drawer";
import { HStack } from "@/screens/components/ui/hstack";
import { ScrollView } from "@/screens/components/ui/scroll-view";
import { useIsMobile } from "@/screens/hooks/use-is-mobile";

export const TaskDrawer = () => {
  const initialRef = useRef<TextInputProps | null>(null);
  const isMobile = useIsMobile();
  const {
    currentTaskId,
    showTaskDrawer,
    toggleShowTaskDrawer,
    setCurrentTaskId,
    setShowDeleteTaskConfirmationModal,
    tasks,
  } = useKanbanBoardPageStore();
  const { setFromGetTaskQuery, reset: resetTask } = useTaskStore();

  useEffect(() => {
    if (currentTaskId == -1) return;
    const task = tasks.find((task) => task.id == currentTaskId)!;
    setFromGetTaskQuery(task);
  }, [tasks, currentTaskId, setFromGetTaskQuery]);

  if (currentTaskId == -1) return null;
  return (
    <Drawer
      initialFocusRef={initialRef}
      isOpen={showTaskDrawer}
      onClose={async () => {
        toggleShowTaskDrawer();
        resetTask();
        setCurrentTaskId(-1);
      }}
      size={isMobile ? "full" : "md"}
      anchor="right"
    >
      <DrawerBackdrop />
      <DrawerContent className="overflow-x-hidden p-0">
        <SafeAreaView className="h-full w-full">
          <DrawerHeader className="border-b border-outline-100">
            <HStack className="flex flex-1 items-center justify-end gap-5 px-5 py-2.5">
              <Button variant="link" onPress={() => {}}>
                <ButtonIcon as={ImagePlus} className="h-6 w-6" />
              </Button>
              <Button variant="link" onPress={() => {}}>
                <ButtonIcon as={Paperclip} className="h-6 w-6" />
              </Button>
              <Button
                variant="link"
                onPress={() => {
                  setShowDeleteTaskConfirmationModal(true);
                }}
              >
                <ButtonIcon as={Trash} className="h-6 w-6" />
              </Button>
              <Button
                variant="link"
                onPress={async () => {
                  toggleShowTaskDrawer();
                  resetTask();
                  setCurrentTaskId(-1);
                }}
              >
                <ButtonIcon as={ArrowRightToLine} className="h-6 w-6" />
              </Button>
            </HStack>
          </DrawerHeader>

          <DrawerBody className="mt-0 p-5">
            <ScrollView showsVerticalScrollIndicator={false}>
              <Box className="gap-5 text-typography-950">
                <TaskName initialRef={initialRef} />
                <TaskDrawerPrincipalInfo />
                <WorkSessions />
                <TaskBranchName />
                <TaskNotes />
                <TaskImages />
                <TaskDocuments />
              </Box>
            </ScrollView>
          </DrawerBody>
        </SafeAreaView>
      </DrawerContent>
    </Drawer>
  );
};
