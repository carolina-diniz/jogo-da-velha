import type { JSX } from 'react';
import './join-btn.style.scss';

export function Join(): JSX.Element {
  return (
    <div className="container-out">
      <div className="container-in">
        <div className="background-plus">
          <img
            className="plus-icon"
            src="/src/modules/pages/home/components/buttons/assets/plus.png"
            alt="plus-icon"
          />
        </div>
        <button className="join">ENTRAR</button>
      </div>
    </div>
  );
}
