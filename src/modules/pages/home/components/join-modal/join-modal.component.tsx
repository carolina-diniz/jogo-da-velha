import { type JSX } from 'react';
import closeIcon from '~assets/icons/close.svg';
import { Button } from '~core';
import { useJoin } from './hooks';
import './join-modal.style.scss';

export interface JoinProps {
  setIsJoinOpen: (isOpen: boolean) => void;
  onJoinRoom: (roomId: string) => void;
}

export function Join(props: JoinProps): JSX.Element {
  const { code, isError, onSubmit, onChange, setIsJoinOpen } = useJoin(props);

  return (
    <div className="join-backdrop">
      <div className="join">
        <button className="join__close" onClick={() => setIsJoinOpen(false)}>
          <img src={closeIcon} alt="botão fechar" />
        </button>
        <h1 className="join__title">ENTRAR COM CÓDIGO</h1>
        <p className="join__text">Digite o código para entrar na sala.</p>
        <input
          value={code.toUpperCase()}
          type="text"
          placeholder="XXXX-XXXX"
          className={`join__input ${isError ? 'error' : ''}`}
          onChange={onChange}
        />
        <Button variant={true} width="20rem" onPress={onSubmit}>
          ENTRAR
        </Button>
      </div>
    </div>
  );
}
