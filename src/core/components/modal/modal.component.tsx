import type { JSX, JSXElementConstructor } from 'react';
import { ConfirmationModal } from './confirmation';
import { GameResultModal } from './game-result';
import { InputDialogModal } from './Input-dialog';
import './modal.style.scss';
import { ModalKind, ModalPosition, type ModalData } from './modal.type';
import { ToastModal } from './toast';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ComponentByType: Record<ModalKind, JSXElementConstructor<any>> = {
  [ModalKind.InputDialog]: InputDialogModal,
  [ModalKind.Toast]: ToastModal,
  [ModalKind.Confirm]: ConfirmationModal,
  [ModalKind.GameResult]: GameResultModal,
};

export function Modal(props: ModalData): JSX.Element {
  const { $typeof, hasOverlay = false, position = ModalPosition.Center, isHidden } = props;

  const ComponentFromType = ComponentByType[$typeof];

  const isGameResult = $typeof === ModalKind.GameResult;
  const baseClass = isGameResult
    ? `modal__base modal__base--no-style modal__${position}`
    : `modal__base modal__${position}`;

  return (
    <>
      {!isHidden && (
        <div>
          {hasOverlay && <div className="modal__overlay" />}

          <div className={baseClass}>
            <ComponentFromType {...props} />
          </div>
        </div>
      )}
    </>
  );
}
