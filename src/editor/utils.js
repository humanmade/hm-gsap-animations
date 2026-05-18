import { getBlockType } from '@wordpress/blocks';
import {
	DEFAULT_SUPPORTED_BLOCKS,
	STAGGER_SUPPORTED_BLOCKS,
	COUNT_UP_SUPPORTED_BLOCKS,
	PARALLAX_SUPPORTED_BLOCKS,
} from './constants';

/**
 * Returns the GSAP supports declaration for a block, or false if none.
 *
 * A block opts in by adding to block.json:
 *   "supports": { "hmGsapAnimations": true }
 *
 * Or with feature flags:
 *   "supports": { "hmGsapAnimations": { "stagger": true, "parallax": true } }
 *
 * @param {string} name Block type name.
 * @returns {boolean|Object}
 */
function getGsapSupports( name ) {
	return getBlockType( name )?.supports?.hmGsapAnimations ?? false;
}

/**
 * Check whether a block should receive GSAP animation controls.
 *
 * Resolution order:
 * 1. PHP-filtered list via window.hmGsapAnimations.supportedBlocks
 *    (includes the hardcoded core blocks + any manual additions).
 * 2. block.json `supports.hmGsapAnimations` declaration — automatic,
 *    no PHP filter needed.
 *
 * @param {string} name Block type name.
 * @returns {boolean}
 */
export function isBlockSupported( name ) {
	const phpList = window?.hmGsapAnimations?.supportedBlocks ?? DEFAULT_SUPPORTED_BLOCKS;
	if ( phpList.includes( name ) ) return true;
	return !! getGsapSupports( name );
}

/**
 * Check whether a block supports a specific GSAP feature.
 *
 * Features: 'stagger' | 'parallax' | 'countUp'
 *
 * Resolution order:
 * 1. Hardcoded list for core blocks (they can't declare supports themselves).
 * 2. block.json `supports.hmGsapAnimations.{ feature }` — true/false.
 *    If the declaration is just `true` (not an object), no extra features
 *    are enabled beyond the standard animations.
 *
 * @param {string} name    Block type name.
 * @param {string} feature Feature key.
 * @returns {boolean}
 */
export function blockSupportsFeature( name, feature ) {
	const coreLists = {
		stagger: STAGGER_SUPPORTED_BLOCKS,
		parallax: PARALLAX_SUPPORTED_BLOCKS,
		countUp: COUNT_UP_SUPPORTED_BLOCKS,
	};

	if ( coreLists[ feature ]?.includes( name ) ) return true;

	const gsapSupports = getGsapSupports( name );
	if ( ! gsapSupports || gsapSupports === true ) return false;
	return !! gsapSupports[ feature ];
}
