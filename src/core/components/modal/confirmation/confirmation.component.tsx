import type { JSX } from 'react';
import { Button } from '../../button';
import type { ConfirmationModalProps } from '../modal.type';
import './confirmation.style.scss';

export function ConfirmationModal(props: ConfirmationModalProps): JSX.Element {
  const { title, description, buttonLabel, onClickClose, onClickConfirm } = props;

  return (
    <>
      <h1 className="modal__title">{title}</h1>
      {description !== undefined && <p className="modal__description">{description}</p>}
      <div className="confirmation-modal__buttons">
        <Button variant={'agree'} width="20rem" onPress={onClickConfirm}>
          {buttonLabel[0] ?? 'Agree'}
        </Button>
        <Button variant={'disagree'} width="20rem" onPress={onClickClose}>
          {buttonLabel[1] ?? 'Disagree'}
        </Button>
      </div>
    </>
  );
}
