import clsx from "clsx";
import { useRouter } from "expo-router";
import { useColorScheme } from "nativewind";

import { Button, ButtonText } from "@/components/ui/button";
import { Icon, StarIcon } from "@/components/ui/icon";
import { VStack } from "@/components/ui/vstack";

export default function SplashScreen() {
  const router = useRouter();
  const { colorScheme } = useColorScheme();

  return (
    <VStack className="h-full w-full max-w-[440px] items-center justify-center" space="lg">
      <Icon
        as={StarIcon}
        className={clsx("h-10 w-[219px]", colorScheme === "dark" ? "text-white" : "text-black")}
      />
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
  );
}
