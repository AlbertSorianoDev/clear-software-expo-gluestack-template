import { ReactNode } from "react";
import { View } from "react-native";

import { usePostForms } from "@/data/forms/hooks/use-post-forms";
import { PublishedTab } from "@/screens/(pages)/form-builder/components/published-tab";
import Tabs from "@/screens/(pages)/form-builder/components/tab-component";
import { Box } from "@/screens/components/ui/box";
import { Button, ButtonText } from "@/screens/components/ui/button";
import { Divider } from "@/screens/components/ui/divider";
import { Heading } from "@/screens/components/ui/heading";
import { HStack } from "@/screens/components/ui/hstack";
import { Spinner } from "@/screens/components/ui/spinner";
import { Toast, ToastTitle, useToast } from "@/screens/components/ui/toast";

const tabs: { tabIndex: number; tabName: string; tabPanel: ReactNode }[] = [
  { tabIndex: 0, tabName: "Published", tabPanel: <PublishedTab published /> },
  { tabIndex: 1, tabName: "Unpublished", tabPanel: <PublishedTab /> },
];

export default function FormBuilderPage() {
  const { mutateAsync: formsMutate, isSuccess, isError } = usePostForms();
  const toast = useToast();

  const newFormHandler = async () => {
    const creatingToastId = toast.show({
      placement: "bottom right",
      duration: null,
      render: ({ id }) => {
        const toastId = "toast-" + id;
        return (
          <Toast nativeID={toastId} className="flex-row items-center gap-4 px-5 py-3 shadow-soft-1">
            <Spinner size="small" color="rgb(var(--color-primary-600))" />
            <Divider orientation="vertical" className="h-[30px] bg-outline-200" />
            <ToastTitle size="sm">Creating new form.</ToastTitle>
          </Toast>
        );
      },
    });

    // await formsMutate();
    await new Promise((res) => setTimeout(res, 3000));

    toast.close(creatingToastId);
  };

  return (
    <View className="flex-1">
      <HStack className="items-center justify-between border-b border-typography-100 px-5 py-2">
        <Heading>Forms</Heading>
        <Button variant="outline" size="xs" className="place-self-end" onPress={newFormHandler}>
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
