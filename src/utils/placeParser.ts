export const parsePlaceFromPracticalInfo = (
  html: string | undefined | null
): string | null => {
  if (!html) return null;
  let stripped = html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&eacute;/g, 'é')
    .replace(/&agrave;/g, 'à')
    .replace(/&ecirc;/g, 'ê')
    .replace(/\s+/g, ' ')
    .toLowerCase();

  stripped = stripped.split('🥪')[0];
  stripped = stripped.split('bar et restauration')[0];

  if (
    stripped.includes('caranvensérail') ||
    stripped.includes('caravansérail') ||
    stripped.includes('caravensérail')
  ) {
    return 'Caravansérail';
  }

  if (stripped.includes('salon des bonus')) {
    return 'Salon des Bonus';
  }

  if (stripped.includes('médiathèque') || stripped.includes('mediatheque')) {
    return 'Médiathèque';
  }

  if (stripped.includes('abreuvoir')) {
    return 'Abreuvoir';
  }

  if (stripped.includes("centre d'art") || stripped.includes('centre d’art')) {
    return "Centre d'art";
  }

  if (stripped.includes('théâtre') || stripped.includes('theatre')) {
    return 'Théâtre';
  }

  if (stripped.includes('halle')) {
    return 'Halle';
  }

  if (stripped.includes('studio')) {
    return 'Studio';
  }

  if (
    stripped.includes('au cinéma') ||
    stripped.includes('au cinema') ||
    stripped.includes('dans le cinéma')
  ) {
    return 'Cinéma';
  }

  return null;
};
