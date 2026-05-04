/**
 * Ce fichier sert à pallier le manque de données dans l'API Artishoc.
 * Les événements du festival "Si loin, si proche" n'ont pas de `place` lié
 * dans les `spacetimes`, et utilisent tous le section_tag mensonger "Cinéma".
 * Le seul endroit où se trouve le vrai lieu est dans le bloc HTML `practical_information`.
 *
 * Ce script est volontairement mis à part pour pouvoir le retirer facilement
 * le jour où le back-office sera correctement rempli.
 */

export const parsePlaceFromPracticalInfo = (
  html: string | undefined | null
): string | null => {
  if (!html) return null;

  // On nettoie le HTML et les entités pour avoir un texte brut comparable
  let stripped = html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&eacute;/g, 'é')
    .replace(/&agrave;/g, 'à')
    .replace(/&ecirc;/g, 'ê')
    .replace(/\s+/g, ' ')
    .toLowerCase();

  // TRÈS IMPORTANT : Le texte "bar et restauration ... au Caravansérail"
  // est ajouté à la fin de PRESQUE TOUS les événements du festival.
  // On doit couper la chaîne avant ce bloc générique pour ne pas avoir de faux positifs.
  stripped = stripped.split('🥪')[0];
  stripped = stripped.split('bar et restauration')[0];

  // On teste les mots-clés de lieux spécifiques (les fautes d'orthographe
  // sont incluses volontairement car elles sont présentes dans l'API)
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

  // Le cinéma est souvent confondu avec le festival de cinéma, on cherche un match
  // un peu plus précis pour éviter les faux positifs ("Festival de cinéma")
  if (
    stripped.includes('au cinéma') ||
    stripped.includes('au cinema') ||
    stripped.includes('dans le cinéma')
  ) {
    return 'Cinéma';
  }

  return null;
};
