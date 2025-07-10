import { ScrollView, View } from "react-native";

import { BoardColumnWrapper } from "@/screens/(pages)/kanban-board/components/board-column-wrapper";
import { BoardFilters } from "@/screens/(pages)/kanban-board/components/board-filters";
import { BoardTaskCard } from "@/screens/(pages)/kanban-board/components/board-task-card";
import { TaskDrawer } from "@/screens/(pages)/kanban-board/components/drawer/task-drawer";
import {
  clients as clientsData,
  users as usersData,
} from "@/screens/(pages)/kanban-board/data/initial_data";
import { useKanbanBoardPageStore } from "@/screens/(pages)/kanban-board/store/kanban-board-store";
import { Box } from "@/screens/components/ui/box";

export default function KanbanBoardPage() {
  const { currentTaskId } = useKanbanBoardPageStore();
  const users = usersData;
  const clients = clientsData;
  const columns = useKanbanBoardPageStore((state) => state.columns);
  const tasks = useKanbanBoardPageStore((state) => state.tasks);

  return (
    <View className="flex flex-1">
      <BoardFilters />
      {currentTaskId != -1 && <TaskDrawer />}
      <Box className="flex-1 p-2.5 md:pl-5 md:pr-5">
        <ScrollView horizontal className="w-full">
          <Box className="flex-1 flex-row flex-nowrap gap-10">
            {columns.map((column) => (
              <BoardColumnWrapper key={column.id} id={column.id} name={column.name}>
                {tasks
                  .filter((task) => task.columnId == column.id)
                  .sort((a, b) => a.order - b.order)
                  .map((task) => (
                    <BoardTaskCard
                      key={task.id}
                      id={task.id}
                      name={task.name}
                      user={users.find((user) => user.id == task.assignedUserId)}
                      client={clients.find((client) => client.id == task.assignedClientId)}
                    />
                  ))}
              </BoardColumnWrapper>
            ))}
          </Box>
        </ScrollView>
      </Box>
    </View>
  );
}
