import { Redirect, useLocalSearchParams } from "expo-router";
import { PlusIcon } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Platform, Pressable, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { useGetFormsId } from "@/data/forms/hooks/use-get-forms-id";
// import { FormListView } from "@/screens/(pages)/form-builder/components/form-list-view";
import { FormListViewMobile } from "@/screens/(pages)/form-builder/components/form-list-view-mobile";
import { FormListViewWeb } from "@/screens/(pages)/form-builder/components/form-list-view-web";
import { EditFormPrincipalInfo } from "@/screens/(pages)/form-builder/edit/components/edit-form/edit-form-principal-info";
import { FormSectionWrapper } from "@/screens/(pages)/form-builder/edit/components/form-section-wrapper";
import { FormPrincipalInfo } from "@/screens/(pages)/form-builder/edit/components/form-view/form-principal-info";
import { InputTypeActionSheet } from "@/screens/(pages)/form-builder/edit/components/input-type-action-sheet";
import { useNewFormField } from "@/screens/(pages)/form-builder/edit/hooks/use-new-form-field";
import { useSetupFormUpdater } from "@/screens/(pages)/form-builder/edit/hooks/use-setup-form-updater";
import { useEditFormBuilderPageStore } from "@/screens/(pages)/form-builder/edit/store/edit-form-builder-page-store";
import { Box } from "@/screens/components/ui/box";
import { Button, ButtonIcon, ButtonText } from "@/screens/components/ui/button";
import { Text } from "@/screens/components/ui/text";
import { VStack } from "@/screens/components/ui/vstack";

export default function EditFormPage() {
  const { id: urlFormId } = useLocalSearchParams<{ id?: string }>();

  const { data: form } = useGetFormsId(urlFormId ? Number(urlFormId) : 0);

  const mobileSortableMode = useEditFormBuilderPageStore((state) => state.mobileSortableMode);
  const setMobileSortableMode = useEditFormBuilderPageStore((state) => state.setMobileSortableMode);

  const setSelectedItemId = useEditFormBuilderPageStore((s) => s.setSelectedItemId);
  const setShowInputTypeActionSheet = useEditFormBuilderPageStore(
    (state) => state.setShowInputTypeActionSheet,
  );

  const [fieldsKey, setFieldsKey] = useState(0);

  useSetupFormUpdater(form);
  const createNewField = useNewFormField(form);

  useEffect(() => {
    setSelectedItemId(null);
    return () => setSelectedItemId(null);
  }, [setSelectedItemId]);

  useEffect(() => {
    if (form?.fields) setFieldsKey((prev) => prev + 1);
  }, [form?.fields]);

  if (!urlFormId) {
    return <Redirect href={"/form-builder"} />;
  }

  const FormList =
    Platform.OS === "web" ? (
      <FormListViewWeb key={fieldsKey} fields={form?.fields} />
    ) : (
      <FormListViewMobile key={fieldsKey} />
    );

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
        <Box className="fixed right-0 flex w-full items-end justify-end px-2">
          <Button
            size="md"
            className="w-fit"
            onPress={() => setMobileSortableMode(!mobileSortableMode)}
          >
            <ButtonText>Sort mode</ButtonText>
          </Button>
        </Box>

        {(form?.fields?.length ?? 0 > 0) ? (
          FormList
        ) : (
          <Box className="b- items-center justify-center gap-y-2 rounded border-2 bg-white p-6">
            <Text>No fields. Add a new field.</Text>
            <Button onPress={() => setShowInputTypeActionSheet(true)}>
              <ButtonIcon as={PlusIcon} />
            </Button>
          </Box>
        )}
      </VStack>
    </Box>
  );

  return (
    <>
      <InputTypeActionSheet onSelect={createNewField} />

      <View className="flex-1">
        {!mobileSortableMode ? (
          <KeyboardAwareScrollView
            style={{ flex: 1 }}
            keyboardShouldPersistTaps="handled"
            enableOnAndroid={true}
            contentContainerStyle={{ flexGrow: 1 }}
          >
            {Content}
          </KeyboardAwareScrollView>
        ) : (
          Content
        )}
      </View>
    </>
  );
}
