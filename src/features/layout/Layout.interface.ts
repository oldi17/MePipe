export interface SignForm {
  visible: Boolean;
  view: 'login' | 'reg';
}

export default interface Layout {
  isUserMenu: boolean;
  signForm: SignForm;
  isCreatorMode: boolean;
  currentPath: string;
}