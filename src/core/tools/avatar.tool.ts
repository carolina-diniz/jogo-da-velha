import cat from '~assets/avatar/cat.png';
import dog from '~assets/avatar/dog.png';
import fox from '~assets/avatar/fox.png';
import giraffe from '~assets/avatar/giraffe.png';
import lion from '~assets/avatar/lion.png';
import panda from '~assets/avatar/panda.png';
import penguin from '~assets/avatar/penguin.png';
import rabbit from '~assets/avatar/rabbit.png';
import tiger from '~assets/avatar/tiger.png';

export function getAvatarImage(avatarName: string): string {
  const avatars: Record<string, string> = {
    dog,
    rabbit,
    cat,
    giraffe,
    lion,
    panda,
    penguin,
    fox,
    tiger,
  };

  return avatars[avatarName];
}

export function getAllAvatars(): string[] {
  return ['dog', 'rabbit', 'cat', 'giraffe', 'lion', 'panda', 'penguin', 'fox', 'tiger'];
}
