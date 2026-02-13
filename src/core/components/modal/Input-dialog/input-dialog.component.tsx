import type { JSX } from 'react';
import closeIcon from '~assets/icons/close.svg';
import { Button } from '../../button';
import type { InputDialogModal as InputDialog } from '../modal.type';
import './input-dialog-modal.style.scss';

export function InputDialogModal(props: InputDialog): JSX.Element {
  const {
    title,
    description,
    placeholder,
    value,
    hasError,
    buttonLabel,
    onChange,
    onSubmit,
    setIsHidden,
  } = props;

  return (
    <>
      <button className="input-dialog__close" onClick={() => setIsHidden(true)}>
        <img src={closeIcon} alt="" />
      </button>
      <h1 className="input-dialog__title">{title}</h1>
      {description !== undefined && <p className="input-dialog__text">{description}</p>}
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={(keyEvent) => keyEvent.key === 'Enter' && onSubmit()}
        className={`input-dialog__input ${hasError ? 'error' : ''}`}
      />
      <Button variant width="20rem" onPress={onSubmit}>
        {buttonLabel}
      </Button>
    </>
  );
}
