/**
 * Maps each animation type to its GSAP `gsap.from()` initial state.
 * GSAP tweens FROM these values back to the element's computed natural state.
 *
 * 'count-up' and 'split-*' are handled separately in index.js.
 */
export const ANIMATION_PRESETS = {
	'fade-in': { opacity: 0 },
	'fade-up': { opacity: 0, y: 40 },
	'fade-down': { opacity: 0, y: -40 },
	'fade-left': { opacity: 0, x: 40 },
	'fade-right': { opacity: 0, x: -40 },
	'zoom-in': { opacity: 0, scale: 0.85 },
	'zoom-out': { opacity: 0, scale: 1.15 },
	'flip-x': { opacity: 0, rotateX: 90, transformPerspective: 800 },
	'flip-y': { opacity: 0, rotateY: 90, transformPerspective: 800 },
	// Per-word FROM state used by split-words
	'split-words': { opacity: 0, y: 30 },
	// Per-character FROM state used by split-chars
	'split-chars': { opacity: 0, y: 20 },
};
