import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { Button, ButtonText } from "@/screens/components/ui/button";
import { VStack } from "@/screens/components/ui/vstack";

export default function HomeScreen() {
  return (
    <SafeAreaView className="h-full flex-col items-center justify-center md:flex md:w-full">
      <VStack className="w-3/4 max-w-[440px] gap-y-4">
        <Button
          onPress={() => {
            router.navigate("/kanban-board");
          }}
        >
          <ButtonText>Kanban Board</ButtonText>
        </Button>

        <Button
          onPress={() => {
            router.navigate("/auth/splash-screen");
          }}
        >
          <ButtonText>SplashScreen</ButtonText>
        </Button>
        <Button
          onPress={() => {
            router.navigate("/auth/signin");
          }}
        >
          <ButtonText>Sign in</ButtonText>
        </Button>
        <Button
          onPress={() => {
            router.navigate("/auth/signup");
          }}
        >
          <ButtonText>Sign up</ButtonText>
        </Button>
        <Button
          onPress={() => {
            router.navigate("/auth/create-password/2e675e3d-c1a6-4350-96c7-271a6d40d950");
          }}
        >
          <ButtonText>Create password</ButtonText>
        </Button>
        <Button
          onPress={() => {
            router.navigate("/dashboard");
          }}
        >
          <ButtonText>Dashboard</ButtonText>
        </Button>
        <Button
          onPress={() => {
            router.navigate("/news-feed");
          }}
        >
          <ButtonText>News feed</ButtonText>
        </Button>
        <Button
          onPress={() => {
            router.navigate("/profile");
          }}
        >
          <ButtonText>Profile</ButtonText>
        </Button>
        <Button
          onPress={() => {
            router.navigate("/upload-images");
          }}
        >
          <ButtonText>Upload Images</ButtonText>
        </Button>
        <Button
          onPress={() => {
            router.navigate("/form-builder/edit/1");
          }}
        >
          <ButtonText>Form builder</ButtonText>
        </Button>
        <Button
          onPress={() => {
            router.navigate("/extra-components");
          }}
        >
          <ButtonText>Extra components</ButtonText>
        </Button>
      </VStack>
    </SafeAreaView>
  );
}
