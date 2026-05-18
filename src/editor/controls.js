import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	RangeControl,
	TextControl,
	ToggleControl,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
	__experimentalSpacer as Spacer,
	__experimentalDivider as Divider,
	__experimentalText as Text,
} from '@wordpress/components';

import {
	ANIMATION_OPTIONS,
	EASE_OPTIONS,
	TRIGGER_OPTIONS,
	STAGGER_SUPPORTED_BLOCKS,
	COUNT_UP_SUPPORTED_BLOCKS,
} from './constants';

/**
 * GSAP animation Inspector panel for any supported block.
 *
 * @param {Object}   props
 * @param {Object}   props.attributes    Block attributes.
 * @param {Function} props.setAttributes Block setAttributes.
 * @param {string}   props.blockName     Block type name (e.g. 'core/paragraph').
 */
export function GsapAnimationControls( { attributes, setAttributes, blockName } ) {
	const {
		gsapAnimation,
		gsapMode,
		gsapTrigger,
		gsapDuration,
		gsapDelay,
		gsapEase,
		gsapAnimateOnce,
		gsapScrollStart,
		gsapScrollEnd,
		gsapScrub,
		gsapShowMarkers,
		gsapStagger,
		gsapStaggerTarget,
	} = attributes;

	const hasAnimation   = gsapAnimation && gsapAnimation !== 'none';
	const isScrub        = gsapMode === 'scrub';
	const isScrollBased  = isScrub || gsapTrigger === 'scroll';
	const isCountUp      = gsapAnimation === 'count-up';
	const supportsStagger = STAGGER_SUPPORTED_BLOCKS.includes( blockName );

	// Filter out count-up if block doesn't support it.
	const animationOptions = COUNT_UP_SUPPORTED_BLOCKS.includes( blockName )
		? ANIMATION_OPTIONS
		: ANIMATION_OPTIONS.filter( ( o ) => o.value !== 'count-up' );

	const animationLabel = ANIMATION_OPTIONS.find( ( o ) => o.value === gsapAnimation )?.label;
	const panelTitle     = hasAnimation
		? `GSAP: ${ animationLabel }`
		: __( 'GSAP Animation', 'hm-gsap-animations' );

	return (
		<InspectorControls>
			<PanelBody
				title={ panelTitle }
				initialOpen={ hasAnimation }
				className="hm-gsap-panel"
			>
				{ /* ── Animation type ── */ }
				<SelectControl
					label={ __( 'Animation', 'hm-gsap-animations' ) }
					value={ gsapAnimation }
					options={ animationOptions }
					onChange={ ( value ) => setAttributes( { gsapAnimation: value } ) }
				/>

				{ hasAnimation && ! isCountUp && (
					<>
						{ /* ── Mode: Transition vs Scroll Scrub ── */ }
						<ToggleGroupControl
							label={ __( 'Mode', 'hm-gsap-animations' ) }
							value={ gsapMode }
							isBlock
							onChange={ ( value ) => setAttributes( { gsapMode: value } ) }
						>
							<ToggleGroupControlOption
								value="transition"
								label={ __( 'Transition', 'hm-gsap-animations' ) }
							/>
							<ToggleGroupControlOption
								value="scrub"
								label={ __( 'Scroll Scrub', 'hm-gsap-animations' ) }
							/>
						</ToggleGroupControl>

						<Spacer marginBottom={ 2 } />

						{ /* ── Scroll position ── */ }
						<SectionLabel>{ __( 'Scroll Position', 'hm-gsap-animations' ) }</SectionLabel>

						<TextControl
							label={ __( 'Start', 'hm-gsap-animations' ) }
							help={ __( '"element viewport" — e.g. "top 80%"', 'hm-gsap-animations' ) }
							value={ gsapScrollStart }
							onChange={ ( value ) =>
								setAttributes( { gsapScrollStart: value } )
							}
						/>

						{ isScrub && (
							<>
								<TextControl
									label={ __( 'End', 'hm-gsap-animations' ) }
									help={ __( 'Where the scroll animation finishes — e.g. "top 20%"', 'hm-gsap-animations' ) }
									value={ gsapScrollEnd }
									onChange={ ( value ) =>
										setAttributes( { gsapScrollEnd: value } )
									}
								/>
								<RangeControl
									label={ __( 'Scrub smoothing (s)', 'hm-gsap-animations' ) }
									help={ __( '0 = instant tracking, higher = laggy/smooth', 'hm-gsap-animations' ) }
									value={ gsapScrub }
									onChange={ ( value ) => setAttributes( { gsapScrub: value } ) }
									min={ 0 }
									max={ 3 }
									step={ 0.1 }
								/>
							</>
						) }

						<ToggleControl
							label={ __( 'Show markers (debug)', 'hm-gsap-animations' ) }
							help={ __( 'Displays start/end trigger lines in the browser.', 'hm-gsap-animations' ) }
							checked={ gsapShowMarkers }
							onChange={ ( value ) =>
								setAttributes( { gsapShowMarkers: value } )
							}
						/>

						<Divider />

						{ /* ── Transition-only: timing + trigger ── */ }
						{ ! isScrub && (
							<>
								<SectionLabel>{ __( 'Timing', 'hm-gsap-animations' ) }</SectionLabel>

								<SelectControl
									label={ __( 'Trigger', 'hm-gsap-animations' ) }
									value={ gsapTrigger }
									options={ TRIGGER_OPTIONS }
									onChange={ ( value ) =>
										setAttributes( { gsapTrigger: value } )
									}
								/>

								{ gsapTrigger === 'scroll' && (
									<ToggleControl
										label={ __( 'Animate once', 'hm-gsap-animations' ) }
										help={ __( 'Plays only the first time the element enters the viewport.', 'hm-gsap-animations' ) }
										checked={ gsapAnimateOnce }
										onChange={ ( value ) =>
											setAttributes( { gsapAnimateOnce: value } )
										}
									/>
								) }

								<RangeControl
									label={ __( 'Duration (s)', 'hm-gsap-animations' ) }
									value={ gsapDuration }
									onChange={ ( value ) =>
										setAttributes( { gsapDuration: value } )
									}
									min={ 0.1 }
									max={ 3 }
									step={ 0.1 }
								/>

								<RangeControl
									label={ __( 'Delay (s)', 'hm-gsap-animations' ) }
									value={ gsapDelay }
									onChange={ ( value ) =>
										setAttributes( { gsapDelay: value } )
									}
									min={ 0 }
									max={ 3 }
									step={ 0.1 }
								/>

								<SelectControl
									label={ __( 'Easing', 'hm-gsap-animations' ) }
									value={ gsapEase }
									options={ EASE_OPTIONS }
									onChange={ ( value ) =>
										setAttributes( { gsapEase: value } )
									}
								/>
							</>
						) }

						{ /* ── Stagger (group, columns, etc.) ── */ }
						{ supportsStagger && (
							<>
								<Divider />
								<SectionLabel>{ __( 'Stagger', 'hm-gsap-animations' ) }</SectionLabel>

								<ToggleControl
									label={ __( 'Animate children one by one', 'hm-gsap-animations' ) }
									checked={ gsapStagger > 0 }
									onChange={ ( checked ) =>
										setAttributes( { gsapStagger: checked ? 0.15 : 0 } )
									}
								/>

								{ gsapStagger > 0 && (
									<>
										<RangeControl
											label={ __( 'Stagger amount (s)', 'hm-gsap-animations' ) }
											value={ gsapStagger }
											onChange={ ( value ) =>
												setAttributes( { gsapStagger: value } )
											}
											min={ 0.05 }
											max={ 1 }
											step={ 0.05 }
										/>
										<TextControl
											label={ __( 'Target selector', 'hm-gsap-animations' ) }
											help={ __( 'CSS selector for children. Leave "children" for direct children.', 'hm-gsap-animations' ) }
											value={ gsapStaggerTarget }
											onChange={ ( value ) =>
												setAttributes( { gsapStaggerTarget: value } )
											}
										/>
									</>
								) }
							</>
						) }
					</>
				) }

				{ /* ── Count-up controls ── */ }
				{ hasAnimation && isCountUp && (
					<>
						<SelectControl
							label={ __( 'Trigger', 'hm-gsap-animations' ) }
							value={ gsapTrigger }
							options={ TRIGGER_OPTIONS }
							onChange={ ( value ) => setAttributes( { gsapTrigger: value } ) }
						/>

						{ gsapTrigger === 'scroll' && (
							<>
								<TextControl
									label={ __( 'Scroll Start', 'hm-gsap-animations' ) }
									value={ gsapScrollStart }
									onChange={ ( value ) =>
										setAttributes( { gsapScrollStart: value } )
									}
								/>
								<ToggleControl
									label={ __( 'Animate once', 'hm-gsap-animations' ) }
									checked={ gsapAnimateOnce }
									onChange={ ( value ) =>
										setAttributes( { gsapAnimateOnce: value } )
									}
								/>
								<ToggleControl
									label={ __( 'Show markers (debug)', 'hm-gsap-animations' ) }
									checked={ gsapShowMarkers }
									onChange={ ( value ) =>
										setAttributes( { gsapShowMarkers: value } )
									}
								/>
							</>
						) }

						<RangeControl
							label={ __( 'Duration (s)', 'hm-gsap-animations' ) }
							value={ gsapDuration }
							onChange={ ( value ) => setAttributes( { gsapDuration: value } ) }
							min={ 0.5 }
							max={ 5 }
							step={ 0.1 }
						/>

						<RangeControl
							label={ __( 'Delay (s)', 'hm-gsap-animations' ) }
							value={ gsapDelay }
							onChange={ ( value ) => setAttributes( { gsapDelay: value } ) }
							min={ 0 }
							max={ 3 }
							step={ 0.1 }
						/>

						<SelectControl
							label={ __( 'Easing', 'hm-gsap-animations' ) }
							value={ gsapEase }
							options={ EASE_OPTIONS }
							onChange={ ( value ) => setAttributes( { gsapEase: value } ) }
						/>
					</>
				) }
			</PanelBody>
		</InspectorControls>
	);
}

/** Small uppercase section label, matches Gutenberg's visual style. */
function SectionLabel( { children } ) {
	return (
		<Text
			size="11"
			weight="500"
			upperCase
			variant="muted"
			as="p"
			style={ { marginBottom: '8px' } }
		>
			{ children }
		</Text>
	);
}
