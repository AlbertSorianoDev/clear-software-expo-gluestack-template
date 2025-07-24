import { Input, InputField } from "@/screens/components/ui/input";

export const EditShortTextQuestion = () => {
  return (
    <Input variant="underlined" className="w-1/2" isDisabled>
      <InputField placeholder="Short answer text" />
    </Input>
  );
};
