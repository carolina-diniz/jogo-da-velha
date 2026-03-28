import type { JSX } from 'react';
import fireworksSvg from '~assets/results/fireworks.svg';
import sadSvg from '~assets/results/sad.svg';
import trophySvg from '~assets/results/trophy.svg';
import type { GameResultModalProps } from '../modal.type';
import './game-result.style.scss';

const RESULT_CONFIG = {
  win: {
    title: 'VITÓRIA!!!',
    description: 'Próxima partida começará em breve...',
    icon: trophySvg,
    decorIcon: fireworksSvg,
    className: 'game-result-modal--win',
  },
  lose: {
    title: 'DERROTA!!!',
    description: 'Próxima partida começará em breve...',
    icon: sadSvg,
    decorIcon: null,
    className: 'game-result-modal--lose',
  },
  draw: {
    title: 'EMPATE!!!',
    description: 'Próxima partida começará em breve...',
    icon: null,
    decorIcon: null,
    className: 'game-result-modal--draw',
  },
};

export function GameResultModal(props: GameResultModalProps): JSX.Element {
  const { result, onClose, countdown } = props;
  const config = RESULT_CONFIG[result];

  const description =
    countdown !== null
      ? `Reiniciando em ${countdown.toString().padStart(2, '0')}s...`
      : config.description;

  return (
    <div className={`game-result-modal ${config.className}`}>
      <button className="game-result-modal__close" onClick={onClose} aria-label="Fechar">
        ✕
      </button>

      <div className="game-result-modal__content">
        {config.decorIcon !== null && (
          <>
            <img
              src={config.decorIcon}
              alt="Decoration"
              className="game-result-modal__decor game-result-modal__decor--left"
            />
            <img
              src={config.decorIcon}
              alt="Decoration"
              className="game-result-modal__decor game-result-modal__decor--right"
            />
          </>
        )}

        {config.icon !== null && (
          <div className="game-result-modal__icon-container">
            <img src={config.icon} alt={config.title} className="game-result-modal__icon" />
          </div>
        )}

        <h1 className="game-result-modal__title">{config.title}</h1>
        <p
          className="game-result-modal__description"
          style={{ fontVariantNumeric: 'tabular-nums' }}
        >
          {description}
        </p>
      </div>
    </div>
  );
}
