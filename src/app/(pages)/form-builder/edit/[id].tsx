import { View } from "react-native";

import { FormListView } from "@/screens/(pages)/form-builder/components/form-list-view";
import { EditFormPrincipalInfo } from "@/screens/(pages)/form-builder/edit/components/edit-form/edit-form-principal-info";
import { FormSectionWrapper } from "@/screens/(pages)/form-builder/edit/components/form-section-wrapper";
import { FormPrincipalInfo } from "@/screens/(pages)/form-builder/edit/components/form-view/form-principal-info";
import { InputTypeActionSheet } from "@/screens/(pages)/form-builder/edit/components/input-type-action-sheet";
import { Box } from "@/screens/components/ui/box";
import { ScrollView } from "@/screens/components/ui/scroll-view";
import { VStack } from "@/screens/components/ui/vstack";

const form = {
  title: "Form 1",
  description:
    "Ut sunt sit deserunt culpa ipsum nisi sit tempor proident mollit proident cupidatat. Fugiat amet qui labore mollit Lorem. Magna ipsum cillum ipsum ad culpa velit anim dolore quis culpa irure deserunt nostrud. Velit commodo proident aliquip amet nisi cillum exercitation laboris esse nulla. Pariatur cillum culpa incididunt eiusmod.",
};

export default function EditFormPage() {
  return (
    <>
      <InputTypeActionSheet />
      <View className="flex-1">
        <ScrollView>
          <Box className="flex-1 items-center justify-center bg-background-100">
            <VStack className="w-full max-w-screen-md flex-1 py-4" space="xl">
              <FormSectionWrapper>
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
