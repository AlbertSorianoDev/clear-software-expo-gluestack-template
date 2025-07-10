import { CircleCheck } from "lucide-react-native";

import { useKanbanBoardPageStore } from "../store/kanban-board-store";
import { useTaskStore } from "../store/task-store";
import { Client } from "../types/client";
import { User } from "../types/user";

import {
  Avatar,
  AvatarBadge,
  AvatarFallbackText,
  AvatarImage,
} from "@/screens/components/ui/avatar";
import { Box } from "@/screens/components/ui/box";
import { Card } from "@/screens/components/ui/card";
import { HStack } from "@/screens/components/ui/hstack";
import { Icon } from "@/screens/components/ui/icon";
import { Pressable } from "@/screens/components/ui/pressable";
import { Text } from "@/screens/components/ui/text";
import { Tooltip, TooltipContent, TooltipText } from "@/screens/components/ui/tooltip";

export const BoardTaskCard = ({
  id,
  name,
  user,
  client,
}: {
  id: number;
  name: string;
  user: User | undefined;
  client: Client | undefined;
}) => {
  const { setCurrentTaskId, toggleShowTaskDrawer } = useKanbanBoardPageStore();
  const { reset: resetTaskStore } = useTaskStore();

  return (
    <>
      <Pressable
        onPress={() => {
          resetTaskStore();
          setCurrentTaskId(id);
          toggleShowTaskDrawer();
        }}
      >
        <Card
          variant="elevated"
          className="min-h-[130px] rounded border border-outline-100 px-3 py-4 shadow-soft-1"
        >
          <Box className="flex-1">
            <HStack className="items-start gap-2">
              <Icon as={CircleCheck} size="lg" className="mt-[1.5px]" />
              <Text size="lg" className="flex-1 text-start leading-tight text-typography-950">
                {name}
              </Text>
            </HStack>
          </Box>

          <HStack className="items-center gap-2.5">
            {user && (
              <Tooltip
                openDelay={0}
                placement="bottom left"
                trigger={(triggerProps) => {
                  return (
                    <Avatar
                      {...triggerProps}
                      className="h-5 w-5 transition ease-in-out hover:scale-125"
                    >
                      <AvatarFallbackText size="xs" />
                      <AvatarImage
                        source={{
                          uri: user.avatarUrl,
                        }}
                      />
                      <AvatarBadge size="xs" />
                    </Avatar>
                  );
                }}
              >
                <TooltipContent>
                  <TooltipText>{user.name}</TooltipText>
                </TooltipContent>
              </Tooltip>
            )}
            {client && (
              <Text size="sm" className="text-typography-950">
                {client?.company}
              </Text>
            )}
          </HStack>
        </Card>
      </Pressable>
    </>
  );
};
