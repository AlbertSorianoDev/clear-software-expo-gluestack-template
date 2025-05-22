import type { Href } from "expo-router";

export interface TabItem<T = string> {
  iconName: T;
  tabTitle: string;
  route: Href;
  onlyMobile?: boolean;
  webOnly?: boolean;
}
