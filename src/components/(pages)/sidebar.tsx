import clsx from "clsx";

import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Pressable } from "@/components/ui/pressable";
import { ScrollView } from "@/components/ui/scroll-view";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { TabItem } from "@/types/icons/tab-item";

interface SidebarProps {
  tabsList: TabItem[];
  isExpanded: boolean;
  tabSelectedIndex: number;
  navigateWithIndex: (index: number) => void;
}

export function Sidebar({
  tabsList,
  isExpanded = false,
  tabSelectedIndex,
  navigateWithIndex,
}: SidebarProps) {
  return (
    <ScrollView className="h-full w-fit" contentContainerStyle={{ flexGrow: 1 }}>
      <VStack
        className={clsx(
          "border-border-300 h-full flex-1 items-center border-r py-4 transition-all",
          isExpanded ? "w-[200px]" : "w-[70px]",
        )}
      >
        <VStack className="w-full px-2 py-2">
          {tabsList.map((item, index) => {
            if (item.mobileOnly) {
              return null;
            }
            return (
              <Pressable
                onPress={() => navigateWithIndex(index)}
                key={index}
                aria-pressed={index === tabSelectedIndex}
                className={clsx("h-[50px] items-center gap-2 rounded px-4 py-3", {
                  ["bg-background-950"]: index === tabSelectedIndex,
                  ["bg-background-0"]: index !== tabSelectedIndex,
                })}
              >
                <HStack className="h-full w-full items-center justify-start gap-x-2">
                  <Icon
                    as={item.icon}
                    className={clsx("h-[20px] w-[20px] shrink-0 grow-0", {
                      "text-typography-950": tabSelectedIndex !== index,
                      "text-typography-0": tabSelectedIndex === index,
                    })}
                  />
                  {isExpanded && (
                    <Text
                      className={clsx(
                        "overflow-hidden truncate whitespace-nowrap",
                        index === tabSelectedIndex ? "text-typography-0" : "text-typography-700",
                      )}
                    >
                      {item.tabTitle}
                    </Text>
                  )}
                </HStack>
              </Pressable>
            );
          })}
        </VStack>
      </VStack>
    </ScrollView>
  );
}
