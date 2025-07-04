import { Slot, usePathname } from "expo-router";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import type { Href } from "expo-router";

import MobileFooter from "@/screens/(pages)/components/(pages)/mobile-footer";
import { MobileHeader } from "@/screens/(pages)/components/(pages)/mobile-header";
import { Sidebar } from "@/screens/(pages)/components/(pages)/sidebar";
import { WebHeader } from "@/screens/(pages)/components/(pages)/web-header";
import { usePagesStore } from "@/screens/(pages)/store/pages-store";
import { Box } from "@/screens/components/ui/box";
import { HStack } from "@/screens/components/ui/hstack";
import { VStack } from "@/screens/components/ui/vstack";

export default function DashboardLayout() {
  const {
    pageTitle,
    tabsList,
    isSidebarExpanded,
    tabSelectedIndex,
    toggleSidebarExpanded,
    navigateWithIndex,
    updatePageState,
  } = usePagesStore();

  const pathname = usePathname();

  useEffect(() => {
    updatePageState(pathname as Href);
  }, [updatePageState, pathname]);

  return (
    <SafeAreaView className="h-full w-full">
      <VStack className="h-full w-full bg-background-0">
        <Box className="md:hidden">
          <MobileHeader title={pageTitle} />
        </Box>
        <Box className="hidden md:flex">
          <WebHeader toggleSidebar={toggleSidebarExpanded} title={pageTitle} />
        </Box>
        <VStack className="h-full w-full">
          <HStack className="flex h-full w-full">
            <Box className="hidden h-full md:flex">
              <Sidebar
                tabsList={tabsList}
                isExpanded={isSidebarExpanded}
                tabSelectedIndex={tabSelectedIndex}
                navigateWithIndex={navigateWithIndex}
              />
            </Box>
            <VStack className="min-w-0 flex-1">
              <Slot />
            </VStack>
          </HStack>
        </VStack>
      </VStack>
      <MobileFooter
        tabList={tabsList}
        tabSelectedIndex={tabSelectedIndex}
        selectTabIndex={navigateWithIndex}
      />
    </SafeAreaView>
  );
}
