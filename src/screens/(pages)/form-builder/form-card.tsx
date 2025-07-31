import { router } from "expo-router";
import { FileInput, Pencil, Trash2 } from "lucide-react-native";
import { useState } from "react";

import { Box } from "@/screens/components/ui/box";
import { Button, ButtonIcon, ButtonText } from "@/screens/components/ui/button";
import { Card } from "@/screens/components/ui/card";
import { Heading } from "@/screens/components/ui/heading";
import { HStack } from "@/screens/components/ui/hstack";
import { Switch } from "@/screens/components/ui/switch";
import { Text } from "@/screens/components/ui/text";
import { VStack } from "@/screens/components/ui/vstack";

export const FormCard = ({
  id,
  title,
  description,
  isActive = false,
  isPublished = false,
}: {
  id: number;
  title: string;
  description: string;
  isActive?: boolean;
  isPublished?: boolean;
}) => {
  const [active, setActive] = useState(isActive);

  const handleEditForm = () => {
    router.push(`/form-builder/edit/${id}`);
  };

  return (
    <Card variant="elevated" className="h-fit border border-typography-100 p-4">
      <VStack space="md">
        <HStack className="flex-1 items-center justify-between" space="md">
          <Heading className="flex-1 text-typography-950" size="sm">
            Form {id}
          </Heading>
          {isPublished && (
            <Box className="flex-col items-center md:flex-row md:gap-2">
              <Text className="text-xs text-typography-500" size="xs">
                Active
              </Text>
              <Switch
                value={active}
                onToggle={setActive}
                trackColor={{ false: "#e2e2e2", true: "#3dd2cc" }}
                thumbColor={"#3dd2cc"}
                ios_backgroundColor={"#e2e2e2"}
              />
            </Box>
          )}
        </HStack>
        <HStack className="items-center justify-between">
          <VStack space="xs" className="flex-1">
            <Text className="font-semibold">{title}</Text>
            <Text>{description}</Text>
          </VStack>
          {!isPublished && (
            <VStack className="items-end" space="xs">
              <Button variant="outline" size="xs" className="w-fit" onPress={handleEditForm}>
                <ButtonIcon as={Pencil} />
              </Button>
              <Button variant="outline" size="xs" className="w-fit">
                <ButtonIcon as={Trash2} />
              </Button>
              <Button variant="outline" size="xs" className="w-fit">
                <ButtonIcon as={FileInput} />
              </Button>
            </VStack>
          )}
        </HStack>

        {isPublished && (
          <VStack className="items-end">
            <Button variant="outline" size="xs" className="w-fit">
              <ButtonText>Responses</ButtonText>
            </Button>
          </VStack>
        )}
      </VStack>
    </Card>
  );
};
