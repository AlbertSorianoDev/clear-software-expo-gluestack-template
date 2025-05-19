import { Slot } from "expo-router";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import MobileFooter from "@/components/news-feed/mobile-footer";
import { MobileHeader } from "@/components/news-feed/mobile-header";
import { Sidebar } from "@/components/news-feed/sidebar";
import { WebHeader } from "@/components/news-feed/web-header";
import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { FeatherGlyphs } from "@/types/icons/expo-vector-icons";
import { TabItem } from "@/types/icons/tab-item";

const tabsList: TabItem<FeatherGlyphs>[] = [
  {
    iconName: "home",
    iconText: "Home",
  },
  {
    iconName: "globe",
    iconText: "Community",
  },
  {
    iconName: "rss",
    iconText: "Feed",
  },
  {
    iconName: "heart",
    iconText: "Favorite",
  },
  {
    iconName: "user",
    iconText: "Profile",
    onlyMobile: true,
  },
];

interface DashboardLayoutProps {
  title: string;
  isSidebarVisible: boolean;
  children: React.ReactNode;
}

export default function DashboardLayout(props: DashboardLayoutProps) {
  const [isSidebarVisible, setIsSidebarVisible] = useState(props.isSidebarVisible);
  function toggleSidebar() {
    setIsSidebarVisible(!isSidebarVisible);
  }

  return (
    <SafeAreaView className="h-full w-full">
      <VStack className="h-full w-full bg-background-0">
        <Box className="md:hidden">
          <MobileHeader title={"News feed"} />
        </Box>
        <Box className="hidden md:flex">
          <WebHeader toggleSidebar={toggleSidebar} title={props.title} />
        </Box>
        <VStack className="h-full w-full">
          <HStack className="h-full w-full">
            <Box className="hidden h-full md:flex">
              {isSidebarVisible && <Sidebar tabsList={tabsList} />}
            </Box>
            <VStack className="w-full">
              <Slot />
            </VStack>
          </HStack>
        </VStack>
      </VStack>
      <MobileFooter footerIcons={tabsList} />
    </SafeAreaView>
  );
}
