import { HabitCategory } from './types';

/**
 * Maps a habit category to its dot color.
 * Values point at the --cat-* CSS tokens in globals.css, which mirror the
 * category colors from the wireframe (docs/preview.html).
 *
 * Repo categories (sport/health/mental/personal) are mapped onto the wireframe
 * palette: mental -> wireframe "mind" (purple), personal -> wireframe "growth" (blue).
 */
export const CATEGORY_COLOR: Record<HabitCategory, string> = {
  sport: 'var(--cat-sport)',
  health: 'var(--cat-health)',
  mental: 'var(--cat-mental)',
  personal: 'var(--cat-personal)',
};
