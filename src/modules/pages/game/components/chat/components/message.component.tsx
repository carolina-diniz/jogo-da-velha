import type { JSX } from 'react';
import './message.style.scss';

interface MessageProps {
  text: string;
  className: string;
}

export const Message = ({ text, className }: MessageProps): JSX.Element => {
  return (
    <div className={`${className}`}>
      <div className="message-bubble">{text}</div>
    </div>
  );
};
