import { router } from "expo-router";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import type { Href } from "expo-router";

import { FeatherGlyphs } from "@/types/icons/expo-vector-icons";
import { TabItem } from "@/types/icons/tab-item";

interface PagesStore {
  pageTitle: string;
  isSidebarExpanded: boolean;
  tabSelectedIndex: number;
  tabsList: TabItem<FeatherGlyphs>[];

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
      iconName: "home",
      tabTitle: "Dashboard",
      route: "/dashboard",
    },
    {
      iconName: "rss",
      tabTitle: "News Feed",
      route: "/news-feed",
    },
    {
      iconName: "user",
      tabTitle: "Profile",
      route: "/profile",
    },
  ] as TabItem<FeatherGlyphs>[],
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
