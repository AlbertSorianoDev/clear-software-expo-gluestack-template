import { useEffect } from "react";
import { Platform, View } from "react-native";

import { FormListView } from "@/screens/(pages)/form-builder/components/form-list-view";
import { FormListViewWeb } from "@/screens/(pages)/form-builder/components/form-list-view-web";
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
  const setSelectedItemId = useEditFormBuilderPageStore((s) => s.setSelectedItemId);

  useEffect(() => {
    setSelectedItemId(null);
    return setSelectedItemId(null);
  }, [setSelectedItemId]);

  const Content = (
    <Box className="flex-1 items-center justify-center bg-background-100">
      <VStack className="flex w-full max-w-screen-md flex-1 py-4" space="xl">
        <FormSectionWrapper id={-1}>
          {(isSelected) =>
            isSelected ? (
              <EditFormPrincipalInfo title={form.title} description={form.description} />
            ) : (
              <FormPrincipalInfo title={form.title} description={form.description} />
            )
          }
        </FormSectionWrapper>
        {Platform.OS === "web" ? <FormListViewWeb /> : <FormListView />}
      </VStack>
    </Box>
  );

  return (
    <>
      <InputTypeActionSheet />
      <View className="flex-1">
        {Platform.OS == "web" ? (
          <ScrollView>{Content}</ScrollView>
        ) : (
          <ScrollView>{Content}</ScrollView>
        )}
      </View>
    </>
  );
}
