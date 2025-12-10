interface AvatarReturn {
  onPress: () => void;
}

export function useAvatar(): AvatarReturn {
  function onPress(): void {
    console.log('[click] botão editar avatar');
  }

  return {
    onPress,
  };
}
