import type { JSX } from 'react';
import './button.style.scss';

export function Button({ name, img }: { name: string; img: string }): JSX.Element {
  return (
    <div className="button__container">
      <div className="button__img-container">
        <img className="button__img" src={img} alt="plus icon" />
      </div>
      <p className="button__label">{name}</p>
    </div>
  );
}
