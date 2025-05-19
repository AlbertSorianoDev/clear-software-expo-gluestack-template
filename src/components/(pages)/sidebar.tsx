import { Feather } from "@expo/vector-icons";

import { Pressable } from "@/components/ui/pressable";
import { VStack } from "@/components/ui/vstack";
import { FeatherGlyphs } from "@/types/icons/expo-vector-icons";
import { TabItem } from "@/types/icons/tab-item";

interface SidebarProps {
  tabsList: TabItem<FeatherGlyphs>[];
}

export function Sidebar({ tabsList }: SidebarProps) {
  return (
    <VStack className="border-border-300 h-full w-14 items-center border-r pt-5" space="xl">
      {tabsList.map((item, index) => {
        if (!item.onlyMobile) {
          return (
            <Pressable key={index} className="text-gray-600 focus:text-black">
              <Feather name={item.iconName} size={20} />
            </Pressable>
          );
        }
      })}
    </VStack>
  );
}
