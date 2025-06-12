import { router } from "expo-router";

import { Avatar, AvatarFallbackText } from "../ui/avatar";
import { Heading } from "../ui/heading";

import { HStack } from "@/components/ui/hstack";
import { ChevronLeftIcon, Icon } from "@/components/ui/icon";
import { Pressable } from "@/components/ui/pressable";

interface MobileHeaderProps {
  title: string;
}

export function MobileHeader({ title }: MobileHeaderProps) {
  return (
    <HStack
      className="border-border-300 items-center justify-between border-b bg-background-0 px-4 py-6"
      space="md"
    >
      <HStack className="items-center gap-0" space="md">
        <Pressable
          onPress={() => {
            if (router.canGoBack()) {
              router.back();
            } else {
              router.navigate("/");
            }
          }}
        >
          <Icon className="text-typography-950" size="xl" as={ChevronLeftIcon} />
        </Pressable>
        <Heading size="md" className="text-typography-950">
          {title}
        </Heading>
      </HStack>
      <Pressable onPress={() => router.navigate("/profile")}>
        <Avatar className="h-9 w-9">
          <AvatarFallbackText className="font-light">A</AvatarFallbackText>
        </Avatar>
      </Pressable>
    </HStack>
  );
}
