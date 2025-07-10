import clsx from "clsx";
import { useEffect, useState } from "react";

import { useKanbanBoardPageStore } from "../../store/kanban-board-store";
import { useTaskStore } from "../../store/task-store";

import { Box } from "@/screens/components/ui/box";
import { Input, InputField } from "@/screens/components/ui/input";
import { Text } from "@/screens/components/ui/text";

export const TaskBudget = () => {
  const { currentTaskId, workSessions, editBudgetInMinutes } = useKanbanBoardPageStore();
  const { budgetInMinutes, setBudgetInMinutes } = useTaskStore();

  const taskWorkSessions = workSessions.filter((session) => session.taskId === currentTaskId);
  const totalUsedMs = taskWorkSessions.reduce((acc, session) => {
    const start = new Date(session.startTime).getTime();
    const end = session.endTime ? new Date(session.endTime).getTime() : Date.now();
    return acc + (end - start);
  }, 0);

  const [, setNow] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  const budgetMs = budgetInMinutes * 60 * 1000;

  const remainingMs = Math.max(0, budgetMs - totalUsedMs);
  const remainingMinutes = Math.floor(remainingMs / (60 * 1000));
  const remainingSeconds = Math.floor((remainingMs % (60 * 1000)) / 1000);
  return (
    <Box className="flex w-full gap-[5px] md:flex-row md:items-center md:gap-2.5">
      <Input variant="outline" size="md" className="md:flex-1">
        <InputField
          placeholder="Budget (minutes)"
          value={budgetInMinutes.toString()}
          onChangeText={(e) => setBudgetInMinutes(parseInt(e))}
          onBlur={() => {
            editBudgetInMinutes(currentTaskId, budgetInMinutes);
          }}
        />
      </Input>
      <Text
        size="sm"
        className={clsx(
          "md:flex-1",
          remainingMinutes >= 15 && "text-typography-950",
          remainingMinutes < 15 && "text-error-500",
        )}
      >
        Remaining: {remainingMs >= 0 ? remainingMinutes : 0}
        {" m"} {remainingMs >= 0 ? remainingSeconds : 0}
        {" s"}
      </Text>
    </Box>
  );
};
