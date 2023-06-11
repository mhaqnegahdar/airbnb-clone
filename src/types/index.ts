import { IconType } from "react-icons";

// Props
export interface ContainerProps {
  children: React.ReactNode;
}

export interface MenuItemProps {
  onClick: () => void;
  label: string;
}

type InitialModalProps = {
  isOpen?: boolean;
  onClose: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  primaryBtnLabel?: string;
  disabled?: boolean;
  secondaryBtnAction?: () => void;
  secondaryBtnFormId?: string;
  secondaryBtnLabel?: string;
  secondaryBtnType?: "button" | "submit" | "reset";
  primaryBtnType: "button" | "submit" | "reset";
};

type ModalFormBTN = InitialModalProps & {
  primaryBtnFormId: string;
  primaryBtnAction?: never;
};
type ModalPublicBTN = InitialModalProps & {
  primaryBtnFormId?: never;
  primaryBtnAction: () => void;
};

export type ModalProps = ModalPublicBTN | ModalFormBTN;

export type InitialButtonProps = {
  label: string;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
  btnType: "button" | "submit" | "reset";
};

type FormBTN = InitialButtonProps & {
  formId: string;
  onClick?: never;
};
type PublicBTN = InitialButtonProps & {
  formId?: never;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export type ButtonProps = FormBTN | PublicBTN;

export interface HeadingProps {
  title: string;
  subTitle?: string;
  center?: boolean;
}

export interface InputProps {
  name: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  error?: string;
  touched?: boolean;
}

// Form Initial Values
export interface RegisterForm {
  name?: string;
  email?: string;
  password?: string;
}
