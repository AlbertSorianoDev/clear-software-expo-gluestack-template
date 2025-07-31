import { Redirect, useLocalSearchParams } from "expo-router";
import { PlusIcon } from "lucide-react-native";
import { useEffect } from "react";
import { Platform, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { useGetFormsId } from "@/data/forms/hooks/use-get-forms-id";
import { usePostFormsIdFields } from "@/data/forms/hooks/use-post-forms-id-fields";
import { usePutFormsId } from "@/data/forms/hooks/use-put-forms-id";
import { FormListView } from "@/screens/(pages)/form-builder/components/form-list-view";
import { FormListViewWeb } from "@/screens/(pages)/form-builder/components/form-list-view-web";
import { EditFormPrincipalInfo } from "@/screens/(pages)/form-builder/edit/components/edit-form/edit-form-principal-info";
import { FormSectionWrapper } from "@/screens/(pages)/form-builder/edit/components/form-section-wrapper";
import { FormPrincipalInfo } from "@/screens/(pages)/form-builder/edit/components/form-view/form-principal-info";
import { InputTypeActionSheet } from "@/screens/(pages)/form-builder/edit/components/input-type-action-sheet";
import { useEditFormBuilderPageStore } from "@/screens/(pages)/form-builder/edit/store/edit-form-builder-page-store";
import { Box } from "@/screens/components/ui/box";
import { Button, ButtonIcon } from "@/screens/components/ui/button";
import { Pressable } from "@/screens/components/ui/pressable";
import { Text } from "@/screens/components/ui/text";
import { VStack } from "@/screens/components/ui/vstack";
import { useErrorToast } from "@/screens/hooks/use-error-toast";
import { useLoadingToast } from "@/screens/hooks/use-loading-toast";

export default function EditFormPage() {
  const setSelectedItemId = useEditFormBuilderPageStore((s) => s.setSelectedItemId);
  const { id: urlFormId } = useLocalSearchParams<{ id?: string }>();

  const { showLoadingToast, closeLoadingToast } = useLoadingToast();
  const { showErrorToast } = useErrorToast();

  const { data: form } = useGetFormsId(urlFormId ? Number(urlFormId) : 0);
  const { mutateAsync: updateFormMutate } = usePutFormsId();
  const { mutateAsync: addNewFieldMutate } = usePostFormsIdFields();

  useEffect(() => {
    setSelectedItemId(null);
    return () => setSelectedItemId(null);
  }, [setSelectedItemId]);

  const handleUpdateForm = async () => {
    showLoadingToast({ message: "Updating form." });

    if (!form) return;

    try {
      await updateFormMutate({
        id: form.id,
        body: { tittle: "hola", description: "hola" },
      });
      closeLoadingToast();
    } catch {
      closeLoadingToast();
      showErrorToast({ message: "Error updating from." });
    }
  };

  const handleNewField = async () => {
    showLoadingToast({ message: "Adding form field." });

    if (!form) return;

    try {
      await updateFormMutate({
        id: form.id,
        body: { tittle: "hola", description: "hola" },
      });
      closeLoadingToast();
    } catch {
      closeLoadingToast();
      showErrorToast({ message: "Error adding form field." });
    }
  };

  if (!urlFormId) {
    return <Redirect href={"/form-builder"} />;
  }

  const FormList = Platform.OS === "web" ? <FormListViewWeb /> : <FormListView />;

  const Content = (
    <Box className="flex-1 items-center justify-center bg-background-100">
      <Pressable onPress={() => setSelectedItemId(null)} className="absolute inset-0" />

      <VStack className="flex w-full max-w-screen-md flex-1 py-4" space="xl">
        <FormSectionWrapper id={-1}>
          {(isSelected) =>
            isSelected ? (
              <EditFormPrincipalInfo
                title={form?.title ?? ""}
                description={form?.description ?? ""}
              />
            ) : (
              <FormPrincipalInfo title={form?.title ?? ""} description={form?.description ?? ""} />
            )
          }
        </FormSectionWrapper>
        {(form?.fields?.length ?? 0 > 0) ? (
          FormList
        ) : (
          <Box className="b- items-center justify-center gap-y-2 rounded border-2 bg-white p-6">
            <Text>No fields. Add a new field.</Text>
            <Button>
              <ButtonIcon as={PlusIcon} />
            </Button>
          </Box>
        )}
      </VStack>
    </Box>
  );

  return (
    <>
      <InputTypeActionSheet />
      <View className="h-full w-full">
        <KeyboardAwareScrollView
          style={{ flex: 1 }}
          keyboardShouldPersistTaps="handled"
          enableOnAndroid={true}
          contentContainerStyle={{ flex: 1 }}
        >
          {Content}
        </KeyboardAwareScrollView>
      </View>
    </>
  );
}
