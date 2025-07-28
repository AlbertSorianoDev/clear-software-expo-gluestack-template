import { View } from "react-native";

import { FormListView } from "@/screens/(pages)/form-builder/components/form-list-view";
import { EditFormPrincipalInfo } from "@/screens/(pages)/form-builder/edit/components/edit-form/edit-form-principal-info";
import { FormSectionWrapper } from "@/screens/(pages)/form-builder/edit/components/form-section-wrapper";
import { FormPrincipalInfo } from "@/screens/(pages)/form-builder/edit/components/form-view/form-principal-info";
import { InputTypeActionSheet } from "@/screens/(pages)/form-builder/edit/components/input-type-action-sheet";
import { useEditFormBuilderPageStore } from "@/screens/(pages)/form-builder/edit/store/edit-form-builder-page-store";
import { Box } from "@/screens/components/ui/box";
import { ScrollView } from "@/screens/components/ui/scroll-view";
import { VStack } from "@/screens/components/ui/vstack";

const form = {
  title: "Form 1",
  description: "Ut sunt sit deserunt culpa ipsum.",
};

export default function EditFormPage() {
  // const { id } = useGlobalSearchParams();
  const setSelectedItemId = useEditFormBuilderPageStore((s) => s.setSelectedItemId);
  setSelectedItemId(null);

  return (
    <>
      <InputTypeActionSheet />
      <View className="flex-1">
        <ScrollView>
          <Box className="flex-1 items-center justify-center bg-background-100">
            <VStack className="w-full max-w-screen-md py-4" space="xl">
              <FormSectionWrapper id={-1}>
                {(isSelected) =>
                  isSelected ? (
                    <EditFormPrincipalInfo title={form.title} description={form.description} />
                  ) : (
                    <FormPrincipalInfo title={form.title} description={form.description} />
                  )
                }
              </FormSectionWrapper>
              <FormListView />
            </VStack>
          </Box>
        </ScrollView>
      </View>
    </>
  );
}
