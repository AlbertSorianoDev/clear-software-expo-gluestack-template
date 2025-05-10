import Ionicons from "@expo/vector-icons/Ionicons";
import clsx from "clsx";
import { useRouter } from "expo-router";
import { useColorScheme } from "nativewind";

import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { ScrollView } from "@/components/ui/scroll-view";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";

export default function SplashScreen() {
  const router = useRouter();
  const { colorScheme } = useColorScheme();

  return (
    <ScrollView
      className="w-full"
      contentContainerStyle={{ flexGrow: 1, justifyContent: "center", padding: 20 }}
    >
      <VStack className="mx-auto w-full max-w-[440px]" space="lg">
        <HStack className="mb-4 items-center justify-center gap-x-2">
          <Ionicons
            name="logo-edge"
            size={40}
            className={clsx(colorScheme === "dark" ? "text-white" : "text-black")}
          />
          <Heading>
            <Text className="text-3xl font-bold text-black dark:text-white">Clear Software</Text>
          </Heading>
        </HStack>
        <VStack className="w-full" space="lg">
          <Button
            className="w-full"
            onPress={() => {
              router.push("/auth/signin");
            }}
          >
            <ButtonText className="font-medium">Log in</ButtonText>
          </Button>
          <Button
            onPress={() => {
              router.push("/auth/signup");
            }}
          >
            <ButtonText className="font-medium">Sign Up</ButtonText>
          </Button>
        </VStack>
      </VStack>
    </ScrollView>
  );
}
