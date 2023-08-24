export interface SideBar {
  current: string;
  elements: Array<SideBarElement>;
};
export interface SideBarElement {
  id: string;
  url: string;
  img: string;
  title: string;
}

export default interface Layout {
  isUserMenuVisible: boolean;
  inCreatorMode: boolean;
  sideBar: SideBar;
}