import * as Clipboard from "expo-clipboard";
import { useEffect, useRef } from "react";
import { Platform } from "react-native";

import { useKanbanBoardPageStore } from "../../store/kanban-board-store";
import { useTaskStore } from "../../store/task-store";

import { Textarea, TextareaInput } from "@/screens/components/ui/textarea";

export const TaskNotes = () => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { currentTaskId, editTaskNotes } = useKanbanBoardPageStore();
  const { notes, setNotes } = useTaskStore();

  useEffect(() => {
    if (Platform.OS !== "web") return;
    const node: HTMLTextAreaElement | null = inputRef.current;
    if (!node) return;

    const handleKeyDown = async (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "v") {
        if (await Clipboard.hasImageAsync()) {
          e.preventDefault();
          const img = await Clipboard.getImageAsync({ format: "jpeg", jpegQuality: 1 });
          if (!img) return;
        }
      }
    };

    node.addEventListener("keydown", handleKeyDown);
    return () => node.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <Textarea className="h-[235px]" size="md">
      <TextareaInput
        // {...(Platform.OS=="web")?{ref:inputRef}:{}}
        ref={inputRef}
        placeholder="Notes"
        value={notes}
        onChangeText={setNotes}
        textAlign="left"
        textAlignVertical="top"
        onBlur={() => editTaskNotes(currentTaskId, notes)}
      />
    </Textarea>
  );
};
