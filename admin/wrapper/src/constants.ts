export interface MenuItemType {
  src: string;
  title: string;
  path?: string;
  target?: string;
  sub?: MenuItemType[];
}
