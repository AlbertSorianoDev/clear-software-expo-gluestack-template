import { router } from "expo-router";
import { ReactNode } from "react";
import { View } from "react-native";

import { usePostForms } from "@/data/forms/hooks/use-post-forms";
import { PublishedTab } from "@/screens/(pages)/form-builder/components/published-tab";
import Tabs from "@/screens/(pages)/form-builder/components/tab-component";
import { Box } from "@/screens/components/ui/box";
import { Button, ButtonText } from "@/screens/components/ui/button";
import { Heading } from "@/screens/components/ui/heading";
import { HStack } from "@/screens/components/ui/hstack";
import { useErrorToast } from "@/screens/hooks/use-error-toast";
import { useLoadingToast } from "@/screens/hooks/use-loading-toast";

const tabs: { tabIndex: number; tabName: string; tabPanel: ReactNode }[] = [
  { tabIndex: 0, tabName: "Published", tabPanel: <PublishedTab published /> },
  { tabIndex: 1, tabName: "Unpublished", tabPanel: <PublishedTab /> },
];

export default function FormBuilderPage() {
  const { mutateAsync: formsMutate, isPending: newFormIsPending } = usePostForms();
  const { showLoadingToast, closeLoadingToast } = useLoadingToast();
  const { showErrorToast } = useErrorToast();

  const newFormHandler = async () => {
    showLoadingToast({ message: "Creating new form." });

    try {
      const newForm = await formsMutate();
      closeLoadingToast();
      router.push(`/form-builder/edit/${newForm.id}`);
    } catch {
      closeLoadingToast();
      showErrorToast({ message: "Error creating from." });
    }
  };

  return (
    <View className="flex-1">
      <HStack className="items-center justify-between border-b border-typography-100 px-5 py-2">
        <Heading>Forms</Heading>
        <Button
          variant="outline"
          size="xs"
          className="place-self-end"
          onPress={newFormHandler}
          disabled={newFormIsPending}
        >
          <ButtonText>New form</ButtonText>
        </Button>
      </HStack>

      <Box className="flex-1 items-center justify-center bg-background-100 text-typography-950">
        <Box className="h-full w-full max-w-screen-md">
          <Tabs defaultIndex={tabs[0].tabIndex} className="m-0 flex-1 bg-white p-0">
            <Tabs.List>
              {tabs.map((tab) => (
                <Tabs.Trigger key={tab.tabIndex} index={tab.tabIndex}>
                  {tab.tabName}
                </Tabs.Trigger>
              ))}
            </Tabs.List>

            {tabs.map((tab) => (
              <Tabs.Panel key={tab.tabIndex} index={tab.tabIndex}>
                {tab.tabPanel}
              </Tabs.Panel>
            ))}
          </Tabs>
        </Box>
      </Box>
    </View>
  );
}
