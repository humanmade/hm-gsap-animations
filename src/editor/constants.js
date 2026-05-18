/**
 * Blocks that support stagger (animating their children one by one).
 */
export const STAGGER_SUPPORTED_BLOCKS = [
	'core/group',
	'core/columns',
	'core/gallery',
	'core/list',
	'core/buttons',
];

/**
 * Blocks that support count-up animation (must contain a number in their text).
 */
export const COUNT_UP_SUPPORTED_BLOCKS = [
	'core/heading',
	'core/paragraph',
];

/**
 * Blocks that support split-text animations (split-words, split-chars).
 * Only makes sense for text blocks.
 */
export const SPLIT_SUPPORTED_BLOCKS = [
	'core/heading',
	'core/paragraph',
];

/**
 * Blocks that support parallax-background.
 * core/cover  → animates the inner <img>/<video> element via yPercent.
 * Others      → animates backgroundPositionY on the block wrapper.
 */
export const PARALLAX_SUPPORTED_BLOCKS = [
	'core/cover',
	'core/group',
	'core/column',
	'core/media-text',
];

export const ANIMATION_OPTIONS = [
	{ value: 'none', label: '— None —' },
	{ value: 'fade-in', label: 'Fade In' },
	{ value: 'fade-up', label: 'Fade Up' },
	{ value: 'fade-down', label: 'Fade Down' },
	{ value: 'fade-left', label: 'Fade Left' },
	{ value: 'fade-right', label: 'Fade Right' },
	{ value: 'zoom-in', label: 'Zoom In' },
	{ value: 'zoom-out', label: 'Zoom Out' },
	{ value: 'flip-x', label: 'Flip Horizontal' },
	{ value: 'flip-y', label: 'Flip Vertical' },
	{ value: 'count-up', label: 'Count Up (numbers)' },
	{ value: 'parallax-background', label: 'Parallax Background' },
	{ value: 'split-words', label: 'Split — Words' },
	{ value: 'split-chars', label: 'Split — Characters' },
];

/**
 * Animation mode:
 * - transition: plays once when element enters viewport (or on load)
 * - scrub:      ties animation progress to scroll position (GSAP scrub)
 */
export const ANIMATION_MODES = [
	{ value: 'transition', label: 'Transition' },
	{ value: 'scrub', label: 'Scroll Scrub' },
];

export const TRIGGER_OPTIONS = [
	{ value: 'scroll', label: 'On Scroll' },
	{ value: 'load', label: 'On Page Load' },
];

export const EASE_OPTIONS = [
	{ value: 'power1.out', label: 'Power 1 — Subtle' },
	{ value: 'power2.out', label: 'Power 2 — Default' },
	{ value: 'power3.out', label: 'Power 3 — Strong' },
	{ value: 'power4.out', label: 'Power 4 — Very Strong' },
	{ value: 'back.out(1.7)', label: 'Back — Overshoot' },
	{ value: 'elastic.out(1, 0.3)', label: 'Elastic' },
	{ value: 'bounce.out', label: 'Bounce' },
	{ value: 'sine.out', label: 'Sine — Smooth' },
	{ value: 'linear', label: 'Linear' },
];

/**
 * Default supported blocks — overridden at runtime by window.hmGsapAnimations.supportedBlocks
 * which is populated via wp_localize_script and filterable in PHP.
 */
export const DEFAULT_SUPPORTED_BLOCKS = [
	'core/group',
	'core/columns',
	'core/column',
	'core/paragraph',
	'core/heading',
	'core/image',
	'core/gallery',
	'core/cover',
	'core/media-text',
	'core/list',
	'core/buttons',
	'core/quote',
	'core/separator',
];
