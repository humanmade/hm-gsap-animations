import { createHigherOrderComponent } from '@wordpress/compose';
import { Fragment } from '@wordpress/element';
import { GsapAnimationControls } from './controls';

/**
 * HOC that injects the GSAP Inspector panel into every supported block's Edit component.
 * The supported blocks list is resolved at call time from window.hmGsapAnimations.
 */
export const withGsapAnimationControls = createHigherOrderComponent(
	( BlockEdit ) =>
		( props ) => {
			const { name, attributes, setAttributes } = props;
			const supported =
				window?.hmGsapAnimations?.supportedBlocks ?? [];

			if ( ! supported.includes( name ) ) {
				return <BlockEdit { ...props } />;
			}

			return (
				<Fragment>
					<BlockEdit { ...props } />
					<GsapAnimationControls
						attributes={ attributes }
						setAttributes={ setAttributes }
						blockName={ name }
					/>
				</Fragment>
			);
		},
	'withGsapAnimationControls'
);
