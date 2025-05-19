import { router } from "expo-router";

import { HStack } from "@/components/ui/hstack";
import { ChevronLeftIcon, Icon } from "@/components/ui/icon";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";

interface MobileHeaderProps {
  title: string;
}

export function MobileHeader({ title }: MobileHeaderProps) {
  return (
    <HStack
      className="border-border-300 items-center border-b bg-background-0 px-4 py-6"
      space="md"
    >
      <Pressable
        onPress={() => {
          if (router.canGoBack()) {
            router.back();
          } else {
            router.navigate("/");
          }
        }}
      >
        <Icon as={ChevronLeftIcon} />
      </Pressable>
      <Text className="text-xl">{title}</Text>
    </HStack>
  );
}
