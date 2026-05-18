import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Splitting from 'splitting';
import { ANIMATION_PRESETS, HOVER_PRESETS } from './animations';

gsap.registerPlugin( ScrollTrigger );

// ─── Reduced motion ──────────────────────────────────────────────────────────
// Respect the user's OS-level "reduce motion" preference (like Counting Number
// Block does). If active, we skip all GSAP animations entirely.
const prefersReducedMotion = window.matchMedia(
	'(prefers-reduced-motion: reduce)'
).matches;

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Resolve stagger targets for a given element.
 *
 * @param {Element} element
 * @param {string}  staggerTarget  'children' or a CSS selector.
 * @returns {Element[]|NodeList}
 */
function resolveStaggerTargets( element, staggerTarget ) {
	if ( staggerTarget === 'children' ) {
		return Array.from( element.children );
	}
	const found = element.querySelectorAll( staggerTarget );
	return found.length > 0 ? found : Array.from( element.children );
}

/**
 * Extract the first integer or decimal number from an HTML string.
 * Returns null if no number is found.
 *
 * @param {string} html
 * @returns {{ raw: string, value: number }|null}
 */
function extractNumber( html ) {
	const match = html.match( /([\d,]+(\.\d+)?)/ );
	if ( ! match ) return null;
	return {
		raw: match[ 1 ],
		value: parseFloat( match[ 1 ].replace( /,/g, '' ) ),
	};
}

// ─── Animation initialisers ───────────────────────────────────────────────────

/**
 * Standard entrance / scroll-scrub animation using GSAP presets.
 */
function initPresetAnimation( element ) {
	const animation  = element.dataset.gsapAnimation;
	const preset     = ANIMATION_PRESETS[ animation ];
	if ( ! preset ) return;

	const mode        = element.dataset.gsapMode || 'transition';
	const duration    = parseFloat( element.dataset.gsapDuration ) || 0.8;
	const delay       = parseFloat( element.dataset.gsapDelay ) || 0;
	const ease        = element.dataset.gsapEase || 'power2.out';
	const scrollStart = element.dataset.gsapScrollStart || 'top 80%';
	const scrollEnd   = element.dataset.gsapScrollEnd || 'top 20%';
	const scrub       = parseFloat( element.dataset.gsapScrub ?? 1 );
	const animateOnce = element.dataset.gsapAnimateOnce !== 'false';
	const showMarkers = element.dataset.gsapShowMarkers === 'true';
	const staggerRaw  = element.dataset.gsapStagger;
	const staggerVal  = staggerRaw ? parseFloat( staggerRaw ) : null;

	const targets =
		staggerVal !== null
			? resolveStaggerTargets(
					element,
					element.dataset.gsapStaggerTarget || 'children'
			  )
			: element;

	// ── Scroll Scrub mode (C9-style) ─────────────────────────────────────────
	// The animation progress is tied 1-to-1 with the scroll position between
	// Start and End keyframes. Playing forward while scrolling down, backward
	// while scrolling up.
	if ( mode === 'scrub' ) {
		gsap.from( targets, {
			...preset,
			...(staggerVal !== null ? { stagger: staggerVal } : {}),
			ease: 'none',
			scrollTrigger: {
				trigger: element,
				start: scrollStart,
				end: scrollEnd,
				scrub,
				markers: showMarkers,
			},
		} );
		return;
	}

	// ── Transition mode ───────────────────────────────────────────────────────
	const trigger = element.dataset.gsapTrigger || 'scroll';

	const tweenVars = {
		...preset,
		duration,
		delay,
		ease,
		...(staggerVal !== null ? { stagger: staggerVal } : {}),
	};

	if ( trigger === 'scroll' ) {
		tweenVars.scrollTrigger = {
			trigger: element,
			start: scrollStart,
			markers: showMarkers,
			// `once: true` tells ScrollTrigger to destroy itself after the
			// animation plays, preventing a re-trigger on scroll-up.
			once: animateOnce,
		};
	}

	gsap.from( targets, tweenVars );
}

/**
 * Count-up animation (inspired by Counting Number Block).
 *
 * Finds the first number in the element's text and tweens it from 0 to the
 * real value, preserving any surrounding text (prefix / suffix / units).
 */
function initCountUpAnimation( element ) {
	const trigger     = element.dataset.gsapTrigger || 'scroll';
	const duration    = parseFloat( element.dataset.gsapDuration ) || 2;
	const delay       = parseFloat( element.dataset.gsapDelay ) || 0;
	const ease        = element.dataset.gsapEase || 'power2.out';
	const scrollStart = element.dataset.gsapScrollStart || 'top 80%';
	const animateOnce = element.dataset.gsapAnimateOnce !== 'false';
	const showMarkers = element.dataset.gsapShowMarkers === 'true';

	const originalHTML = element.innerHTML;
	const found        = extractNumber( originalHTML );
	if ( ! found ) return;

	const counter = { value: 0 };

	const tweenVars = {
		value: found.value,
		duration,
		delay,
		ease,
		onUpdate() {
			// Format the running value with thousands separators to match the
			// original number's format.
			const formatted = Math.round( counter.value ).toLocaleString();
			element.innerHTML = originalHTML.replace( found.raw, formatted );
		},
		onComplete() {
			// Restore original HTML exactly so the real value is in the DOM.
			element.innerHTML = originalHTML;
			element.classList.remove( 'is-gsap-animating' );
		},
		onStart() {
			element.classList.add( 'is-gsap-animating' );
		},
	};

	if ( trigger === 'scroll' ) {
		tweenVars.scrollTrigger = {
			trigger: element,
			start: scrollStart,
			markers: showMarkers,
			once: animateOnce,
		};
	}

	gsap.to( counter, tweenVars );
}

/**
 * Hover animation.
 *
 * Creates a paused GSAP Timeline that plays on mouseenter and reverses on
 * mouseleave. Using a timeline (instead of two separate gsap.to() calls)
 * means the reverse always mirrors the exact forward motion — even if the
 * user moves out before the animation finishes.
 *
 * Mobile fallback: `(hover: hover)` is a CSS media query that returns true
 * only on devices with a pointer that can hover (real mouse/trackpad). On
 * touch-only screens it returns false, so we skip the animation entirely
 * rather than attaching broken listeners.
 */
function initHoverAnimation( element ) {
	// Skip on touch-only devices — hover doesn't exist there.
	if ( ! window.matchMedia( '(hover: hover)' ).matches ) return;

	const effect   = element.dataset.gsapHoverEffect || 'lift';
	const toState  = HOVER_PRESETS[ effect ];
	if ( ! toState ) return;

	const duration = parseFloat( element.dataset.gsapDuration ) || 0.3;
	const ease     = element.dataset.gsapEase || 'power2.out';

	const tl = gsap.timeline( {
		paused: true,
		defaults: { duration, ease },
	} );

	tl.to( element, toState );

	element.addEventListener( 'mouseenter', () => tl.play() );
	element.addEventListener( 'mouseleave', () => tl.reverse() );
}

/**
 * Split-text animation (split-words / split-chars).
 *
 * Uses Splitting.js to wrap each word or character in a <span> at runtime.
 * This happens only on the frontend — the saved HTML is never modified, so
 * there is no conflict with the block editor.
 *
 * Limitation: character splitting across nested HTML tags (e.g. <strong>)
 * may produce unexpected results. Word splitting handles nested tags correctly.
 */
function initSplitAnimation( element ) {
	const animation = element.dataset.gsapAnimation; // 'split-words' | 'split-chars'
	const by        = animation === 'split-chars' ? 'chars' : 'words';
	const preset    = ANIMATION_PRESETS[ animation ];

	const [ result ] = Splitting( { target: element, by } );
	const targets    = result[ by ];

	if ( ! targets?.length ) return;

	const duration    = parseFloat( element.dataset.gsapDuration ) || 0.6;
	const delay       = parseFloat( element.dataset.gsapDelay ) || 0;
	const ease        = element.dataset.gsapEase || 'power2.out';
	const stagger     = parseFloat( element.dataset.gsapStagger ) || 0.05;
	const trigger     = element.dataset.gsapTrigger || 'scroll';
	const scrollStart = element.dataset.gsapScrollStart || 'top 80%';
	const animateOnce = element.dataset.gsapAnimateOnce !== 'false';
	const showMarkers = element.dataset.gsapShowMarkers === 'true';

	const tweenVars = {
		...preset,
		duration,
		delay,
		ease,
		stagger,
	};

	if ( trigger === 'scroll' ) {
		tweenVars.scrollTrigger = {
			trigger: element,
			start: scrollStart,
			markers: showMarkers,
			once: animateOnce,
		};
	}

	gsap.from( targets, tweenVars );
}

/**
 * Parallax background animation.
 *
 * Two strategies depending on the block type:
 *
 * 1. core/cover  — has a real <img> or <video> positioned absolutely inside.
 *    We animate its `yPercent` (vertical translate relative to its own height).
 *    The image already fills the container via object-fit: cover, so a small
 *    yPercent shift creates the depth illusion without showing empty space.
 *
 * 2. CSS background-image (core/group, core/column, etc.) — we animate
 *    `backgroundPositionY` symmetrically around the current centre (50%).
 */
function initParallaxAnimation( element ) {
	const speed       = parseFloat( element.dataset.gsapParallaxSpeed ) || 20;
	const half        = speed / 2;
	const scrub       = parseFloat( element.dataset.gsapScrub ?? 1 );
	const showMarkers = element.dataset.gsapShowMarkers === 'true';

	const scrollTrigger = {
		trigger: element,
		start: element.dataset.gsapScrollStart || 'top bottom',
		end: element.dataset.gsapScrollEnd || 'bottom top',
		scrub,
		markers: showMarkers,
	};

	// Strategy 1 — core/cover img or video background.
	const bgMedia = element.querySelector(
		'.wp-block-cover__image-background, .wp-block-cover__video-background'
	);

	if ( bgMedia ) {
		// Animate from shifted-up to shifted-down as element crosses the viewport.
		// The image is already larger than the container (object-fit: cover) so
		// a ±half% translate doesn't expose edges at moderate speed values.
		gsap.fromTo(
			bgMedia,
			{ yPercent: -half },
			{ yPercent: half, ease: 'none', scrollTrigger }
		);
		return;
	}

	// Strategy 2 — CSS background-image.
	// backgroundPositionY 50% = centred. We shift symmetrically around that.
	gsap.fromTo(
		element,
		{ backgroundPositionY: `${ 50 - half }%` },
		{ backgroundPositionY: `${ 50 + half }%`, ease: 'none', scrollTrigger }
	);
}

// ─── Main init ────────────────────────────────────────────────────────────────

function initGsapAnimations() {
	if ( prefersReducedMotion ) return;

	document.querySelectorAll( '[data-gsap-animation]' ).forEach( ( element ) => {
		const animation = element.dataset.gsapAnimation;

		if ( animation === 'hover' ) {
			initHoverAnimation( element );
		} else if ( animation === 'split-words' || animation === 'split-chars' ) {
			initSplitAnimation( element );
		} else if ( animation === 'parallax-background' ) {
			initParallaxAnimation( element );
		} else if ( animation === 'count-up' ) {
			initCountUpAnimation( element );
		} else {
			initPresetAnimation( element );
		}
	} );
}

if ( document.readyState === 'loading' ) {
	document.addEventListener( 'DOMContentLoaded', initGsapAnimations );
} else {
	initGsapAnimations();
}
