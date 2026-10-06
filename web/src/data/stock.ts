import type { ImageMetadata } from 'astro';
import kozijn from '../assets/stock/kozijn-sfeerbeeld.jpg';
import reparatie from '../assets/stock/reparatie-sfeerbeeld.jpg';

/**
 * Sfeerbeelden (Unsplash-licentie, gratis voor commercieel gebruik) voor diensten
 * waar nog geen eigen projectfoto's van zijn. Worden op de site als "Sfeerbeeld"
 * gelabeld en NOOIT als eigen project getoond. Vervang ze door eigen foto's zodra die er zijn.
 */
export const stockCovers: Record<string, { image: ImageMetadata; alt: string }> = {
  'deuren-kozijnen': { image: kozijn, alt: 'Wit houten kozijn met dubbel glas' },
  'reparaties-onderhoud': { image: reparatie, alt: 'Vakman boort een gat in een wand' },
};
