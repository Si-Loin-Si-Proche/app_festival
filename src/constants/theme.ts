/**
 * THEME DU FESTIVAL
 * Ce fichier centralise toute l'identité visuelle de l'application.
 * Pour changer le design pour une nouvelle édition ou un autre festival,
 * il suffit de modifier les valeurs ici.
 */

// Palette de couleurs
export const COLORS = {
    /*
      /!\  Variables randoms a modifier
     */
    primary: '#E63946',    // Couleur principale (Boutons, titres actifs)
    secondary: '#1D3557',  // Couleur secondaire (Headers, navigation)
    background: '#F1FAEE', // Fond des écrans
    card: '#FFFFFF',       // Fond des cartes (events)
    text: '#1D3557',       // Texte principal
    textLight: '#A8DADC',  // Texte secondaire (dates, sous-titres)
    error: '#FF0000',      // Messages d'erreur
    success: '#4CAF50',    // Messages de succès
    tabBarActive: '#E63946',
    tabBarInactive: '#8D99AE',
};

// Tailles de police (pour la cohérence)
export const SIZES = {
    h1: 24, // Titres d'écrans
    h2: 20, // Titres de sections
    h3: 16, // Titres de cartes
    body: 14, // Texte courant
    small: 12, // Légendes, dates
};

// Espacements (Marges et Paddings)
export const SPACING = {
    xs: 4,
    s: 8,
    m: 16,  // Marge standard
    l: 24,
    xl: 32,
};

// Configuration des ombres (Shadows) pour iOS et Android
export const SHADOWS = {
    light: {
        shadowColor: COLORS.text,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 2, // Pour Android
    },
    medium: {
        shadowColor: COLORS.text,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        elevation: 5,
    },
};

const theme = { COLORS, SIZES, SPACING, SHADOWS };

export default theme;