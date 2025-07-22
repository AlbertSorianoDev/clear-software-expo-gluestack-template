import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ScrollView } from "@/screens/components/ui/scroll-view";
import { VStack } from "@/screens/components/ui/vstack";
import { AccordionComponent } from "@/screens/extra-components/components/accordion";
import { ComponentPresentationWrapper } from "@/screens/extra-components/components/component-presentation-wrapper";
import { LinearGradientExample } from "@/screens/extra-components/components/linear-gradient";
import { RadioComponent } from "@/screens/extra-components/components/radio";
import { SliderComponent } from "@/screens/extra-components/components/slider";
import { SwitchComponent } from "@/screens/extra-components/components/switch";

export default function ExtraComponentsPage() {
  return (
    <SafeAreaView className="flex-1">
      <ScrollView>
        <VStack className="flex-1 p-5" space="xl">
          <ComponentPresentationWrapper title="Radio component">
            <RadioComponent />
          </ComponentPresentationWrapper>
          <ComponentPresentationWrapper title="Slider component">
            <View className="max-w-96">
              <SliderComponent />
            </View>
          </ComponentPresentationWrapper>
          <ComponentPresentationWrapper title="Switch component">
            <SwitchComponent />
          </ComponentPresentationWrapper>
          <ComponentPresentationWrapper title="Linear gradient component">
            <View className="max-w-96">
              <LinearGradientExample />
            </View>
          </ComponentPresentationWrapper>
          <ComponentPresentationWrapper title="Accordion component">
            <AccordionComponent />
          </ComponentPresentationWrapper>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}
