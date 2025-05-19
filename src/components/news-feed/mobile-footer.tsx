import { Feather } from "@expo/vector-icons";
import clsx from "clsx";
import { router } from "expo-router";
import { Platform } from "react-native";

import { HStack } from "@/components/ui/hstack";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { FeatherGlyphs } from "@/types/icons/expo-vector-icons";
import { TabItem } from "@/types/icons/tab-item";

export default function MobileFooter({ footerIcons }: { footerIcons: TabItem<FeatherGlyphs>[] }) {
  return (
    <HStack
      className={clsx(
        "border-t-border-300 absolute bottom-0 left-0 right-0 w-full items-center justify-between overflow-hidden border-t bg-background-0 p-3 md:hidden",
        { "pb-5": Platform.OS === "ios" },
        { "pb-5": Platform.OS === "android" },
      )}
    >
      {footerIcons.map((item: TabItem<FeatherGlyphs>, index: React.Key | null | undefined) => {
        return (
          <Pressable
            className="flex-1 flex-col items-center px-0.5 text-gray-600 focus:text-black"
            key={index}
            onPress={() => router.push("/news-feed")}
          >
            <Feather name={item.iconName} size={20} />
            <Text className="text-center text-xs text-typography-600">{item.iconText}</Text>
          </Pressable>
        );
      })}
    </HStack>
  );
}
