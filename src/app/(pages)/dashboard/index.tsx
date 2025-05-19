import image from "@assets/dashboard/image.png";
import image2 from "@assets/dashboard/image2.png";
import image3 from "@assets/dashboard/image3.png";
import image4 from "@assets/dashboard/image4.png";
import image5 from "@assets/dashboard/image5.png";
import image6 from "@assets/dashboard/image6.png";
import image7 from "@assets/dashboard/image7.png";
import { AntDesign } from "@expo/vector-icons";
import { cn } from "@gluestack-ui/nativewind-utils/cn";
import { isWeb } from "@gluestack-ui/nativewind-utils/IsWeb";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import { Grid, GridItem } from "@/components/ui/grid";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { ScrollView } from "@/components/ui/scroll-view";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";

interface CardData {
  bannerImage: number;
  title: string;
  description: string;
}
interface HolidaysCardData {
  title: string;
  description: string;
}
interface LeavesCardData {
  title: string;
  description: string;
  leaves: number;
  isDisabled: boolean;
}
interface ColleaguesCardData {
  image: number;
  title: string;
  position: string;
}

const HeadingCards: CardData[] = [
  {
    bannerImage: image,
    title: "Update your profile",
    description: "Add your details",
  },
  {
    bannerImage: image2,
    title: "Your skills",
    description: "Add your skills here",
  },
  {
    bannerImage: image3,
    title: "Your goals",
    description: "Set a target to accomplish",
  },
  {
    bannerImage: image3,
    title: "Your goals",
    description: "Set a target to accomplish",
  },
  {
    bannerImage: image3,
    title: "Your goals",
    description: "Set a target to accomplish",
  },
];
const HolidaysCards: HolidaysCardData[] = [
  {
    title: "Navaratri",
    description: "12 March, Monday (Optional holiday)",
  },
  {
    title: "Durga Puja",
    description: "12 October, Tuesday",
  },
  {
    title: "Diwali",
    description: "12 March, Wednesday",
  },
  {
    title: "Christmas",
    description: "12 March, Thursday",
  },
];
const LeavesCards: LeavesCardData[] = [
  {
    title: "Earned Leaves",
    description: "Available 24",
    leaves: 24,
    isDisabled: false,
  },
  {
    title: "Sick Leaves",
    description: "Available 24",
    leaves: 24,
    isDisabled: false,
  },
  {
    title: "Menstrual Leaves",
    description: "Available 20",
    leaves: 20,
    isDisabled: false,
  },
  {
    title: "Optional Leaves",
    description: "Available 0",
    leaves: 0,
    isDisabled: true,
  },
];
const ColleaguesCards: ColleaguesCardData[] = [
  {
    image: image7,
    title: "Emily Zho",
    position: "UI/UX Designer",
  },
  {
    image: image4,
    title: "Marilyn Monroe",
    position: "SDE II",
  },
  {
    image: image5,
    title: "James Kant",
    position: "SDE III",
  },
  {
    image: image6,
    title: "Richard Faynmen",
    position: "CEO Marketing",
  },
];

export default function MainContent() {
  return (
    <Box className="flex-1">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: isWeb ? 0 : 100,
          flexGrow: 1,
        }}
        className="mb-20 flex-1 md:mb-2"
      >
        <VStack className="w-full p-4 pb-0 md:px-10 md:pt-6" space="2xl">
          <Heading size="2xl" className="font-roboto">
            Welcome Alexander
          </Heading>

          <Grid className="gap-5" _extra={{ className: "" }}>
            {HeadingCards.map((item, index) => {
              return (
                <GridItem
                  _extra={{
                    className: "col-span-12 sm:col-span-6 lg:col-span-4",
                  }}
                  key={index}
                >
                  <HStack
                    space="md"
                    className="border-border-300 items-center justify-between rounded-lg border p-4"
                  >
                    <HStack space="xl" className="items-center">
                      <Avatar>
                        <AvatarImage source={item.bannerImage} />
                      </Avatar>
                      <VStack>
                        <Text className="line-clamp-1 font-semibold text-typography-900">
                          {item.title}
                        </Text>
                        <Text className="line-clamp-1">{item.description}</Text>
                      </VStack>
                    </HStack>
                    <Button size="xs">
                      <ButtonText>Edit</ButtonText>
                    </Button>
                  </HStack>
                </GridItem>
              );
            })}
          </Grid>

          <Box className="rounded-md bg-background-50 p-4">
            <Text className="text-center font-medium">
              To view analytics you need client ID. Add it to your settings and you’re good to go.
            </Text>
          </Box>
          <Grid className="gap-5" _extra={{ className: "" }}>
            <GridItem
              _extra={{
                className: "col-span-12 sm:col-span-6 lg:col-span-4",
              }}
            >
              <VStack
                className="border-border-300 items-center justify-between rounded-lg border px-4 py-6"
                space="sm"
              >
                <Box className="w-full self-start px-4">
                  <Heading size="lg" className="font-roboto text-typography-700">
                    Upcoming Holidays
                  </Heading>
                </Box>
                <Divider />
                {HolidaysCards.map((item, index) => {
                  return (
                    <HStack space="lg" key={index} className="w-full px-4 py-2">
                      <Avatar className="h-10 w-10 bg-background-50">
                        <AntDesign name="calendar" size={24} color={"gray"} />
                      </Avatar>
                      <VStack>
                        <Text className="line-clamp-1 font-roboto text-typography-900">
                          {item.title}
                        </Text>
                        <Text className="line-clamp-1 font-roboto text-sm">{item.description}</Text>
                      </VStack>
                    </HStack>
                  );
                })}
              </VStack>
            </GridItem>
            <GridItem
              _extra={{
                className: "col-span-12 sm:col-span-6 lg:col-span-4",
              }}
            >
              <VStack
                className="border-border-300 items-center justify-between rounded-lg border px-4 py-6"
                space="sm"
              >
                <Box className="w-full self-start px-4">
                  <Heading size="lg" className="font-roboto text-typography-700">
                    Your Leaves
                  </Heading>
                </Box>
                <Divider />
                {LeavesCards.map((item, index) => {
                  return (
                    <HStack
                      space="lg"
                      key={index}
                      className="w-full items-center justify-between px-4 py-2"
                    >
                      <HStack space="xl" className="items-center">
                        <Box
                          className={cn(
                            "h-10 w-10 items-center justify-center rounded-full",
                            { "bg-success-0": item.leaves !== 0 },
                            { "bg-error-50": item.leaves === 0 },
                          )}
                        >
                          <Text
                            className={cn(
                              { "text-success-800": item.leaves !== 0 },
                              { "text-error-700": item.leaves === 0 },
                            )}
                          >
                            {item.leaves}
                          </Text>
                        </Box>
                        <VStack>
                          <Text className="line-clamp-1 font-roboto text-typography-900">
                            {item.title}
                          </Text>
                          <Text className="line-clamp-1 font-roboto text-sm">
                            {item.description}
                          </Text>
                        </VStack>
                      </HStack>
                      <Button
                        isDisabled={item.isDisabled}
                        variant="outline"
                        action="secondary"
                        size="xs"
                      >
                        <ButtonText>Apply</ButtonText>
                      </Button>
                    </HStack>
                  );
                })}
              </VStack>
            </GridItem>
            <GridItem
              _extra={{
                className: "col-span-12 sm:col-span-6 lg:col-span-4",
              }}
            >
              <VStack
                className="border-border-300 items-center justify-between rounded-lg border px-4 py-6"
                space="sm"
              >
                <Box className="w-full self-start px-4">
                  <Heading size="lg" className="font-roboto text-typography-700">
                    New colleagues
                  </Heading>
                </Box>
                <Divider />
                {ColleaguesCards.map((item, index) => {
                  return (
                    <HStack space="lg" key={index} className="w-full px-4 py-2">
                      <Avatar className="h-10 w-10">
                        <AvatarImage source={item.image} />
                      </Avatar>
                      <VStack>
                        <Text className="line-clamp-1 font-roboto text-typography-900">
                          {item.title}
                        </Text>
                        <Text className="line-clamp-1 font-roboto text-sm">{item.position}</Text>
                      </VStack>
                    </HStack>
                  );
                })}
              </VStack>
            </GridItem>
            <GridItem
              _extra={{
                className: "col-span-12 sm:col-span-6 lg:col-span-4",
              }}
            >
              <VStack
                className="border-border-300 items-center justify-between rounded-lg border px-4 py-6"
                space="sm"
              >
                <Box className="w-full self-start px-4">
                  <Heading size="lg" className="font-roboto text-typography-700">
                    New colleagues
                  </Heading>
                </Box>
                <Divider />
                {ColleaguesCards.map((item, index) => {
                  return (
                    <HStack space="lg" key={index} className="w-full px-4 py-2">
                      <Avatar className="h-10 w-10">
                        <AvatarImage source={item.image} />
                      </Avatar>
                      <VStack>
                        <Text className="line-clamp-1 font-roboto text-typography-900">
                          {item.title}
                        </Text>
                        <Text className="line-clamp-1 font-roboto text-sm">{item.position}</Text>
                      </VStack>
                    </HStack>
                  );
                })}
              </VStack>
            </GridItem>
          </Grid>
        </VStack>
      </ScrollView>
    </Box>
  );
}
