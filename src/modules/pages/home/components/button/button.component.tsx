import type { JSX } from 'react';
import './button.style.scss';

interface ButtonProps {
  name: string;
  img: string;
  onClick?: () => void;
}

export function Button(props: ButtonProps): JSX.Element {
  const { name, img, onClick } = props;

  return (
    <div className="button__container-out">
      <div className="button__container" onClick={onClick}>
        <div className="button__img-container">
          <img className="button__img" src={img} />
        </div>
        <p className="button__label">{name}</p>
      </div>
    </div>
  );
}
