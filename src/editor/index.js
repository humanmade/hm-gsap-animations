import { addFilter } from '@wordpress/hooks';
import { DEFAULT_SUPPORTED_BLOCKS } from './constants';
import { GSAP_ATTRIBUTES } from './attributes';
import { withGsapAnimationControls } from './with-animation';
import { withAnimationPreview } from './with-preview';
import './editor.css';

/**
 * Resolve the supported blocks list.
 * PHP passes this via wp_localize_script so it can be filtered server-side.
 */
function getSupportedBlocks() {
	return window?.hmGsapAnimations?.supportedBlocks ?? DEFAULT_SUPPORTED_BLOCKS;
}

/**
 * Filter: add GSAP attributes to supported block type definitions.
 */
function addGsapAttributes( settings, name ) {
	if ( ! getSupportedBlocks().includes( name ) ) {
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
