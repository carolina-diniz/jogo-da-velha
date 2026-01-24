import type { JSX } from 'react';
import './buttons.style.scss';

export function HomeButtons(): JSX.Element {
  return (
    <div className="container-out">
      <div className="container-in">
        <div className="background-plus">
          <img src="/src/modules/pages/home/components/buttons/assets/plus.png" alt="" />
        </div>
        <button className="create-room">Criar Sala</button>
      </div>
    </div>
  );
}
