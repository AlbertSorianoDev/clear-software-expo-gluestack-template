import { Slot, usePathname } from "expo-router";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import type { Href } from "expo-router";

import MobileFooter from "@/components/(pages)/mobile-footer";
import { MobileHeader } from "@/components/(pages)/mobile-header";
import { Sidebar } from "@/components/(pages)/sidebar";
import { WebHeader } from "@/components/(pages)/web-header";
import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { usePagesStore } from "@/store/(pages)/pages-store";

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
