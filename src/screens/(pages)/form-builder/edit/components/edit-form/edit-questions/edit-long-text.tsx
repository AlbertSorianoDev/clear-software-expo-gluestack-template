import { Input, InputField } from "@/screens/components/ui/input";

export const EditLongTextQuestion = () => {
  return (
    <Input variant="underlined" className="w-full" isDisabled>
      <InputField placeholder="Long answer text" multiline />
    </Input>
  );
};
