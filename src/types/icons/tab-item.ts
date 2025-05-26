import type { Href } from "expo-router";

export interface TabItem {
  icon: React.ElementType;
  tabTitle: string;
  route: Href;
  mobileOnly?: boolean;
  webOnly?: boolean;
}
