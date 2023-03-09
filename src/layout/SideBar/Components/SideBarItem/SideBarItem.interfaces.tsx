export interface SideBarItem {
  name: string;
  icon: string;
  iconActive: string;
  path: string;
}

export interface Props {
    sideBarItem: SideBarItem,
    sideBarVisible: boolean
}