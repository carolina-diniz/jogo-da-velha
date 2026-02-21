import { type ChangeEvent } from 'react';

export type ConfirmationModal = ModalBase<ModalKind.Confirm> & {
  title: string;
  description?: string;
  buttonLabel: string[];
  onClickConfirm: () => void;
  onClickClose: () => void;
};

export type InputDialogModal = ModalBase<ModalKind.InputDialog> & {
  title: string;
  description?: string;
  placeholder: string;
  value: string;
  buttonLabel: string;
  hasError: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  setIsHidden: (value: boolean) => void;
};

export type ToastModal = ModalBase<ModalKind.Toast> & {
  description: string;
};

export const enum ModalKind {
  InputDialog = 'INPUT-DIALOG',
  Toast = 'TOAST',
  Confirm = 'CONFIRM',
}

export const enum ModalPosition {
  Center = 'center',
  Bottom = 'bottom',
}

type ModalBase<T extends ModalKind> = {
  $typeof: T;
  isHidden: boolean;
  hasOverlay?: boolean;
  position?: ModalPosition;
};

export type ModalData = InputDialogModal | ToastModal | ConfirmationModal;
