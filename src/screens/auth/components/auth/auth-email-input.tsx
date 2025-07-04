import { Keyboard } from "react-native";

import { InputErrorMessage } from "@/screens/components/custom/input-error-message";
import { Input, InputField } from "@/screens/components/ui/input";
import { VStack } from "@/screens/components/ui/vstack";

interface AuthEmailInputProps {
  email: string;
  setEmail: (text: string) => void;
  error?: string;
}

export function AuthEmailInput({ email, setEmail, error }: AuthEmailInputProps) {
  return (
    <VStack className="gap-y-1">
      <Input>
        <InputField
          placeholder="Email"
          type="text"
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          onSubmitEditing={Keyboard.dismiss}
          returnKeyType="done"
        />
      </Input>
      <InputErrorMessage error={error} />
    </VStack>
  );
}
