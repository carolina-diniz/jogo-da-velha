import { type ChangeEvent } from 'react';

export type ConfirmationModalProps = ModalBase<ModalKind.Confirm> & {
  title: string;
  description?: string;
  buttonLabel: [string, string];
  onClickConfirm: () => void;
  onClickClose: () => void;
};

export type InputDialogModalProps = ModalBase<ModalKind.InputDialog> & {
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

export type ToastModalProps = ModalBase<ModalKind.Toast> & {
  description: string;
};

export type GameResultModalProps = ModalBase<ModalKind.GameResult> & {
  result: 'win' | 'lose' | 'draw';
  onClose: () => void;
  countdown: number | null;
};

export const enum ModalKind {
  InputDialog = 'INPUT-DIALOG',
  Toast = 'TOAST',
  Confirm = 'CONFIRM',
  GameResult = 'GAME-RESULT',
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

export type ModalData =
  | InputDialogModalProps
  | ToastModalProps
  | ConfirmationModalProps
  | GameResultModalProps;
