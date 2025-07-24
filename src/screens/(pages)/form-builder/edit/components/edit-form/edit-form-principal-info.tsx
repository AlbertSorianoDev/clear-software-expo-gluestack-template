import { useState } from "react";

import { Input, InputField } from "@/screens/components/ui/input";
import { Textarea, TextareaInput } from "@/screens/components/ui/textarea";
import { VStack } from "@/screens/components/ui/vstack";

export const EditFormPrincipalInfo = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description);
  return (
    <VStack space="sm" className="border-t-8 border-primary-600 p-5 text-typography-950">
      <Input variant="underlined" className="bg-typography-50/55 hover:bg-typography-50/70">
        <InputField
          placeholder="Title"
          value={editTitle}
          onChangeText={setEditTitle}
          // onBlur={() => setIsEditingTitle(false)}
        />
      </Input>
      <Textarea variant="default" className="bg-typography-50/55 hover:bg-typography-50/70">
        <TextareaInput
          placeholder="Description"
          value={editDescription}
          onChangeText={setEditDescription}
          // onBlur={() => setIsEditingDescription(false)}
        />
      </Textarea>
    </VStack>
  );
};
