export function randomName(): string {
  const names = [
    'Girafa',
    'Coelho',
    'Campeão',
    'Mestre',
    'Lobo',
    'Águia',
    'Ninja',
    'Pirata',
    'Astronauta',
    'Dinossauro',
    'Gato',
    'Tubarão',
    'Explorador',
    'Mago',
    'Panda',
  ];

  const adjectives = [
    'Veloz',
    'Eletricista',
    'Dançarino',
    'Furioso',
    'Cozinheiro',
    'Sonolento',
    'Detetive',
    'Saltitante',
    'Encanador',
    'Radiante',
    'Cientista',
    'Desastrado',
    'Astrólogo',
    'Sorridente',
    'Programador',
  ];

  const randomlyChosenName = names[Math.floor(Math.random() * names.length)];
  const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];

  return `${randomlyChosenName}${randomAdjective}`;
}
