import image from "@assets/news-feed/image.png";
import image2 from "@assets/news-feed/image2.png";
import image3 from "@assets/news-feed/image3.png";
import image4 from "@assets/news-feed/image4.png";
import image5 from "@assets/news-feed/image5.png";
import image6 from "@assets/news-feed/image6.png";
import image7 from "@assets/news-feed/image7.png";
import image8 from "@assets/news-feed/image8.png";
import { isWeb } from "@gluestack-ui/nativewind-utils/IsWeb";

import { Avatar, AvatarFallbackText, AvatarImage } from "@/components/ui/avatar";
import { Box } from "@/components/ui/box";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { DownloadIcon, SearchIcon } from "@/components/ui/icon";
import { Image } from "@/components/ui/image";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { ScrollView } from "@/components/ui/scroll-view";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";

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
  return (
    <VStack
      className="mb-20 h-full w-full max-w-[1500px] self-center p-4 pb-0 md:mb-2 md:px-10 md:pb-0 md:pt-6"
      space="2xl"
    >
      <Input className="border-border-100 text-center md:hidden">
        <InputField placeholder="Search" />
        <InputSlot className="pr-3">
          <InputIcon as={SearchIcon} />
        </InputSlot>
      </Input>
      <Heading size="2xl" className="font-roboto">
        What's new?
      </Heading>
      <HStack space="2xl" className="h-full w-full flex-1">
        <ScrollView
          className="max-w-[900px] flex-1 md:mb-2"
          contentContainerStyle={{
            paddingBottom: isWeb ? 0 : 140,
          }}
          showsVerticalScrollIndicator={false}
        >
          <VStack className="w-full" space="2xl">
            {BLOGS_DATA.map((item, index) => {
              return (
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
              );
            })}
          </VStack>
        </ScrollView>
        <VStack className="hidden max-w-[500px] lg:flex" space="2xl">
          <Input className="text-center">
            <InputField placeholder="Search" />
            <InputSlot className="pr-3">
              <InputIcon as={SearchIcon} />
            </InputSlot>
          </Input>
          <VStack>
            <ScrollView showsVerticalScrollIndicator={false} className="gap-7">
              <VStack space="lg">
                <Heading size="lg">From around the world</Heading>
                <VStack className="h-full" space="md">
                  {WORLD_DATA.map((item, index) => {
                    return (
                      <HStack
                        className="border-border-300 h-full items-center rounded-xl border p-3"
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
                    );
                  })}
                </VStack>
              </VStack>
              <VStack space="lg" className="mt-7">
                <Heading size="lg">Find creators</Heading>
                <VStack className="h-full" space="md">
                  {CREATORS_DATA.map((item, index) => {
                    return (
                      <HStack
                        className="border-border-300 h-full items-center rounded-xl border p-4"
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
                    );
                  })}
                </VStack>
              </VStack>
            </ScrollView>
          </VStack>
        </VStack>
      </HStack>
    </VStack>
  );
}
