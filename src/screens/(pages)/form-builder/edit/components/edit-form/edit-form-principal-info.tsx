import { useEffect, useRef } from "react";

import { useEditFormBuilderPageStore } from "../../store/edit-form-builder-page-store";

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
  const { title: formTitle, description: formDescription } = useEditFormBuilderPageStore(
    (s) => s.form,
  );
  const { setTitle: setFormTitle, setDescription: setFormDescription } =
    useEditFormBuilderPageStore((s) => s.setForm);

  const didInitRef = useRef(false);

  useEffect(() => {
    if (!didInitRef.current) {
      setFormTitle(title);
      setFormDescription(description);
      didInitRef.current = true;
    }

    return () => {
      setFormTitle("");
      setFormDescription("");
      didInitRef.current = false;
    };
  }, [title, description, setFormTitle, setFormDescription]);

  return (
    <VStack space="sm" className="border-t-8 border-primary-600 p-5 text-typography-950">
      <Input variant="underlined" className="bg-typography-50/55 hover:bg-typography-50/70">
        <InputField
          placeholder="Title"
          value={formTitle}
          onChangeText={setFormTitle}
          // onBlur={() => setIsEditingTitle(false)}
        />
      </Input>
      <Textarea variant="default" className="bg-typography-50/55 hover:bg-typography-50/70">
        <TextareaInput
          placeholder="Description"
          value={formDescription}
          onChangeText={setFormDescription}
          // onBlur={() => setIsEditingDescription(false)}
        />
      </Textarea>
    </VStack>
  );
};
