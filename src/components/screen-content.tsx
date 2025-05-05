import { EditScreenInfo } from "@/components/edit-screen-info";
import { Text, View } from "react-native";

type ScreenContentProps = {
  title: string;
  children?: React.ReactNode;
  path: string;
};

export const ScreenContent = ({ title, children, path }: ScreenContentProps) => {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-xl font-bold">{title}</Text>
      <View className="my-7 h-[1px] w-4/5 bg-gray-200" />
      <EditScreenInfo path={path} />
      {children}
    </View>
  );
};
