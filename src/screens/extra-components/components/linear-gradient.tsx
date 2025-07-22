import { LinearGradient } from "@/screens/components/ui/linear-gradient";
import { Text } from "@/screens/components/ui/text";

export const LinearGradientExample = () => {
  return (
    <>
      <LinearGradient
        className="w-full items-center rounded-full py-2"
        colors={["#8637CF", "#0F55A1"]}
        start={[0, 1]}
        end={[1, 0]}
      >
        <Text className="font-semibold text-white">Subscribe</Text>
      </LinearGradient>
    </>
  );
};
