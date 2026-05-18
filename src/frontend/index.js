import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ANIMATION_PRESETS } from './animations';

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

// ─── Main init ────────────────────────────────────────────────────────────────

function initGsapAnimations() {
	if ( prefersReducedMotion ) return;

	document.querySelectorAll( '[data-gsap-animation]' ).forEach( ( element ) => {
		const animation = element.dataset.gsapAnimation;

		if ( animation === 'count-up' ) {
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
