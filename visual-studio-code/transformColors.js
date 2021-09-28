export default function transformColors(
  monokaiTokens,
  colorMap,
  lightness) {
  return monokaiTokens.map((token) => {
    const color = token.settings.foreground?.toLowerCase();
    if (color in colorMap) {
      return {
        ...token,
        settings: { ...token.settings, foreground: colorMap[color][lightness] },
      };
    }
    return token;
  });
}
