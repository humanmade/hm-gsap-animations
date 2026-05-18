import { addFilter } from '@wordpress/hooks';
import { DEFAULT_SUPPORTED_BLOCKS } from './constants';
import { GSAP_ATTRIBUTES } from './attributes';
import { withGsapAnimationControls } from './with-animation';
import { withAnimationPreview } from './with-preview';
import './editor.css';

/**
 * Filter: add GSAP attributes to supported block type definitions.
 *
 * A block is supported if it is either:
 * 1. In the PHP-filtered window.hmGsapAnimations.supportedBlocks list, or
 * 2. Declares `"supports": { "hmGsapAnimations": true }` in its block.json.
 *
 * Note: we read `settings.supports.hmGsapAnimations` directly here because
 * `blocks.registerBlockType` receives the full block definition as `settings`,
 * making this the earliest and most reliable detection point.
 */
function addGsapAttributes( settings, name ) {
	const phpList  = window?.hmGsapAnimations?.supportedBlocks ?? DEFAULT_SUPPORTED_BLOCKS;
	const inPhpList = phpList.includes( name );
	const hasBlockJsonSupport = !! settings.supports?.hmGsapAnimations;

	if ( ! inPhpList && ! hasBlockJsonSupport ) {
		return settings;
	}

	return {
		...settings,
		attributes: {
			...settings.attributes,
			...GSAP_ATTRIBUTES,
		},
	};
}

addFilter(
	'blocks.registerBlockType',
	'hm/gsap-animations/add-attributes',
	addGsapAttributes
);

/**
 * Filter: inject GSAP Inspector panel into supported block Edit components.
 */
addFilter(
	'editor.BlockEdit',
	'hm/gsap-animations/add-controls',
	withGsapAnimationControls
);

/**
 * Filter: add CSS preview class to block wrapper in the editor canvas.
 * Uses CSS animations (GPU/compositor thread) — no GSAP, no performance cost.
 */
addFilter(
	'editor.BlockListBlock',
	'hm/gsap-animations/preview',
	withAnimationPreview
);
