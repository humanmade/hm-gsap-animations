<?php
/**
 * Plugin Name:       HM GSAP Animations
 * Description:       Adds GSAP animation controls to core and custom blocks via the block editor.
 * Version:           1.0.0
 * Requires at least: 6.4
 * Requires PHP:      7.4
 * Author:            Human Made Limited
 * Author URI:        https://humanmade.com
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       hm-gsap-animations
 */

namespace HM\GsapAnimations;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

const PLUGIN_VERSION = '1.0.0';
const PLUGIN_PATH    = __DIR__;

/**
 * Returns the default list of block types that receive GSAP controls.
 * Override or extend via the `hm_gsap_animations_supported_blocks` filter.
 */
function get_default_supported_blocks(): array {
	return [
		'core/group',
		'core/columns',
		'core/column',
		'core/paragraph',
		'core/heading',
		'core/image',
		'core/gallery',
		'core/cover',
		'core/media-text',
		'core/list',
		'core/buttons',
		'core/quote',
		'core/separator',
	];
}

/**
 * Returns the full supported blocks list, combining three sources:
 *
 * 1. Default core blocks (get_default_supported_blocks).
 * 2. Blocks added via the `hm_gsap_animations_supported_blocks` PHP filter.
 * 3. Any registered block type that declares
 *    `"supports": { "hmGsapAnimations": true }` in its block.json —
 *    detected automatically from the block registry, no filter needed.
 */
function get_all_supported_blocks(): array {
	$blocks = apply_filters(
		'hm_gsap_animations_supported_blocks',
		get_default_supported_blocks()
	);

	$registry = WP_Block_Type_Registry::get_instance();

	foreach ( $registry->get_all_registered() as $name => $block_type ) {
		$supports = $block_type->supports ?? [];
		if ( ! empty( $supports['hmGsapAnimations'] ) && ! in_array( $name, $blocks, true ) ) {
			$blocks[] = $name;
		}
	}

	return $blocks;
}

/**
 * Enqueue block editor script + styles and pass config to JS.
 */
function enqueue_editor_assets(): void {
	$asset_file = PLUGIN_PATH . '/build/editor.asset.php';
	if ( ! file_exists( $asset_file ) ) {
		return;
	}
	$asset = require $asset_file;

	wp_enqueue_script(
		'hm-gsap-animations-editor',
		plugins_url( 'build/editor.js', __FILE__ ),
		$asset['dependencies'],
		$asset['version'],
		true
	);

	if ( file_exists( PLUGIN_PATH . '/build/editor.css' ) ) {
		wp_enqueue_style(
			'hm-gsap-animations-editor',
			plugins_url( 'build/editor.css', __FILE__ ),
			[],
			$asset['version']
		);
	}

	wp_localize_script(
		'hm-gsap-animations-editor',
		'hmGsapAnimations',
		[ 'supportedBlocks' => array_values( get_all_supported_blocks() ) ]
	);
}
add_action( 'enqueue_block_editor_assets', __NAMESPACE__ . '\\enqueue_editor_assets' );

/**
 * Enqueue frontend script.
 */
function enqueue_frontend_assets(): void {
	$asset_file = PLUGIN_PATH . '/build/frontend.asset.php';
	if ( ! file_exists( $asset_file ) ) {
		return;
	}
	$asset = require $asset_file;

	wp_enqueue_script(
		'hm-gsap-animations-frontend',
		plugins_url( 'build/frontend.js', __FILE__ ),
		$asset['dependencies'],
		$asset['version'],
		true
	);

	if ( file_exists( PLUGIN_PATH . '/build/frontend.css' ) ) {
		wp_enqueue_style(
			'hm-gsap-animations-frontend',
			plugins_url( 'build/frontend.css', __FILE__ ),
			[],
			$asset['version']
		);
	}
}
add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\\enqueue_frontend_assets' );

/**
 * Inject GSAP data attributes into the first HTML element of a rendered block.
 *
 * This works for both server-side rendered blocks (render.php) and static
 * blocks (JS save), since `render_block` fires for both.
 *
 * @param string $block_content Rendered block HTML.
 * @param array  $block         Block data including name and attrs.
 * @return string Modified HTML.
 */
function inject_gsap_data_attributes( string $block_content, array $block ): string {
	$animation = $block['attrs']['gsapAnimation'] ?? 'none';

	if ( 'none' === $animation || empty( $animation ) || empty( $block_content ) ) {
		return $block_content;
	}

	$data_attrs = build_data_attrs_string( $block['attrs'] );

	// Inject into the first opening HTML tag (handles optional leading whitespace).
	return preg_replace_callback(
		'/^(\s*<[a-zA-Z][a-zA-Z0-9]*)(\s|>)/',
		static function ( array $m ) use ( $data_attrs ): string {
			return $m[1] . $data_attrs . $m[2];
		},
		$block_content,
		1
	) ?? $block_content;
}
add_filter( 'render_block', __NAMESPACE__ . '\\inject_gsap_data_attributes', 10, 2 );

/**
 * Build the data-gsap-* attributes string from block attributes.
 */
function build_data_attrs_string( array $attrs ): string {
	$animation    = esc_attr( $attrs['gsapAnimation'] ?? 'none' );
	$mode         = esc_attr( $attrs['gsapMode'] ?? 'transition' );
	$trigger      = esc_attr( $attrs['gsapTrigger'] ?? 'scroll' );
	$duration     = esc_attr( $attrs['gsapDuration'] ?? 0.8 );
	$delay        = esc_attr( $attrs['gsapDelay'] ?? 0 );
	$ease         = esc_attr( $attrs['gsapEase'] ?? 'power2.out' );
	$animate_once = ! empty( $attrs['gsapAnimateOnce'] ) ? 'true' : 'false';
	$scroll_start = esc_attr( $attrs['gsapScrollStart'] ?? 'top 80%' );
	$scroll_end   = esc_attr( $attrs['gsapScrollEnd'] ?? 'top 20%' );
	$scrub        = esc_attr( $attrs['gsapScrub'] ?? 1 );
	$show_markers = ! empty( $attrs['gsapShowMarkers'] ) ? 'true' : 'false';

	$out  = " data-gsap-animation=\"{$animation}\"";
	$out .= " data-gsap-mode=\"{$mode}\"";
	$out .= " data-gsap-trigger=\"{$trigger}\"";
	$out .= " data-gsap-duration=\"{$duration}\"";
	$out .= " data-gsap-delay=\"{$delay}\"";
	$out .= " data-gsap-ease=\"{$ease}\"";
	$out .= " data-gsap-animate-once=\"{$animate_once}\"";
	$out .= " data-gsap-scroll-start=\"{$scroll_start}\"";
	$out .= " data-gsap-scroll-end=\"{$scroll_end}\"";
	$out .= " data-gsap-scrub=\"{$scrub}\"";
	$out .= " data-gsap-show-markers=\"{$show_markers}\"";

	if ( isset( $attrs['gsapParallaxSpeed'] ) ) {
		$parallax_speed = esc_attr( $attrs['gsapParallaxSpeed'] );
		$out           .= " data-gsap-parallax-speed=\"{$parallax_speed}\"";
	}

	if ( ! empty( $attrs['gsapStagger'] ) ) {
		$stagger        = esc_attr( $attrs['gsapStagger'] );
		$stagger_target = esc_attr( $attrs['gsapStaggerTarget'] ?? 'children' );
		$out           .= " data-gsap-stagger=\"{$stagger}\"";
		$out           .= " data-gsap-stagger-target=\"{$stagger_target}\"";
	}

	return $out;
}
