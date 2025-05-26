import { router } from "expo-router";
import { House, Rss, User } from "lucide-react-native";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import type { Href } from "expo-router";

import { TabItem } from "@/types/icons/tab-item";

interface PagesStore {
  pageTitle: string;
  isSidebarExpanded: boolean;
  tabSelectedIndex: number;
  tabsList: TabItem[];

  setPageTitle: (pageTitle: string) => void;
  toggleSidebarExpanded: () => void;
  navigateWithIndex: (index: number) => void;
  updatePageState: (route: Href) => void;
}

const initialState = {
  pageTitle: "",
  isSidebarExpanded: false,
  tabSelectedIndex: 0,
  tabsList: [
    {
      icon: House,
      tabTitle: "Dashboard",
      route: "/dashboard",
    },
    {
      icon: Rss,
      tabTitle: "News Feed",
      route: "/news-feed",
    },
    {
      icon: User,
      tabTitle: "Profile",
      route: "/profile",
    },
  ] as TabItem[],
};

export const usePagesStore = create<PagesStore>()(
  immer((set) => ({
    ...initialState,

    setPageTitle: (pageTitle) => set({ pageTitle }),
    toggleSidebarExpanded: () => set((state) => ({ isSidebarExpanded: !state.isSidebarExpanded })),
    navigateWithIndex: (index) =>
      set((state) => {
        router.navigate(state.tabsList[index].route);
      }),
    updatePageState: (route) =>
      set((state) => ({
        pageTitle: state.tabsList.find((tab) => tab.route === route)?.tabTitle || "",
        tabSelectedIndex: state.tabsList.findIndex((tab) => tab.route === route),
      })),
  })),
);
