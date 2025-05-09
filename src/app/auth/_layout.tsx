import radialGradient from "@assets/auth/radialGradient.png";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { HStack } from "@/components/ui/hstack";
import { Image } from "@/components/ui/image";
import { VStack } from "@/components/ui/vstack";

export default function AuthLayout() {
  return (
    <SafeAreaView className="flex-1">
      <HStack className="flex-1">
        {/* Side panel for web */}
        <VStack className="hidden flex-1 md:flex">
          <Image
            source={radialGradient}
            className="h-full w-full object-cover"
            alt="Radial Gradient"
          />
        </VStack>

        {/* Main content area */}
        <VStack className="flex-1 justify-center">
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { flex: 1 },
            }}
          />
        </VStack>
      </HStack>
    </SafeAreaView>
  );
}
