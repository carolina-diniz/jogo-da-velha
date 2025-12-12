import type { JSX } from 'react';
import './room-code.style.scss';

export function RoomCode(): JSX.Element {
  return (
    <div className="room-code__content">
      <h1 className="room-code__title">SALA</h1>
      <span className="room-code__code">D72G6D</span>
    </div>
  );
}
