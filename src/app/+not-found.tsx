// app/+not-found.tsx
import { useNavigation, useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

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
      <Pressable
        onPress={() => {
          if (navigation.canGoBack()) {
            router.back();
          } else {
            router.replace("/");
          }
        }}
        className="rounded-lg bg-blue-600 px-4 py-2"
      >
        <Text className="font-semibold text-white">Go back</Text>
      </Pressable>
    </View>
  );
}
