import { router } from "expo-router";
import { Waypoints } from "lucide-react-native";

import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { ScrollView } from "@/components/ui/scroll-view";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";

export default function SplashScreen() {
  return (
    <ScrollView
      className="w-full"
      contentContainerStyle={{ flexGrow: 1, justifyContent: "center", padding: 20 }}
    >
      <VStack className="mx-auto w-full max-w-[440px]" space="lg">
        <HStack className="mb-4 items-center justify-center gap-x-2">
          <Icon as={Waypoints} className="h-10 w-10 stroke-[2] text-black dark:text-white" />
          <Heading>
            <Text className="text-3xl font-bold text-black dark:text-white">Clear Software</Text>
          </Heading>
        </HStack>
        <VStack className="w-full" space="lg">
          <Button
            className="w-full"
            onPress={() => {
              router.navigate("/auth/signin");
            }}
          >
            <ButtonText className="font-medium">Log in</ButtonText>
          </Button>
          <Button
            onPress={() => {
              router.navigate("/auth/signup");
            }}
          >
            <ButtonText className="font-medium">Sign Up</ButtonText>
          </Button>
        </VStack>
      </VStack>
    </ScrollView>
  );
}
