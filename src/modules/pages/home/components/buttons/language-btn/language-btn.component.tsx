import type { JSX } from 'react';
import './language.style.scss';

export function Language(): JSX.Element {
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
        <button className="language">IDIOMA</button>
      </div>
    </div>
  );
}
