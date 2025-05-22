import image from "@assets/profile/image.png";
import image1 from "@assets/profile/image1.png";
import image2 from "@assets/profile/image2.png";
import { isWeb } from "@gluestack-ui/nativewind-utils/IsWeb";
import { Bell, Cog, Package } from "lucide-react-native";
import React from "react";

import { EditUserInfoModal } from "@/components/(pages)/profile/edit-user-info-modal";
import { Avatar, AvatarBadge, AvatarImage } from "@/components/ui/avatar";
import { Box } from "@/components/ui/box";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { Divider } from "@/components/ui/divider";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { ChevronRightIcon, EditIcon, Icon } from "@/components/ui/icon";
import { Image } from "@/components/ui/image";
import { ScrollView } from "@/components/ui/scroll-view";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useEditUserInfoStore } from "@/store/(pages)/profile/edit-user-info-store";

interface UserStats {
  friends: string;
  friendsText: string;
  followers: string;
  followersText: string;
  rewards: string;
  rewardsText: string;
  posts: string;
  postsText: string;
}
const userData: UserStats = {
  friends: "45K",
  friendsText: "Friends",
  followers: "500M",
  followersText: "Followers",
  rewards: "40",
  rewardsText: "Rewards",
  posts: "346",
  postsText: "Posts",
};

interface AccountCardType {
  iconName: React.ElementType;
  subText: string;
}
const accountData: AccountCardType[] = [
  {
    iconName: Cog,
    subText: "Settings",
  },
  {
    iconName: Bell,
    subText: "Notifications",
  },
  {
    iconName: Package,
    subText: "Rewards",
  },
];

export default function MainContent() {
  const showModal = useEditUserInfoStore((state) => state.showModal);

  return (
    <>
      <EditUserInfoModal />
      <VStack className="mb-16 h-full w-full md:mb-0">
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: isWeb ? 0 : 160,
            flexGrow: 1,
          }}
        >
          <VStack className="h-full w-full pb-8" space="2xl">
            <Box className="relative h-[380px] w-full md:h-[478px]">
              <Image source={image2} alt="Banner Image" className="h-full w-full rounded-b-xl" />
            </Box>

            <HStack className="absolute hidden px-10 pt-6 md:flex">
              <Text className="font-roboto text-typography-900">home &gt; {` `}</Text>
              <Text className="font-semibold text-typography-900">profile</Text>
            </HStack>

            <Center className="absolute mt-6 w-full pb-4 md:mt-14 md:px-10 md:pt-6">
              <VStack space="lg" className="items-center">
                <Avatar size="2xl" className="bg-primary-600">
                  <AvatarImage source={image} alt="Profile Image" />
                  <AvatarBadge />
                </Avatar>

                <VStack className="w-full items-center gap-1">
                  <Text size="2xl" className="text-dark font-roboto">
                    Alexander Leslie
                  </Text>
                  <Text className="font-roboto text-sm text-typography-700">United States</Text>
                </VStack>

                <>
                  <HStack className="items-center gap-1">
                    <VStack className="items-center px-4 py-3" space="xs">
                      <Text className="text-dark items-center justify-center font-roboto font-semibold">
                        {userData.friends}
                      </Text>
                      <Text className="text-dark font-roboto text-xs">{userData.friendsText}</Text>
                    </VStack>

                    <Divider orientation="vertical" className="h-10" />

                    <VStack className="items-center px-4 py-3" space="xs">
                      <Text className="text-dark font-roboto font-semibold">
                        {userData.followers}
                      </Text>
                      <Text className="text-dark font-roboto text-xs">
                        {userData.followersText}
                      </Text>
                    </VStack>

                    <Divider orientation="vertical" className="h-10" />

                    <VStack className="items-center px-4 py-3" space="xs">
                      <Text className="text-dark font-roboto font-semibold">
                        {userData.rewards}
                      </Text>
                      <Text className="text-dark font-roboto text-xs">{userData.rewardsText}</Text>
                    </VStack>

                    <Divider orientation="vertical" className="h-10" />

                    <VStack className="items-center px-4 py-3" space="xs">
                      <Text className="text-dark font-roboto font-semibold">{userData.posts}</Text>
                      <Text className="text-dark font-roboto text-xs">{userData.postsText}</Text>
                    </VStack>
                  </HStack>
                </>

                <Button
                  variant="outline"
                  action="secondary"
                  onPress={showModal}
                  className="relative gap-3 border-gray-600"
                >
                  <ButtonText className="text-dark">Edit Profile</ButtonText>
                  <ButtonIcon as={EditIcon} />
                </Button>
              </VStack>
            </Center>

            <VStack className="mx-6" space="2xl">
              <HStack
                className="border-border-300 items-center justify-between rounded-xl border px-6 py-5"
                space="2xl"
              >
                <HStack space="2xl" className="items-center">
                  <Box className="h-10 w-10 md:h-20 md:w-20">
                    <Image source={image1} alt="Promo Image" className="h-full w-full rounded-lg" />
                  </Box>

                  <VStack>
                    <Text className="text-lg text-typography-900" size="lg">
                      Invite & get rewards
                    </Text>
                    <Text className="font-roboto text-sm md:text-[16px]">Your code r45dAsDeK8</Text>
                  </VStack>
                </HStack>

                <Button className="bg-background-0 p-0 active:bg-background-0 md:bg-background-900 md:px-4 md:py-2">
                  <ButtonText className="text-sm text-typography-800 md:text-typography-0">
                    Invite
                  </ButtonText>
                </Button>
              </HStack>

              <Heading className="font-roboto" size="xl">
                Account
              </Heading>

              <VStack className="border-border-300 items-center justify-between rounded-xl border px-4 py-2">
                {accountData.map((item, index) => {
                  return (
                    <React.Fragment key={index}>
                      <HStack
                        space="2xl"
                        className="w-full flex-1 items-center justify-between px-2 py-3"
                      >
                        <HStack className="items-center" space="md">
                          <Icon as={item.iconName} className="stroke-[#747474]" />
                          <Text size="lg">{item.subText}</Text>
                        </HStack>
                        <Icon as={ChevronRightIcon} />
                      </HStack>
                      {accountData.length - 1 !== index && <Divider className="my-1" />}
                    </React.Fragment>
                  );
                })}
              </VStack>

              <Heading className="font-roboto" size="xl">
                Preferences
              </Heading>

              <VStack className="border-border-300 items-center justify-between rounded-xl border px-4 py-2">
                {accountData.map((item, index) => {
                  return (
                    <React.Fragment key={index}>
                      <HStack
                        space="2xl"
                        className="w-full flex-1 items-center justify-between px-2 py-3"
                        key={index}
                      >
                        <HStack className="items-center" space="md">
                          <Icon as={item.iconName} className="stroke-[#747474]" />
                          <Text size="lg">{item.subText}</Text>
                        </HStack>
                        <Icon as={ChevronRightIcon} />
                      </HStack>
                      {accountData.length - 1 !== index && <Divider className="my-1" />}
                    </React.Fragment>
                  );
                })}
              </VStack>
            </VStack>
          </VStack>
        </ScrollView>
      </VStack>
    </>
  );
}
