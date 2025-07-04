import { router } from "expo-router";
import { Waypoints } from "lucide-react-native";

import { Button, ButtonText } from "@/screens/components/ui/button";
import { Heading } from "@/screens/components/ui/heading";
import { HStack } from "@/screens/components/ui/hstack";
import { Icon } from "@/screens/components/ui/icon";
import { ScrollView } from "@/screens/components/ui/scroll-view";
import { Text } from "@/screens/components/ui/text";
import { VStack } from "@/screens/components/ui/vstack";

export default function SplashScreen() {
  return (
    <ScrollView
      className="w-full"
      contentContainerStyle={{ flexGrow: 1, justifyContent: "center", padding: 20 }}
    >
      <VStack className="mx-auto w-full max-w-[350px]" space="lg">
        <HStack className="mb-4 items-center justify-center gap-x-2">
          <Icon as={Waypoints} className="h-10 w-10 stroke-[2] text-black" />
          <Heading>
            <Text className="text-3xl font-bold text-black">Clear Software</Text>
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
