import image from "@assets/news-feed/image.png";
import image2 from "@assets/news-feed/image2.png";
import image3 from "@assets/news-feed/image3.png";
import image4 from "@assets/news-feed/image4.png";
import image5 from "@assets/news-feed/image5.png";
import image6 from "@assets/news-feed/image6.png";
import image7 from "@assets/news-feed/image7.png";
import image8 from "@assets/news-feed/image8.png";
import { DownloadIcon, SearchIcon } from "lucide-react-native";

import { ColumnsWebScrollMobileView } from "@/screens/components/custom/columns-web-scroll-mobile-view";
import { Avatar, AvatarFallbackText, AvatarImage } from "@/screens/components/ui/avatar";
import { Box } from "@/screens/components/ui/box";
import { Button, ButtonIcon, ButtonText } from "@/screens/components/ui/button";
import { Heading } from "@/screens/components/ui/heading";
import { HStack } from "@/screens/components/ui/hstack";
import { Image } from "@/screens/components/ui/image";
import { Input, InputField, InputIcon, InputSlot } from "@/screens/components/ui/input";
import { ScrollView } from "@/screens/components/ui/scroll-view";
import { Text } from "@/screens/components/ui/text";
import { VStack } from "@/screens/components/ui/vstack";
import { useIsMobile } from "@/screens/hooks/use-is-mobile";

interface BlogData {
  bannerImage: number;
  title: string;
  description: string;
  publishedDate: string;
}
interface CreatorData {
  bannerImage: number;
  name: string;
  description: string;
}

const WORLD_DATA: BlogData[] = [
  {
    bannerImage: image3,
    title: "The Power of Positive Thinking",
    description:
      "Discover how the power of positive thinking can transform your life, boost your confidence, and help you overcome challenges. Explore practical tips and techniques to cultivate a positive mindset for greater happiness and success.",
    publishedDate: "May 15, 2023",
  },
  {
    bannerImage: image4,
    title: "The Power of Positive Thinking",
    description:
      "Discover how the power of positive thinking can transform your life, boost your confidence, and help you overcome challenges. Explore practical tips and techniques to cultivate a positive mindset for greater happiness and success.",
    publishedDate: "May 15, 2023",
  },
  {
    bannerImage: image5,
    title: "The Power of Positive Thinking",
    description:
      "Discover how the power of positive thinking can transform your life, boost your confidence, and help you overcome challenges. Explore practical tips and techniques to cultivate a positive mindset for greater happiness and success.",
    publishedDate: "May 15, 2023",
  },
  {
    bannerImage: image3,
    title: "The Power of Positive Thinking",
    description:
      "Discover how the power of positive thinking can transform your life, boost your confidence, and help you overcome challenges. Explore practical tips and techniques to cultivate a positive mindset for greater happiness and success.",
    publishedDate: "May 15, 2023",
  },
  {
    bannerImage: image4,
    title: "The Power of Positive Thinking",
    description:
      "Discover how the power of positive thinking can transform your life, boost your confidence, and help you overcome challenges. Explore practical tips and techniques to cultivate a positive mindset for greater happiness and success.",
    publishedDate: "May 15, 2023",
  },
];
const BLOGS_DATA: BlogData[] = [
  {
    bannerImage: image,
    title: "The Power of Positive Thinking",
    description:
      "Discover how the power of positive thinking can transform your life, boost your confidence, and help you overcome challenges. Explore practical tips and techniques to cultivate a positive mindset for greater happiness and success.",
    publishedDate: "May 15, 2023",
  },
  {
    bannerImage: image2,
    title: "The Power of Positive Thinking",
    description:
      "Discover how the power of positive thinking can transform your life, boost your confidence, and help you overcome challenges. Explore practical tips and techniques to cultivate a positive mindset for greater happiness and success.",
    publishedDate: "May 15, 2023",
  },
  {
    bannerImage: image2,
    title: "The Power of Positive Thinking",
    description:
      "Discover how the power of positive thinking can transform your life, boost your confidence, and help you overcome challenges. Explore practical tips and techniques to cultivate a positive mindset for greater happiness and success.",
    publishedDate: "May 15, 2023",
  },
];

const CREATORS_DATA: CreatorData[] = [
  {
    bannerImage: image6,
    name: "Emily Zho",
    description: "Designer by heart, writer by profession, talks about design",
  },
  {
    bannerImage: image7,
    name: "Ram Nagana",
    description: "Founder of Fortune 500 company Alo, talks about",
  },
  {
    bannerImage: image8,
    name: "David John",
    description: "Creator of all things metal, talks about music and art. ",
  },
];

export default function NewsFeed() {
  const isMobile = useIsMobile();

  return (
    <VStack className="gap-4 px-10 py-6">
      <Input className="border-border-100 text-center md:hidden">
        <InputField placeholder="Search" />
        <InputSlot className="pr-3">
          <InputIcon as={SearchIcon} />
        </InputSlot>
      </Input>

      <ColumnsWebScrollMobileView scrollViewProps={{ showsVerticalScrollIndicator: false }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          scrollEnabled={!isMobile}
          className="w-full"
        >
          <Heading size="2xl" className="mb-4 font-roboto">
            What's new?
          </Heading>
          <VStack className="gap-4">
            {BLOGS_DATA.map((item, index) => (
              <VStack className="border-border-300 rounded-xl border p-5" key={index}>
                <Box className="h-64 w-full rounded">
                  <Image
                    source={item.bannerImage}
                    alt={`Blog Image ${item.title}`}
                    className="h-full w-full rounded"
                  />
                </Box>
                <VStack className="mt-4" space="md">
                  <Text className="text-sm">{item.publishedDate}</Text>
                  <Heading size="md">{item.title}</Heading>
                  <Text className="line-clamp-2">{item.description}</Text>
                </VStack>
              </VStack>
            ))}
          </VStack>
        </ScrollView>

        <VStack className="w-full gap-4 md:max-w-[500px]">
          <Input className="hidden text-center md:flex">
            <InputField placeholder="Search" />
            <InputSlot className="pr-3">
              <InputIcon as={SearchIcon} />
            </InputSlot>
          </Input>

          <ScrollView
            showsVerticalScrollIndicator={false}
            scrollEnabled={!isMobile}
            className="gap-7"
          >
            <VStack space="lg">
              <Heading size="lg">From around the world</Heading>
              <VStack className="h-full" space="md">
                {WORLD_DATA.map((item, index) => (
                  <HStack
                    className="border-border-300 items-center rounded-xl border p-3"
                    space="lg"
                    key={index}
                  >
                    <Box className="relative h-full w-40 rounded">
                      <Image
                        source={item.bannerImage}
                        className="h-full w-full rounded"
                        alt={`Blog Image ${item.title}`}
                      />
                    </Box>
                    <VStack className="h-full justify-between" space="md">
                      <Text className="text-sm">{item.publishedDate}</Text>
                      <Heading size="md">{item.title}</Heading>
                      <Text className="line-clamp-2">{item.description}</Text>
                    </VStack>
                  </HStack>
                ))}
              </VStack>
            </VStack>

            <VStack space="lg" className="mt-7">
              <Heading size="lg">Find creators</Heading>
              <VStack className="h-full" space="md">
                {CREATORS_DATA.map((item, index) => (
                  <HStack
                    className="border-border-300 items-center rounded-xl border p-4"
                    space="lg"
                    key={index}
                  >
                    <Avatar>
                      <AvatarFallbackText>{item.name?.[0] ?? "U"}</AvatarFallbackText>
                      <AvatarImage source={item.bannerImage} />
                    </Avatar>
                    <Button variant="outline" action="secondary" className="p-2">
                      <ButtonIcon as={DownloadIcon} />
                    </Button>
                    <VStack>
                      <Text className="font-semibold text-typography-900">{item.name}</Text>
                      <Text className="line-clamp-1 text-sm">{item.description}</Text>
                    </VStack>
                    <Button action="secondary" variant="outline">
                      <ButtonText>Follow</ButtonText>
                    </Button>
                  </HStack>
                ))}
              </VStack>
            </VStack>
          </ScrollView>
        </VStack>
      </ColumnsWebScrollMobileView>
    </VStack>
  );
}
