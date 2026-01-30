import cachorro from '~assets/avatar/cachorro.png';
import coelho from '~assets/avatar/coelho.png';
import gato from '~assets/avatar/gato.png';
import girafa from '~assets/avatar/girafa.png';
import leao from '~assets/avatar/leao.png';
import panda from '~assets/avatar/panda.png';
import pinguim from '~assets/avatar/pinguim.png';
import raposa from '~assets/avatar/raposa.png';
import tigre from '~assets/avatar/tigre.png';

export function getAvatarImage(avatarName: string): string {
  const avatars: Record<string, string> = {
    cachorro,
    coelho,
    gato,
    girafa,
    leao,
    panda,
    pinguim,
    raposa,
    tigre,
  };

  return avatars[avatarName];
}
