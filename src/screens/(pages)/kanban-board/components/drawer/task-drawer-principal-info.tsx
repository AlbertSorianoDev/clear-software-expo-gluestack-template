import { ChevronDownIcon } from "lucide-react-native";

import { clients, columns, users } from "../../data/initial_data";
import { useKanbanBoardPageStore } from "../../store/kanban-board-store";
import { useTaskStore } from "../../store/task-store";
import { TaskBudget } from "./task-budget";

import { Box } from "@/screens/components/ui/box";
import {
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from "@/screens/components/ui/select";

export const TaskDrawerPrincipalInfo = () => {
  const { currentTaskId, tasks, editTaskUserAssigned, editTaskClientAssigned } =
    useKanbanBoardPageStore();
  const task = tasks.find((task) => currentTaskId == task.id);

  const { userId, setUserId, clientId, setClientId, columnId, setColumnId } = useTaskStore();
  return (
    <>
      <Box className="flex-col gap-5 text-typography-950 md:flex-row md:gap-2.5">
        <Select
          className="md:flex-1"
          onValueChange={(selected) => {
            const selectedInt = parseInt(selected);
            setUserId(selectedInt);
            editTaskUserAssigned(currentTaskId, selectedInt);
          }}
          selectedValue={userId != 0 ? userId.toString() : undefined}
          initialLabel={users?.find((user) => user.id === task?.assignedUserId)?.name}
        >
          <SelectTrigger variant="outline" size="md">
            <SelectInput placeholder="Assigned to" />
            <SelectIcon className="mr-3" as={ChevronDownIcon} />
          </SelectTrigger>
          <SelectPortal>
            <SelectBackdrop />
            <SelectContent>
              <SelectDragIndicatorWrapper>
                <SelectDragIndicator />
              </SelectDragIndicatorWrapper>
              <SelectItem label={"No Employee Assigned"} value={"0"} />
              {users?.map((user) => (
                <SelectItem key={user.id} label={user.name} value={user.id.toString()} />
              ))}
            </SelectContent>
          </SelectPortal>
        </Select>

        <Select
          className="md:flex-1"
          onValueChange={(selected) => {
            const selectedInt = parseInt(selected);
            setUserId(selectedInt);
            editTaskClientAssigned(currentTaskId, selectedInt);
          }}
          selectedValue={clientId != 0 ? clientId.toString() : undefined}
          initialLabel={clients?.find((client) => client.id === task?.assignedClientId)?.company}
        >
          <SelectTrigger variant="outline" size="md">
            <SelectInput placeholder="Client" />
            <SelectIcon className="mr-3" as={ChevronDownIcon} />
          </SelectTrigger>
          <SelectPortal>
            <SelectBackdrop />
            <SelectContent>
              <SelectDragIndicatorWrapper>
                <SelectDragIndicator />
              </SelectDragIndicatorWrapper>
              <SelectItem label="No client assigned" value={"0"} />
              {clients?.map((client) => (
                <SelectItem key={client.id} label={client.company} value={client.id.toString()} />
              ))}
            </SelectContent>
          </SelectPortal>
        </Select>
      </Box>
      <Box className="flex-col gap-5 md:flex-row md:gap-2.5">
        <Select
          className="md:flex-1"
          //   onValueChange={async (selected) => {
          //     setColumnId(parseInt(selected));
          //     await changeTaskColumn({ id: currentTaskId, columnId: parseInt(selected) });
          //   }}
          selectedValue={task?.columnId.toString()}
          initialLabel={columns?.find((column) => column.id === task?.columnId)?.name}
        >
          <SelectTrigger variant="outline" size="md">
            <SelectInput placeholder="Status" />
            <SelectIcon className="mr-3" as={ChevronDownIcon} />
          </SelectTrigger>
          <SelectPortal>
            <SelectBackdrop />
            <SelectContent>
              <SelectDragIndicatorWrapper>
                <SelectDragIndicator />
              </SelectDragIndicatorWrapper>
              {columns?.map((column) => (
                <SelectItem key={column.id} label={column.name} value={column.id.toString()} />
              ))}
            </SelectContent>
          </SelectPortal>
        </Select>

        <Select
          className="md:flex-1"
          //   onValueChange={(selected) => setOrder(selected === "0" ? 0 : parseInt(selected))}
          selectedValue={task?.order.toString()}
        >
          <SelectTrigger variant="outline" size="md">
            <SelectInput placeholder="Order" />
            <SelectIcon className="mr-3" as={ChevronDownIcon} />
          </SelectTrigger>
          <SelectPortal>
            <SelectBackdrop />
            <SelectContent>
              <SelectDragIndicatorWrapper>
                <SelectDragIndicator />
              </SelectDragIndicatorWrapper>
              {tasks
                .filter((task) => task?.columnId == task.columnId)
                .map((task, index) => (
                  <SelectItem
                    key={task.id}
                    label={(index + 1).toString()}
                    value={(index + 1).toString()}
                  />
                ))}
            </SelectContent>
          </SelectPortal>
        </Select>
      </Box>
      <TaskBudget />
    </>
  );
};
