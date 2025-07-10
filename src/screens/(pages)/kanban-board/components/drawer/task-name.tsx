import { TextInputProps } from "react-native";

import { useKanbanBoardPageStore } from "../../store/kanban-board-store";
import { useTaskStore } from "../../store/task-store";

import { Input, InputField } from "@/screens/components/ui/input";

export const TaskName = ({ initialRef }: { initialRef: React.Ref<TextInputProps> }) => {
  const { currentTaskId, editTaskName } = useKanbanBoardPageStore();

  const name = useTaskStore((state) => state.name);
  const setName = useTaskStore((state) => state.setName);

  return (
    <Input variant="outline" size="md">
      <InputField
        ref={initialRef}
        placeholder="Task"
        value={name}
        onChangeText={setName}
        onBlur={() => {
          editTaskName(currentTaskId, name);
        }}
      />
    </Input>
  );
};
