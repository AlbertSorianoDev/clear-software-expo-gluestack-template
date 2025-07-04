import image from "@assets/profile/image.png";
import image1 from "@assets/profile/image1.png";
import image2 from "@assets/profile/image2.png";
import { isWeb } from "@gluestack-ui/nativewind-utils/IsWeb";
import { Bell, Cog, Package } from "lucide-react-native";
import React from "react";

import { EditUserInfoModal } from "@/screens/(pages)/profile/components/edit-user-info-modal";
import { useEditUserInfoStore } from "@/screens/(pages)/profile/store/edit-user-info-store";
import { Avatar, AvatarBadge, AvatarImage } from "@/screens/components/ui/avatar";
import { Box } from "@/screens/components/ui/box";
import { Button, ButtonIcon, ButtonText } from "@/screens/components/ui/button";
import { Center } from "@/screens/components/ui/center";
import { Divider } from "@/screens/components/ui/divider";
import { Heading } from "@/screens/components/ui/heading";
import { HStack } from "@/screens/components/ui/hstack";
import { ChevronRightIcon, EditIcon, Icon } from "@/screens/components/ui/icon";
import { Image } from "@/screens/components/ui/image";
import { ScrollView } from "@/screens/components/ui/scroll-view";
import { Text } from "@/screens/components/ui/text";
import { VStack } from "@/screens/components/ui/vstack";

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
              <Box className="absolute inset-0 rounded-b-xl bg-black/20" />
            </Box>

            <HStack className="absolute hidden px-10 pt-6 md:flex">
              <Text className="font-roboto text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                home{" > "}
              </Text>
              <Text className="font-semibold text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                profile
              </Text>
            </HStack>

            <Center className="absolute mt-6 w-full pb-4 md:mt-14 md:px-10 md:pt-6">
              <VStack space="lg" className="items-center">
                <Avatar size="2xl" className="bg-primary-600">
                  <AvatarImage source={image} alt="Profile Image" />
                  <AvatarBadge />
                </Avatar>

                <VStack className="w-full items-center gap-1">
                  <Text
                    size="2xl"
                    className="font-roboto text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
                  >
                    Alexander Leslie
                  </Text>
                  <Text className="font-roboto text-sm text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                    United States
                  </Text>
                </VStack>

                <>
                  <HStack className="items-center gap-1">
                    <VStack className="items-center px-4 py-3" space="xs">
                      <Text className="items-center justify-center font-roboto font-semibold text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                        {userData.friends}
                      </Text>
                      <Text className="text-xs text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                        {userData.friendsText}
                      </Text>
                    </VStack>

                    <Divider orientation="vertical" className="h-10 bg-white" />

                    <VStack className="items-center px-4 py-3" space="xs">
                      <Text className="font-roboto font-semibold text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                        {userData.followers}
                      </Text>
                      <Text className="font-roboto text-xs text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                        {userData.followersText}
                      </Text>
                    </VStack>

                    <Divider orientation="vertical" className="h-10 bg-white" />

                    <VStack className="items-center px-4 py-3" space="xs">
                      <Text className="font-roboto font-semibold text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                        {userData.rewards}
                      </Text>
                      <Text className="font-roboto text-xs text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                        {userData.rewardsText}
                      </Text>
                    </VStack>

                    <Divider orientation="vertical" className="h-10 bg-white" />

                    <VStack className="items-center px-4 py-3" space="xs">
                      <Text className="font-roboto font-semibold text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                        {userData.posts}
                      </Text>
                      <Text className="font-roboto text-xs text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                        {userData.postsText}
                      </Text>
                    </VStack>
                  </HStack>
                </>

                <Button
                  variant="outline"
                  action="secondary"
                  onPress={showModal}
                  className="group relative gap-3 border-white"
                >
                  <ButtonText className="text-white group-hover:text-primary-500">
                    Edit Profile
                  </ButtonText>
                  <ButtonIcon as={EditIcon} className="text-white group-hover:text-primary-500" />
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

                <Button className="bg-background-0 p-0 active:bg-background-0 md:bg-primary-500 md:px-4 md:py-2">
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
