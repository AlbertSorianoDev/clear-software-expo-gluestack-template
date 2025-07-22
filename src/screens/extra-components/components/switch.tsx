import { useState } from "react";
import colors from "tailwindcss/colors";

import { HStack } from "@/screens/components/ui/hstack";
import { Switch } from "@/screens/components/ui/switch";
import { Text } from "@/screens/components/ui/text";

export const SwitchComponent = () => {
  const [value, setValue] = useState(true);
  return (
    <HStack space="md" className="items-center">
      <Switch
        value={value}
        onToggle={setValue}
        // onValueChange={setValue}
        trackColor={{ false: colors.slate[200], true: "#3dd2cc" }}
        thumbColor={"#3dd2cc"}
        //  activeThumbColor={colors.neutral[50]}
        ios_backgroundColor={colors.slate[200]}
      />
      <Text size="sm">Public profile</Text>
    </HStack>
  );
};
