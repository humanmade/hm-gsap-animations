import { createHigherOrderComponent } from '@wordpress/compose';

/**
 * HOC applied to editor.BlockListBlock.
 *
 * Adds a CSS class to the block's wrapper element so that `editor.css` can
 * play a lightweight CSS preview animation whenever the editor user selects or
 * changes a GSAP animation type.
 *
 * Why CSS instead of GSAP?
 * - GSAP instances accumulate on every React re-render and are never cleaned up.
 * - CSS animations run on the browser compositor thread (GPU) — zero JS cost.
 * - Changing `animation-name` via a class swap naturally restarts the animation,
 *   so switching from "fade-up" to "zoom-in" replays the preview for free.
 */
export const withAnimationPreview = createHigherOrderComponent(
	( BlockListBlock ) =>
		( props ) => {
			const { name, attributes } = props;
			const animation = attributes?.gsapAnimation;

			const supported = window?.hmGsapAnimations?.supportedBlocks ?? [];
			if ( ! animation || animation === 'none' || ! supported.includes( name ) ) {
				return <BlockListBlock { ...props } />;
			}

			const existingClass = props.wrapperProps?.className ?? '';
			const wrapperProps = {
				...props.wrapperProps,
				className:
					`${ existingClass } has-gsap-preview gsap-preview--${ animation }`.trim(),
			};

			return <BlockListBlock { ...props } wrapperProps={ wrapperProps } />;
		},
	'withAnimationPreview'
);
