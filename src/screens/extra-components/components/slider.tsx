import { useState } from "react";

import { HStack } from "@/screens/components/ui/hstack";
import {
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from "@/screens/components/ui/slider";
import { Text } from "@/screens/components/ui/text";

export const SliderComponent = () => {
  const [value, setValue] = useState(30);
  return (
    <HStack space="md" className="flex-1 items-center">
      <Slider
        className="flex-1"
        size="md"
        value={value}
        onChange={setValue}
        orientation="horizontal"
        isDisabled={false}
        isReversed={false}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
      <Text className="ml-2">{value}</Text>
    </HStack>
  );
};
