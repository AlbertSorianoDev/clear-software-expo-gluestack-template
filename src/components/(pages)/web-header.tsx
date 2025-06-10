import { Heading } from "../ui/heading";

import { Avatar, AvatarFallbackText } from "@/components/ui/avatar";
import { HStack } from "@/components/ui/hstack";
import { Icon, MenuIcon } from "@/components/ui/icon";
import { Pressable } from "@/components/ui/pressable";

type WebHeaderProps = {
  title: string;
  toggleSidebar: () => void;
};

export function WebHeader(props: WebHeaderProps) {
  return (
    <HStack className="border-border-300 items-center justify-between border-b bg-background-0 px-5 py-[10px]">
      <HStack className="items-center">
        <Pressable
          onPress={() => {
            props.toggleSidebar();
          }}
        >
          <Icon as={MenuIcon} size="lg" className="ml-2 mr-5 text-primary-950" />
        </Pressable>
      </HStack>
      <Heading className="text-primary-950" size="lg">
        {props.title}
      </Heading>
      <Avatar className="h-9 w-9">
        <AvatarFallbackText className="font-light">A</AvatarFallbackText>
      </Avatar>
    </HStack>
  );
}
