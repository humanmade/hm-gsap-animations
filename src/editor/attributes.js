/**
 * GSAP attributes added to every supported block type.
 * Saved in block comment delimiters; consumed by PHP render_block.
 */
export const GSAP_ATTRIBUTES = {
	/** Animation preset key (e.g. 'fade-up', 'count-up'). 'none' = disabled. */
	gsapAnimation: {
		type: 'string',
		default: 'none',
	},
	/**
	 * 'transition' — plays once on entry (like CSS animations)
	 * 'scrub'      — ties progress to scroll position (GSAP scrub)
	 */
	gsapMode: {
		type: 'string',
		default: 'transition',
	},
	/** Transition mode only: 'scroll' or 'load'. */
	gsapTrigger: {
		type: 'string',
		default: 'scroll',
	},
	/** Transition mode only: animation duration in seconds. */
	gsapDuration: {
		type: 'number',
		default: 0.8,
	},
	/** Transition mode only: delay before tween starts (seconds). */
	gsapDelay: {
		type: 'number',
		default: 0,
	},
	/** Transition mode only: GSAP ease string. */
	gsapEase: {
		type: 'string',
		default: 'power2.out',
	},
	/** Whether to animate only the first time the element enters viewport. */
	gsapAnimateOnce: {
		type: 'boolean',
		default: true,
	},
	/** ScrollTrigger start position (e.g. "top 80%"). Used in both modes. */
	gsapScrollStart: {
		type: 'string',
		default: 'top 80%',
	},
	/** Scrub mode only: ScrollTrigger end position (e.g. "top 20%"). */
	gsapScrollEnd: {
		type: 'string',
		default: 'top 20%',
	},
	/** Scrub mode only: smoothing lag in seconds (0 = instant, 1 = 1 s lag). */
	gsapScrub: {
		type: 'number',
		default: 1,
	},
	/** Show ScrollTrigger debug markers in the browser (development only). */
	gsapShowMarkers: {
		type: 'boolean',
		default: false,
	},
	/** Stagger delay between child elements (seconds). 0 = disabled. */
	gsapStagger: {
		type: 'number',
		default: 0,
	},
	/** CSS selector for stagger targets, or 'children' for direct children. */
	gsapStaggerTarget: {
		type: 'string',
		default: 'children',
	},
	/**
	 * Parallax speed/intensity. Higher = more movement.
	 * The background travels `speed`% of its size as the element crosses the viewport.
	 */
	gsapParallaxSpeed: {
		type: 'number',
		default: 20,
	},
	/** Hover sub-effect key (lift, grow, shrink, tilt, brighten, dim). */
	gsapHoverEffect: {
		type: 'string',
		default: 'lift',
	},
};
