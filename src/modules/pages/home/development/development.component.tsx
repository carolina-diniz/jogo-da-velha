import { useState, type JSX } from 'react';
import githubSvg from '~assets/icons/github.svg';
import gmailSvg from '~assets/icons/gmail.svg';
import linkedinSvg from '~assets/icons/linkedin.svg';
import { Button } from '~core';
import './development.style.scss';

const title = 'DESENVOLVEDORES';
const developers: Array<{
  name: string;
  description: string;
  social: Array<{ img: string; alt: string; url: string }>;
}> = [
  {
    name: 'Carolina Diniz',
    description:
      'Programadora front-end, com foco em desenvolvimento para Big Screen utilizando React. Atuo na construção de interfaces e soluções para o ecossistema de mídia e entretenimento.\n\nNas horas vagas, exploro o universo de infraestrutura e self-hosting, gerenciando servidores próprios via Proxmox para aprofundar conhecimentos em hardware e redes.',
    social: [
      { img: linkedinSvg, alt: 'LinkedIn', url: 'https://www.linkedin.com/in/carolina-diniz21/' },
      { img: githubSvg, alt: 'GitHub', url: 'https://github.com/carolina-diniz' },
      { img: gmailSvg, alt: 'Gmail', url: 'mailto: caroldinizc21@gmail.com' },
    ],
  },
  {
    name: 'José',
    description: '',
    social: [
      { img: linkedinSvg, alt: 'LinkedIn', url: '' },
      { img: githubSvg, alt: 'GitHub', url: '' },
      { img: gmailSvg, alt: 'Gmail', url: 'mailto:' },
    ],
  },
  {
    name: 'Madu',
    description: '',
    social: [
      { img: linkedinSvg, alt: 'LinkedIn', url: '' },
      { img: githubSvg, alt: 'GitHub', url: '' },
      { img: gmailSvg, alt: 'Gmail', url: 'mailto:' },
    ],
  },
  {
    name: 'Will Gonçalves',
    description:
      'Estudante de Ciência da Computação e desenvolvedor front-end em formação, com foco em interfaces modernas e usabilidade. Sempre em busca de evolução e novos aprendizados na área de tecnologia.',
    social: [
      { img: linkedinSvg, alt: 'LinkedIn', url: 'www.linkedin.com/in/wilbsom-gs' },
      { img: githubSvg, alt: 'GitHub', url: 'https://github.com/Wilbsomgs/Wilbsomgs' },
      { img: gmailSvg, alt: 'Gmail', url: 'mailto: willsuporte@gmai.com' },
    ],
  },
];

interface DevelopmentProps {
  onBack: () => void;
}

export function Development({ onBack }: DevelopmentProps): JSX.Element {
  const [developerSelected, setDeveloperSelected] = useState(developers[0]);

  return (
    <>
      <div className="home__secondary-navbar">
        <Button width="20rem" variant="secondary" onPress={onBack}>
          VOLTAR
        </Button>
        <h1 className="home__title medium">{title}</h1>
      </div>
      <div className="home__secondary-display">
        <div className="home__secondary-buttons">
          {developers.map((developer, index) => (
            <div
              className={`home__secondary-button ${developer.name === developerSelected.name ? 'selected' : ''}`}
              key={index}
              onClick={() => setDeveloperSelected(developer)}
            >
              <span className="home__secondary-button-label">{developer.name.toUpperCase()}</span>
            </div>
          ))}
        </div>
        <div className="home__secondary-details">
          <h1 className="home__secondary-title">{developerSelected.name.toUpperCase()}</h1>
          <p className="home__secondary-description">{developerSelected.description}</p>
          <div className="home__secondary-social">
            {developerSelected.social.map((social, index) => (
              <a
                href={social.url}
                key={index}
                target="_blank"
                rel="noopener noreferrer"
                className="home__secondary-icon"
              >
                <img src={social.img} alt={social.alt} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
