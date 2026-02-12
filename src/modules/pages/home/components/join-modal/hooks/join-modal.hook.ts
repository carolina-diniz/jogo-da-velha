import { useState } from 'react';
import type { JoinProps } from '../join-modal.component';

interface JoinReturn {
  code: string;
  isError: boolean;
  onSubmit: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setIsError: (isError: boolean) => void;
  setIsJoinOpen: (isOpen: boolean) => void;
}

export function useJoin(props: JoinProps): JoinReturn {
  const { onJoinRoom, setIsJoinOpen } = props;

  const [code, setCode] = useState('');
  const [isError, setIsError] = useState<boolean>(false);

  function onChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const raw = e.target.value.replace(/[^a-zA-Z0-9]/g, '').slice(0, 8);

    if (raw.length > 4) {
      const formatted = raw.slice(0, 4) + '-' + raw.slice(4, 8);

      setCode(formatted);
    } else {
      setCode(raw);
    }
  }

  function onSubmit(): void {
    onJoinRoom(code.replace(/-/g, ''));
    setIsError(true);
  }

  return { code, isError, onSubmit, onChange, setIsError, setIsJoinOpen };
}
