import { type JSX } from 'react';
import './room-code.style.scss';

interface RoomCodeProps {
  code: string | null;
  showToastModal: (text: string) => void;
}

export function RoomCode(props: RoomCodeProps): JSX.Element {
  const { code, showToastModal } = props;

  function copyToClipboard(): void {
    if (code !== null) {
      navigator.clipboard.writeText(code);
      showToastModal('Código copiado para a área de transferência!');
    }
  }

  return (
    <>
      <div className="room-code__content">
        <h1 className="room-code__title">SALA</h1>
        <span className="room-code__code" onClick={copyToClipboard}>
          {code !== null ? `${code.slice(0, 4)}-${code.slice(4, 8)}` : '****-****'}
        </span>
      </div>
    </>
  );
}
