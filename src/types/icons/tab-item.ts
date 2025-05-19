export interface TabItem<T = string> {
  iconName: T;
  iconText: string;
  onlyMobile?: boolean;
  webOnly?: boolean;
}
