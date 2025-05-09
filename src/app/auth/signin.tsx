import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";

export default function SignIn() {
  console.log("SignUp mounted"); // test log
  return (
    <VStack>
      <Text>On SignIn</Text>
    </VStack>
  );
}
