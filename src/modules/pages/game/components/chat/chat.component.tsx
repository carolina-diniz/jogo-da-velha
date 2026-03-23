import { useEffect, useRef, useState, type JSX } from 'react';
import sendButton from '~assets/send-button.svg';
import { useSocket, type Message } from '~core';
import './chat.style.scss';

export function Chat(): JSX.Element {
  const { sendMessage, messages, me } = useSocket();

  const [inputValue, setInputValue] = useState<string>('');

  const handleSend = (): void => {
    if (inputValue.trim().length > 0) {
      sendMessage(inputValue);
      setInputValue('');
    }
  };

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="chat__container-out">
      <h1 className="chat__title">MENSAGENS</h1>

      <div className="chat__container-in" ref={scrollRef}>
        {messages.map((msg: Message, index: number) => {
          return (
            <>
              <div
                key={index}
                className={msg.sender.id === me?.id ? 'message--mine' : 'message--other'}
              >
                <div className="message-bubble">{msg.text}</div>
              </div>
            </>
          );
        })}
      </div>

      <div className="button__send-message">
        <input
          className="input__send-message"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="Digite sua mensagem..."
          maxLength={4096}
        />
        <button type="button" onClick={handleSend} ara-label="Enviar mensagem">
          <img src={sendButton} alt="" />
        </button>
      </div>
    </div>
  );
}
