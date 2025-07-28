import { ReactNode } from "react";
import { View } from "react-native";

import { PublishedTab } from "@/screens/(pages)/form-builder/components/published-tab";
import Tabs from "@/screens/(pages)/form-builder/components/tab-component";
import { Box } from "@/screens/components/ui/box";
import { Button, ButtonText } from "@/screens/components/ui/button";
import { Heading } from "@/screens/components/ui/heading";
import { HStack } from "@/screens/components/ui/hstack";
import { ScrollView } from "@/screens/components/ui/scroll-view";

const tabs: { tabIndex: number; tabName: string; tabPanel: ReactNode }[] = [
  { tabIndex: 0, tabName: "Published", tabPanel: <PublishedTab published /> },
  { tabIndex: 1, tabName: "Unpublished", tabPanel: <PublishedTab /> },
];

export default function FormBuilderPage() {
  return (
    <View className="flex-1">
      <ScrollView>
        <HStack className="items-center justify-between border-b border-typography-100 px-5 py-2">
          <Heading>Forms</Heading>
          <Button variant="outline" size="xs" className="place-self-end">
            <ButtonText>New form</ButtonText>
          </Button>
        </HStack>

        <Box className="flex-1 items-center justify-center bg-background-100 text-typography-950">
          <Box className="h-full w-full max-w-screen-md bg-white">
            <Tabs defaultIndex={tabs[0].tabIndex} className="m-0 flex-1 p-0">
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
      </ScrollView>
    </View>
  );
}
