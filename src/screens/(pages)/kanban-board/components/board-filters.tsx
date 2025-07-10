import { ChevronDownIcon, Plus, Search } from "lucide-react-native";

import { users } from "../data/initial_data";
import { useKanbanBoardPageStore } from "../store/kanban-board-store";

import { Box } from "@/screens/components/ui/box";
import { Button, ButtonIcon, ButtonText } from "@/screens/components/ui/button";
import { HStack } from "@/screens/components/ui/hstack";
import { Icon } from "@/screens/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/screens/components/ui/input";
import { Pressable } from "@/screens/components/ui/pressable";
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

export const BoardFilters = () => {
  const {
    addColumn,
    assignedUserFilter,
    setAssignedUserFilter,
    searchValueFilter,
    setSearchValueFilter,
  } = useKanbanBoardPageStore();
  return (
    <HStack space="lg" className="min-h-fit items-center p-2.5 text-typography-950 md:p-5">
      <Box className="max-w-72 flex-1">
        <Input variant="outline" size="md">
          <InputField
            placeholder="Search"
            onChangeText={setSearchValueFilter}
            value={searchValueFilter}
          />
          <InputSlot className="pr-2">
            <InputIcon as={Search} />
          </InputSlot>
        </Input>
      </Box>
      <Box className="hidden max-w-72 flex-1 md:flex">
        <Select
          onValueChange={(e) => setAssignedUserFilter(parseInt(e))}
          selectedValue={assignedUserFilter != 0 ? assignedUserFilter.toString() : undefined}

          // initialLabel={assignedUserFilter != 0 ? assignedUserFilter.toString() : undefined}
        >
          <SelectTrigger variant="outline" size="md">
            <SelectInput placeholder="Filter by employee" />
            <SelectIcon className="mr-3" as={ChevronDownIcon} />
          </SelectTrigger>
          <SelectPortal>
            <SelectBackdrop />
            <SelectContent>
              <SelectDragIndicatorWrapper>
                <SelectDragIndicator />
              </SelectDragIndicatorWrapper>
              <SelectItem label={`No employee`} value={"0"} />
              {users.map((user) => (
                <SelectItem key={user.id} label={`${user.name}`} value={user.id.toString()} />
              ))}
            </SelectContent>
          </SelectPortal>
        </Select>
      </Box>
      {/* TODO: ADD ON PRESS ADD COLUMNS */}
      <Button size="sm" className="hidden md:flex" onPress={addColumn}>
        <ButtonIcon as={Plus} />
        <ButtonText>Add new column</ButtonText>
      </Button>
      <Pressable className="flex md:hidden">
        <Icon as={Plus} />
      </Pressable>
    </HStack>
  );
};
