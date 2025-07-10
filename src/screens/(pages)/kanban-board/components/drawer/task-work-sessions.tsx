import { format } from "@formkit/tempo";
import { Clock, OctagonPause } from "lucide-react-native";

import { users } from "../../data/initial_data";
import { useKanbanBoardPageStore } from "../../store/kanban-board-store";

import { Badge, BadgeText } from "@/screens/components/ui/badge";
import { Box } from "@/screens/components/ui/box";
import { Button, ButtonIcon, ButtonText } from "@/screens/components/ui/button";
import { Heading } from "@/screens/components/ui/heading";
import { HStack } from "@/screens/components/ui/hstack";
import { Icon } from "@/screens/components/ui/icon";
import { Pressable } from "@/screens/components/ui/pressable";
import { ScrollView } from "@/screens/components/ui/scroll-view";
import { Table, TableBody, TableData, TableRow } from "@/screens/components/ui/table";

export const WorkSessions = () => {
  const { currentTaskId, addWorkSession, workSessions, stopWorkSession } =
    useKanbanBoardPageStore();

  return (
    <>
      <HStack className="items-center gap-5">
        <Heading size="xs">Work sessions</Heading>
        <Button
          variant="outline"
          size="xs"
          onPress={() => addWorkSession(currentTaskId)}
          //   disabled={!canAddNewSession}
        >
          <ButtonIcon as={Clock} />
          <ButtonText>New</ButtonText>
        </Button>
      </HStack>
      <ScrollView horizontal className="w-full" contentContainerClassName="w-full">
        <Box className="flex w-full rounded-lg border border-solid border-outline-200 text-typography-950">
          <Table className="w-full">
            <TableBody>
              {workSessions
                .filter((workSession) => workSession.taskId == currentTaskId)
                ?.sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
                .map((workSession) => (
                  <TableRow key={workSession.id}>
                    <TableData className="text-nowrap text-start">
                      {format(new Date(workSession.startTime), "MMMM DD, YYYY", "en")}
                    </TableData>
                    <TableData className="text-nowrap text-start">
                      {format(new Date(workSession.startTime), "HH:mm A", "en")}
                    </TableData>
                    <TableData className="text-nowrap text-start">
                      {workSession.endTime ? (
                        format(new Date(workSession.endTime), "HH:mm A", "en")
                      ) : (
                        <Box className="items-center justify-center">
                          <Pressable onPress={() => stopWorkSession(workSession.id)}>
                            <Icon as={OctagonPause} size="xl" className="text-error-500" />
                          </Pressable>
                        </Box>
                      )}
                    </TableData>
                    <TableData className="flex-nowrap text-nowrap text-center">
                      {users?.find((user) => user.id == workSession.userId)?.name ?? ""}
                    </TableData>
                    <TableData className="">
                      <Box className="items-center justify-center">
                        {workSession.invoiceId && (
                          <Badge size="sm" action="success" className="w-fit justify-center">
                            <BadgeText>Billed</BadgeText>
                          </Badge>
                        )}
                        {workSession.userPaymentId && (
                          <Badge size="sm" action="success" className="w-fit justify-center">
                            <BadgeText>Paid</BadgeText>
                          </Badge>
                        )}
                      </Box>
                    </TableData>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Box>
      </ScrollView>
    </>
  );
};
