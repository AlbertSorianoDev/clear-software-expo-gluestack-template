import { useNavigation, useRouter } from "expo-router";
import { Text, View } from "react-native";

import { Button, ButtonText } from "@/components/ui/button";

export default function NotFound() {
  const router = useRouter();
  const navigation = useNavigation();

  return (
    <View className="flex-1 items-center justify-center bg-white px-4 dark:bg-black">
      <Text className="text-center text-2xl font-bold text-black dark:text-white">
        Page not found
      </Text>
      <Text className="mb-4 mt-2 text-center text-gray-600 dark:text-gray-300">
        The page you're looking for doesn't exist.
      </Text>
      <Button
        onPress={() => {
          if (navigation.canGoBack()) {
            router.back();
          } else {
            router.replace("/");
          }
        }}
      >
        <ButtonText className="font-semibold text-white">Go back</ButtonText>
      </Button>
    </View>
  );
}
