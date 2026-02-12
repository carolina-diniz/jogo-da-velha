import type { JSX } from 'react';
import './room-code.style.scss';

export function RoomCode(props: { code: string | null }): JSX.Element {
  const { code } = props;
  const formattedCode = code !== null ? code.slice(0, 4) + '-' + code.slice(4, 8) : '****-****';

  return (
    <div className="room-code__content">
      <h1 className="room-code__title">SALA</h1>
      <span className="room-code__code" onClick={() => navigator.clipboard.writeText(code ?? '')}>
        {formattedCode}
      </span>
    </div>
  );
}
