import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { Button, ButtonText } from "@/components/ui/button";
import { VStack } from "@/components/ui/vstack";

export default function HomeScreen() {
  return (
    <SafeAreaView className="h-full flex-col items-center justify-center md:flex md:w-full">
      <VStack className="w-full max-w-[300px] gap-y-4 p-2 md:max-w-[440px]">
        <Button
          onPress={() => {
            router.push("/auth/splash-screen");
          }}
        >
          <ButtonText>SplashScreen</ButtonText>
        </Button>
        <Button
          onPress={() => {
            router.push("/auth/signin");
          }}
        >
          <ButtonText>Sign in</ButtonText>
        </Button>
        <Button
          onPress={() => {
            router.push("/auth/signup");
          }}
        >
          <ButtonText>Sign up</ButtonText>
        </Button>
        <Button onPress={() => {}}>
          <ButtonText>Forgot password</ButtonText>
        </Button>
        <Button onPress={() => {}}>
          <ButtonText>Create password</ButtonText>
        </Button>
        <Button onPress={() => {}}>
          <ButtonText>News feed</ButtonText>
        </Button>
        <Button onPress={() => {}}>
          <ButtonText>Dashboard</ButtonText>
        </Button>
        <Button onPress={() => {}}>
          <ButtonText>Profile</ButtonText>
        </Button>
      </VStack>
    </SafeAreaView>
  );
}
