import { createHigherOrderComponent } from '@wordpress/compose';
import { Fragment } from '@wordpress/element';
import { GsapAnimationControls } from './controls';
import { isBlockSupported } from './utils';

/**
 * HOC that injects the GSAP Inspector panel into every supported block.
 *
 * Uses `isBlockSupported()` which resolves support via:
 * 1. The PHP-filtered supported blocks list.
 * 2. The block's own `supports.hmGsapAnimations` declaration in block.json.
 */
export const withGsapAnimationControls = createHigherOrderComponent(
	( BlockEdit ) =>
		( props ) => {
			const { name, attributes, setAttributes } = props;

			if ( ! isBlockSupported( name ) ) {
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
