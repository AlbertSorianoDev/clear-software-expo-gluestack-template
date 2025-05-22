import { Feather } from "@expo/vector-icons";
import clsx from "clsx";

import { HStack } from "../ui/hstack";

import { Pressable } from "@/components/ui/pressable";
import { ScrollView } from "@/components/ui/scroll-view";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { FeatherGlyphs } from "@/types/icons/expo-vector-icons";
import { TabItem } from "@/types/icons/tab-item";

interface SidebarProps {
  tabsList: TabItem<FeatherGlyphs>[];
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
            return (
              <Pressable
                onPress={() => navigateWithIndex(index)}
                key={index}
                className={clsx("h-[50px] items-center gap-2 rounded px-4 py-3", {
                  ["bg-background-950"]: index === tabSelectedIndex,
                  ["bg-background-0"]: index !== tabSelectedIndex,
                })}
              >
                <HStack className={clsx("w-full items-center gap-x-2")}>
                  <Feather
                    name={item.iconName}
                    size={20}
                    color={index === tabSelectedIndex ? "white" : "black"}
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
