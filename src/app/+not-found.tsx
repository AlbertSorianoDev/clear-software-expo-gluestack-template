import { router, useNavigation } from "expo-router";
import { Text, View } from "react-native";

import { Button, ButtonText } from "@/components/ui/button";

export default function NotFound() {
  const navigation = useNavigation();

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-center text-2xl font-bold">Page not found</Text>
      <Text className="mb-4 mt-2 text-center">The page you're looking for doesn't exist.</Text>
      <Button
        onPress={() => {
          if (navigation.canGoBack()) {
            router.back();
          } else {
            router.replace("/");
          }
        }}
      >
        <ButtonText className="font-semibold">Go back</ButtonText>
      </Button>
    </View>
  );
}
