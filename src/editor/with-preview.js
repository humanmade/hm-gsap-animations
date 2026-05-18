import { createHigherOrderComponent } from '@wordpress/compose';
import { isBlockSupported } from './utils';

/**
 * HOC applied to editor.BlockListBlock.
 *
 * Adds a CSS class to the block's wrapper element so that `editor.css` can
 * play a lightweight CSS preview animation whenever the editor user selects or
 * changes a GSAP animation type.
 *
 * Uses `isBlockSupported()` — resolves support via the PHP list OR the block's
 * own `supports.hmGsapAnimations` declaration in block.json.
 */
export const withAnimationPreview = createHigherOrderComponent(
	( BlockListBlock ) =>
		( props ) => {
			const { name, attributes } = props;
			const animation = attributes?.gsapAnimation;

			if ( ! animation || animation === 'none' || ! isBlockSupported( name ) ) {
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
