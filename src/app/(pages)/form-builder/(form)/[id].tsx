import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { useGetFormsId } from "@/data/forms/hooks/use-get-forms-id";
import { RenderQuestion } from "@/screens/(pages)/form-builder/(form)/components/render-question";
import { FormSectionWrapper } from "@/screens/(pages)/form-builder/edit/components/form-section-wrapper";
import { FormPrincipalInfo } from "@/screens/(pages)/form-builder/edit/components/form-view/form-principal-info";
import { useEditFormBuilderPageStore } from "@/screens/(pages)/form-builder/edit/store/edit-form-builder-page-store";
import { Box } from "@/screens/components/ui/box";
import { Heading } from "@/screens/components/ui/heading";
import { Text } from "@/screens/components/ui/text";
import { VStack } from "@/screens/components/ui/vstack";

export default function FormAnswerPage() {
  const setSelectedItemId = useEditFormBuilderPageStore((s) => s.setSelectedItemId);
  const { id: urlFormId } = useLocalSearchParams<{
    id?: string;
    submissionId?: string;
  }>();

  const { data: form } = useGetFormsId(urlFormId ? Number(urlFormId) : 0);

  useEffect(() => {
    setSelectedItemId(null);
    return setSelectedItemId(null);
  }, [setSelectedItemId]);

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      keyboardShouldPersistTaps="handled"
      enableOnAndroid={true}
    >
      <Box className="flex-1 items-center justify-center bg-background-100">
        <VStack className="w-full max-w-screen-md py-4" space="xl">
          <FormPrincipalInfo title={form?.title ?? ""} description={form?.description ?? ""} />

          <VStack className="w-full max-w-screen-md" space="md">
            {form?.fields
              ?.sort((a, b) => a.order - b.order)
              .map((field, index) => (
                <FormSectionWrapper key={index} id={field.id}>
                  {() => (
                    <VStack space="sm" className="p-5">
                      <Heading size="md">{field.title}</Heading>
                      <Text size="md">{field.description}</Text>
                      <RenderQuestion id={field.id} type={field.inputType} />
                    </VStack>
                  )}
                </FormSectionWrapper>
              ))}
          </VStack>
        </VStack>
      </Box>
    </KeyboardAwareScrollView>
  );
}
