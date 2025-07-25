import clsx from "clsx";
import { router } from "expo-router";
import { Platform } from "react-native";

import { HStack } from "@/screens/components/ui/hstack";
import { Icon } from "@/screens/components/ui/icon";
import { Pressable } from "@/screens/components/ui/pressable";
import { Text } from "@/screens/components/ui/text";
import { TabItem } from "@/screens/types/tab-item";

interface MobileFooterProps {
  tabList: TabItem[];
  tabSelectedIndex: number;
  selectTabIndex: (index: number) => void;
}

export default function MobileFooter({
  tabList,
  tabSelectedIndex,
  selectTabIndex,
}: MobileFooterProps) {
  const handlePress = (index: number) => {
    selectTabIndex(index);
    router.navigate(tabList[index].route);
  };

  return (
    <HStack
      className={clsx(
        "border-300 absolute bottom-0 left-0 right-0 w-full items-center justify-around overflow-hidden border-t bg-background-0 p-3 md:hidden",
        { "pb-5": Platform.OS === "ios" },
        { "pb-5": Platform.OS === "android" },
      )}
    >
      {tabList.map((item, index) => {
        if (item.webOnly) {
          return null;
        }
        return (
          <Pressable
            className={clsx("flex max-w-[80px] flex-1 flex-col items-center rounded px-1 py-1", {
              ["bg-primary-500"]: index === tabSelectedIndex,
              ["bg-background-0"]: index !== tabSelectedIndex,
            })}
            key={index}
            onPress={() => handlePress(index)}
          >
            <Icon
              as={item.icon}
              className={clsx("h-[20px] w-[20px] shrink-0 grow-0", {
                "text-primary-500": tabSelectedIndex !== index,
                "text-typography-0": tabSelectedIndex === index,
              })}
            />
            <Text
              className={clsx("overflow-hidden truncate whitespace-nowrap text-center text-xs", {
                ["text-typography-0"]: index === tabSelectedIndex,
                ["text-primary-600"]: index !== tabSelectedIndex,
              })}
            >
              {item.tabTitle}
            </Text>
          </Pressable>
        );
      })}
    </HStack>
  );
}
