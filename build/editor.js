/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/editor/attributes.js"
/*!**********************************!*\
  !*** ./src/editor/attributes.js ***!
  \**********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GSAP_ATTRIBUTES: () => (/* binding */ GSAP_ATTRIBUTES)
/* harmony export */ });
/**
 * GSAP attributes added to every supported block type.
 * Saved in block comment delimiters; consumed by PHP render_block.
 */
const GSAP_ATTRIBUTES = {
  /** Animation preset key (e.g. 'fade-up', 'count-up'). 'none' = disabled. */
  gsapAnimation: {
    type: 'string',
    default: 'none'
  },
  /**
   * 'transition' — plays once on entry (like CSS animations)
   * 'scrub'      — ties progress to scroll position (GSAP scrub)
   */
  gsapMode: {
    type: 'string',
    default: 'transition'
  },
  /** Transition mode only: 'scroll' or 'load'. */
  gsapTrigger: {
    type: 'string',
    default: 'scroll'
  },
  /** Transition mode only: animation duration in seconds. */
  gsapDuration: {
    type: 'number',
    default: 0.8
  },
  /** Transition mode only: delay before tween starts (seconds). */
  gsapDelay: {
    type: 'number',
    default: 0
  },
  /** Transition mode only: GSAP ease string. */
  gsapEase: {
    type: 'string',
    default: 'power2.out'
  },
  /** Whether to animate only the first time the element enters viewport. */
  gsapAnimateOnce: {
    type: 'boolean',
    default: true
  },
  /** ScrollTrigger start position (e.g. "top 80%"). Used in both modes. */
  gsapScrollStart: {
    type: 'string',
    default: 'top 80%'
  },
  /** Scrub mode only: ScrollTrigger end position (e.g. "top 20%"). */
  gsapScrollEnd: {
    type: 'string',
    default: 'top 20%'
  },
  /** Scrub mode only: smoothing lag in seconds (0 = instant, 1 = 1 s lag). */
  gsapScrub: {
    type: 'number',
    default: 1
  },
  /** Show ScrollTrigger debug markers in the browser (development only). */
  gsapShowMarkers: {
    type: 'boolean',
    default: false
  },
  /** Stagger delay between child elements (seconds). 0 = disabled. */
  gsapStagger: {
    type: 'number',
    default: 0
  },
  /** CSS selector for stagger targets, or 'children' for direct children. */
  gsapStaggerTarget: {
    type: 'string',
    default: 'children'
  },
  /**
   * Parallax speed/intensity. Higher = more movement.
   * The background travels `speed`% of its size as the element crosses the viewport.
   */
  gsapParallaxSpeed: {
    type: 'number',
    default: 20
  },
  /** Hover sub-effect key (lift, grow, shrink, tilt, brighten, dim). */
  gsapHoverEffect: {
    type: 'string',
    default: 'lift'
  }
};

/***/ },

/***/ "./src/editor/constants.js"
/*!*********************************!*\
  !*** ./src/editor/constants.js ***!
  \*********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ANIMATION_MODES: () => (/* binding */ ANIMATION_MODES),
/* harmony export */   ANIMATION_OPTIONS: () => (/* binding */ ANIMATION_OPTIONS),
/* harmony export */   COUNT_UP_SUPPORTED_BLOCKS: () => (/* binding */ COUNT_UP_SUPPORTED_BLOCKS),
/* harmony export */   DEFAULT_SUPPORTED_BLOCKS: () => (/* binding */ DEFAULT_SUPPORTED_BLOCKS),
/* harmony export */   EASE_OPTIONS: () => (/* binding */ EASE_OPTIONS),
/* harmony export */   HOVER_EFFECT_OPTIONS: () => (/* binding */ HOVER_EFFECT_OPTIONS),
/* harmony export */   PARALLAX_SUPPORTED_BLOCKS: () => (/* binding */ PARALLAX_SUPPORTED_BLOCKS),
/* harmony export */   SPLIT_SUPPORTED_BLOCKS: () => (/* binding */ SPLIT_SUPPORTED_BLOCKS),
/* harmony export */   STAGGER_SUPPORTED_BLOCKS: () => (/* binding */ STAGGER_SUPPORTED_BLOCKS),
/* harmony export */   TRIGGER_OPTIONS: () => (/* binding */ TRIGGER_OPTIONS)
/* harmony export */ });
/**
 * Blocks that support stagger (animating their children one by one).
 */
const STAGGER_SUPPORTED_BLOCKS = ['core/group', 'core/columns', 'core/gallery', 'core/list', 'core/buttons'];

/**
 * Blocks that support count-up animation (must contain a number in their text).
 */
const COUNT_UP_SUPPORTED_BLOCKS = ['core/heading', 'core/paragraph'];

/**
 * Blocks that support split-text animations (split-words, split-chars).
 * Only makes sense for text blocks.
 */
const SPLIT_SUPPORTED_BLOCKS = ['core/heading', 'core/paragraph'];

/**
 * Blocks that support parallax-background.
 * core/cover  → animates the inner <img>/<video> element via yPercent.
 * Others      → animates backgroundPositionY on the block wrapper.
 */
const PARALLAX_SUPPORTED_BLOCKS = ['core/cover', 'core/group', 'core/column', 'core/media-text'];
const ANIMATION_OPTIONS = [{
  value: 'none',
  label: '— None —'
}, {
  value: 'fade-in',
  label: 'Fade In'
}, {
  value: 'fade-up',
  label: 'Fade Up'
}, {
  value: 'fade-down',
  label: 'Fade Down'
}, {
  value: 'fade-left',
  label: 'Fade Left'
}, {
  value: 'fade-right',
  label: 'Fade Right'
}, {
  value: 'zoom-in',
  label: 'Zoom In'
}, {
  value: 'zoom-out',
  label: 'Zoom Out'
}, {
  value: 'flip-x',
  label: 'Flip Horizontal'
}, {
  value: 'flip-y',
  label: 'Flip Vertical'
}, {
  value: 'count-up',
  label: 'Count Up (numbers)'
}, {
  value: 'parallax-background',
  label: 'Parallax Background'
}, {
  value: 'split-words',
  label: 'Split — Words'
}, {
  value: 'split-chars',
  label: 'Split — Characters'
}, {
  value: 'hover',
  label: 'Hover Effect'
}];

/**
 * Hover sub-effects — the TO state GSAP animates to on mouseenter,
 * reversed on mouseleave via tl.reverse().
 */
const HOVER_EFFECT_OPTIONS = [{
  value: 'lift',
  label: 'Lift'
}, {
  value: 'grow',
  label: 'Grow'
}, {
  value: 'shrink',
  label: 'Shrink'
}, {
  value: 'tilt',
  label: 'Tilt (3D)'
}, {
  value: 'brighten',
  label: 'Brighten'
}, {
  value: 'dim',
  label: 'Dim'
}];

/**
 * Animation mode:
 * - transition: plays once when element enters viewport (or on load)
 * - scrub:      ties animation progress to scroll position (GSAP scrub)
 */
const ANIMATION_MODES = [{
  value: 'transition',
  label: 'Transition'
}, {
  value: 'scrub',
  label: 'Scroll Scrub'
}];
const TRIGGER_OPTIONS = [{
  value: 'scroll',
  label: 'On Scroll'
}, {
  value: 'load',
  label: 'On Page Load'
}];
const EASE_OPTIONS = [{
  value: 'power1.out',
  label: 'Power 1 — Subtle'
}, {
  value: 'power2.out',
  label: 'Power 2 — Default'
}, {
  value: 'power3.out',
  label: 'Power 3 — Strong'
}, {
  value: 'power4.out',
  label: 'Power 4 — Very Strong'
}, {
  value: 'back.out(1.7)',
  label: 'Back — Overshoot'
}, {
  value: 'elastic.out(1, 0.3)',
  label: 'Elastic'
}, {
  value: 'bounce.out',
  label: 'Bounce'
}, {
  value: 'sine.out',
  label: 'Sine — Smooth'
}, {
  value: 'linear',
  label: 'Linear'
}];

/**
 * Default supported blocks — overridden at runtime by window.hmGsapAnimations.supportedBlocks
 * which is populated via wp_localize_script and filterable in PHP.
 */
const DEFAULT_SUPPORTED_BLOCKS = ['core/group', 'core/columns', 'core/column', 'core/paragraph', 'core/heading', 'core/image', 'core/gallery', 'core/cover', 'core/media-text', 'core/list', 'core/buttons', 'core/quote', 'core/separator'];

/***/ },

/***/ "./src/editor/controls.js"
/*!********************************!*\
  !*** ./src/editor/controls.js ***!
  \********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GsapAnimationControls: () => (/* binding */ GsapAnimationControls)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./constants */ "./src/editor/constants.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils */ "./src/editor/utils.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__);






/**
 * GSAP animation Inspector panel for any supported block.
 *
 * @param {Object}   props
 * @param {Object}   props.attributes    Block attributes.
 * @param {Function} props.setAttributes Block setAttributes.
 * @param {string}   props.blockName     Block type name (e.g. 'core/paragraph').
 */

function GsapAnimationControls({
  attributes,
  setAttributes,
  blockName
}) {
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
    gsapStaggerTarget
  } = attributes;
  const hasAnimation = gsapAnimation && gsapAnimation !== 'none';
  const isScrub = gsapMode === 'scrub';
  const isScrollBased = isScrub || gsapTrigger === 'scroll';
  const isCountUp = gsapAnimation === 'count-up';
  const isParallax = gsapAnimation === 'parallax-background';
  const isSplit = gsapAnimation === 'split-words' || gsapAnimation === 'split-chars';
  const isHover = gsapAnimation === 'hover';
  const supportsStagger = (0,_utils__WEBPACK_IMPORTED_MODULE_4__.blockSupportsFeature)(blockName, 'stagger');
  const supportsCountUp = (0,_utils__WEBPACK_IMPORTED_MODULE_4__.blockSupportsFeature)(blockName, 'countUp');
  const supportsParallax = (0,_utils__WEBPACK_IMPORTED_MODULE_4__.blockSupportsFeature)(blockName, 'parallax');
  const supportsSplit = (0,_utils__WEBPACK_IMPORTED_MODULE_4__.blockSupportsFeature)(blockName, 'split');

  // Filter animation options based on what this block type supports.
  const animationOptions = _constants__WEBPACK_IMPORTED_MODULE_3__.ANIMATION_OPTIONS.filter(o => {
    if (o.value === 'count-up' && !supportsCountUp) return false;
    if (o.value === 'parallax-background' && !supportsParallax) return false;
    if ((o.value === 'split-words' || o.value === 'split-chars') && !supportsSplit) return false;
    return true;
  });
  const animationLabel = _constants__WEBPACK_IMPORTED_MODULE_3__.ANIMATION_OPTIONS.find(o => o.value === gsapAnimation)?.label;
  const panelTitle = hasAnimation ? `GSAP: ${animationLabel}` : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('GSAP Animation', 'hm-gsap-animations');
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
      title: panelTitle,
      initialOpen: hasAnimation,
      className: "hm-gsap-panel",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Animation', 'hm-gsap-animations'),
        value: gsapAnimation,
        options: animationOptions,
        onChange: value => setAttributes({
          gsapAnimation: value
        })
      }), hasAnimation && !isCountUp && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.Fragment, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalToggleGroupControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Mode', 'hm-gsap-animations'),
          value: gsapMode,
          isBlock: true,
          onChange: value => setAttributes({
            gsapMode: value
          }),
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalToggleGroupControlOption, {
            value: "transition",
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Transition', 'hm-gsap-animations')
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalToggleGroupControlOption, {
            value: "scrub",
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Scroll Scrub', 'hm-gsap-animations')
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalSpacer, {
          marginBottom: 2
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(SectionLabel, {
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Scroll Position', 'hm-gsap-animations')
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Start', 'hm-gsap-animations'),
          help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('"element viewport" — e.g. "top 80%"', 'hm-gsap-animations'),
          value: gsapScrollStart,
          onChange: value => setAttributes({
            gsapScrollStart: value
          })
        }), isScrub && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.Fragment, {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('End', 'hm-gsap-animations'),
            help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Where the scroll animation finishes — e.g. "top 20%"', 'hm-gsap-animations'),
            value: gsapScrollEnd,
            onChange: value => setAttributes({
              gsapScrollEnd: value
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Scrub smoothing (s)', 'hm-gsap-animations'),
            help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('0 = instant tracking, higher = laggy/smooth', 'hm-gsap-animations'),
            value: gsapScrub,
            onChange: value => setAttributes({
              gsapScrub: value
            }),
            min: 0,
            max: 3,
            step: 0.1
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Show markers (debug)', 'hm-gsap-animations'),
          help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Displays start/end trigger lines in the browser.', 'hm-gsap-animations'),
          checked: gsapShowMarkers,
          onChange: value => setAttributes({
            gsapShowMarkers: value
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalDivider, {}), !isScrub && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.Fragment, {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(SectionLabel, {
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Timing', 'hm-gsap-animations')
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Trigger', 'hm-gsap-animations'),
            value: gsapTrigger,
            options: _constants__WEBPACK_IMPORTED_MODULE_3__.TRIGGER_OPTIONS,
            onChange: value => setAttributes({
              gsapTrigger: value
            })
          }), gsapTrigger === 'scroll' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Animate once', 'hm-gsap-animations'),
            help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Plays only the first time the element enters the viewport.', 'hm-gsap-animations'),
            checked: gsapAnimateOnce,
            onChange: value => setAttributes({
              gsapAnimateOnce: value
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Duration (s)', 'hm-gsap-animations'),
            value: gsapDuration,
            onChange: value => setAttributes({
              gsapDuration: value
            }),
            min: 0.1,
            max: 3,
            step: 0.1
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Delay (s)', 'hm-gsap-animations'),
            value: gsapDelay,
            onChange: value => setAttributes({
              gsapDelay: value
            }),
            min: 0,
            max: 3,
            step: 0.1
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Easing', 'hm-gsap-animations'),
            value: gsapEase,
            options: _constants__WEBPACK_IMPORTED_MODULE_3__.EASE_OPTIONS,
            onChange: value => setAttributes({
              gsapEase: value
            })
          })]
        }), supportsStagger && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.Fragment, {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalDivider, {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(SectionLabel, {
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Stagger', 'hm-gsap-animations')
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Animate children one by one', 'hm-gsap-animations'),
            checked: gsapStagger > 0,
            onChange: checked => setAttributes({
              gsapStagger: checked ? 0.15 : 0
            })
          }), gsapStagger > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.Fragment, {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Stagger amount (s)', 'hm-gsap-animations'),
              value: gsapStagger,
              onChange: value => setAttributes({
                gsapStagger: value
              }),
              min: 0.05,
              max: 1,
              step: 0.05
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Target selector', 'hm-gsap-animations'),
              help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('CSS selector for children. Leave "children" for direct children.', 'hm-gsap-animations'),
              value: gsapStaggerTarget,
              onChange: value => setAttributes({
                gsapStaggerTarget: value
              })
            })]
          })]
        })]
      }), hasAnimation && isParallax && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.Fragment, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Speed', 'hm-gsap-animations'),
          help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('How much the background moves as the element crosses the viewport. Higher = more depth.', 'hm-gsap-animations'),
          value: attributes.gsapParallaxSpeed,
          onChange: value => setAttributes({
            gsapParallaxSpeed: value
          }),
          min: 5,
          max: 50,
          step: 1
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalDivider, {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(SectionLabel, {
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Scroll Position', 'hm-gsap-animations')
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Start', 'hm-gsap-animations'),
          help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('When parallax begins — e.g. "top bottom"', 'hm-gsap-animations'),
          value: gsapScrollStart,
          onChange: value => setAttributes({
            gsapScrollStart: value
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('End', 'hm-gsap-animations'),
          help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('When parallax ends — e.g. "bottom top"', 'hm-gsap-animations'),
          value: gsapScrollEnd,
          onChange: value => setAttributes({
            gsapScrollEnd: value
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Scrub smoothing (s)', 'hm-gsap-animations'),
          value: gsapScrub,
          onChange: value => setAttributes({
            gsapScrub: value
          }),
          min: 0,
          max: 3,
          step: 0.1
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Show markers (debug)', 'hm-gsap-animations'),
          checked: gsapShowMarkers,
          onChange: value => setAttributes({
            gsapShowMarkers: value
          })
        })]
      }), hasAnimation && isCountUp && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.Fragment, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Trigger', 'hm-gsap-animations'),
          value: gsapTrigger,
          options: _constants__WEBPACK_IMPORTED_MODULE_3__.TRIGGER_OPTIONS,
          onChange: value => setAttributes({
            gsapTrigger: value
          })
        }), gsapTrigger === 'scroll' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.Fragment, {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Scroll Start', 'hm-gsap-animations'),
            value: gsapScrollStart,
            onChange: value => setAttributes({
              gsapScrollStart: value
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Animate once', 'hm-gsap-animations'),
            checked: gsapAnimateOnce,
            onChange: value => setAttributes({
              gsapAnimateOnce: value
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Show markers (debug)', 'hm-gsap-animations'),
            checked: gsapShowMarkers,
            onChange: value => setAttributes({
              gsapShowMarkers: value
            })
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Duration (s)', 'hm-gsap-animations'),
          value: gsapDuration,
          onChange: value => setAttributes({
            gsapDuration: value
          }),
          min: 0.5,
          max: 5,
          step: 0.1
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Delay (s)', 'hm-gsap-animations'),
          value: gsapDelay,
          onChange: value => setAttributes({
            gsapDelay: value
          }),
          min: 0,
          max: 3,
          step: 0.1
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Easing', 'hm-gsap-animations'),
          value: gsapEase,
          options: _constants__WEBPACK_IMPORTED_MODULE_3__.EASE_OPTIONS,
          onChange: value => setAttributes({
            gsapEase: value
          })
        })]
      }), hasAnimation && isHover && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.Fragment, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("p", {
          style: {
            fontSize: '12px',
            color: '#757575',
            margin: '0 0 16px'
          },
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Plays on mouseenter, reverses on mouseleave. Skipped automatically on touch devices.', 'hm-gsap-animations')
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Effect', 'hm-gsap-animations'),
          value: attributes.gsapHoverEffect,
          options: _constants__WEBPACK_IMPORTED_MODULE_3__.HOVER_EFFECT_OPTIONS,
          onChange: value => setAttributes({
            gsapHoverEffect: value
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalDivider, {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Duration (s)', 'hm-gsap-animations'),
          value: gsapDuration,
          onChange: value => setAttributes({
            gsapDuration: value
          }),
          min: 0.1,
          max: 1,
          step: 0.05
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Easing', 'hm-gsap-animations'),
          value: gsapEase,
          options: _constants__WEBPACK_IMPORTED_MODULE_3__.EASE_OPTIONS,
          onChange: value => setAttributes({
            gsapEase: value
          })
        })]
      }), hasAnimation && isSplit && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.Fragment, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("p", {
          style: {
            fontSize: '12px',
            color: '#757575',
            margin: '0 0 16px'
          },
          children: gsapAnimation === 'split-chars' ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Each character animates individually. Works best on short headings.', 'hm-gsap-animations') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Each word animates individually. Works best on headings and short paragraphs.', 'hm-gsap-animations')
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Trigger', 'hm-gsap-animations'),
          value: gsapTrigger,
          options: _constants__WEBPACK_IMPORTED_MODULE_3__.TRIGGER_OPTIONS,
          onChange: value => setAttributes({
            gsapTrigger: value
          })
        }), gsapTrigger === 'scroll' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.Fragment, {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Scroll Start', 'hm-gsap-animations'),
            value: gsapScrollStart,
            onChange: value => setAttributes({
              gsapScrollStart: value
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Animate once', 'hm-gsap-animations'),
            checked: gsapAnimateOnce,
            onChange: value => setAttributes({
              gsapAnimateOnce: value
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Show markers (debug)', 'hm-gsap-animations'),
            checked: gsapShowMarkers,
            onChange: value => setAttributes({
              gsapShowMarkers: value
            })
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalDivider, {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Duration per element (s)', 'hm-gsap-animations'),
          value: gsapDuration,
          onChange: value => setAttributes({
            gsapDuration: value
          }),
          min: 0.1,
          max: 2,
          step: 0.05
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Delay before start (s)', 'hm-gsap-animations'),
          value: gsapDelay,
          onChange: value => setAttributes({
            gsapDelay: value
          }),
          min: 0,
          max: 3,
          step: 0.1
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Stagger between elements (s)', 'hm-gsap-animations'),
          help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Delay between each word/character.', 'hm-gsap-animations'),
          value: gsapStagger || 0.05,
          onChange: value => setAttributes({
            gsapStagger: value
          }),
          min: 0.01,
          max: 0.5,
          step: 0.01
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Easing', 'hm-gsap-animations'),
          value: gsapEase,
          options: _constants__WEBPACK_IMPORTED_MODULE_3__.EASE_OPTIONS,
          onChange: value => setAttributes({
            gsapEase: value
          })
        })]
      })]
    })
  });
}

/** Small uppercase section label, matches Gutenberg's visual style. */
function SectionLabel({
  children
}) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalText, {
    size: "11",
    weight: "500",
    upperCase: true,
    variant: "muted",
    as: "p",
    style: {
      marginBottom: '8px'
    },
    children: children
  });
}

/***/ },

/***/ "./src/editor/utils.js"
/*!*****************************!*\
  !*** ./src/editor/utils.js ***!
  \*****************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   blockSupportsFeature: () => (/* binding */ blockSupportsFeature),
/* harmony export */   isBlockSupported: () => (/* binding */ isBlockSupported)
/* harmony export */ });
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./src/editor/constants.js");



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
function getGsapSupports(name) {
  return (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.getBlockType)(name)?.supports?.hmGsapAnimations ?? false;
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
function isBlockSupported(name) {
  const phpList = window?.hmGsapAnimations?.supportedBlocks ?? _constants__WEBPACK_IMPORTED_MODULE_1__.DEFAULT_SUPPORTED_BLOCKS;
  if (phpList.includes(name)) return true;
  return !!getGsapSupports(name);
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
function blockSupportsFeature(name, feature) {
  const coreLists = {
    stagger: _constants__WEBPACK_IMPORTED_MODULE_1__.STAGGER_SUPPORTED_BLOCKS,
    parallax: _constants__WEBPACK_IMPORTED_MODULE_1__.PARALLAX_SUPPORTED_BLOCKS,
    countUp: _constants__WEBPACK_IMPORTED_MODULE_1__.COUNT_UP_SUPPORTED_BLOCKS,
    split: _constants__WEBPACK_IMPORTED_MODULE_1__.SPLIT_SUPPORTED_BLOCKS
  };
  if (coreLists[feature]?.includes(name)) return true;
  const gsapSupports = getGsapSupports(name);
  if (!gsapSupports || gsapSupports === true) return false;
  return !!gsapSupports[feature];
}

/***/ },

/***/ "./src/editor/with-animation.js"
/*!**************************************!*\
  !*** ./src/editor/with-animation.js ***!
  \**************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   withGsapAnimationControls: () => (/* binding */ withGsapAnimationControls)
/* harmony export */ });
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _controls__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./controls */ "./src/editor/controls.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils */ "./src/editor/utils.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);





/**
 * HOC that injects the GSAP Inspector panel into every supported block.
 *
 * Uses `isBlockSupported()` which resolves support via:
 * 1. The PHP-filtered supported blocks list.
 * 2. The block's own `supports.hmGsapAnimations` declaration in block.json.
 */

const withGsapAnimationControls = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_0__.createHigherOrderComponent)(BlockEdit => props => {
  const {
    name,
    attributes,
    setAttributes
  } = props;
  if (!(0,_utils__WEBPACK_IMPORTED_MODULE_3__.isBlockSupported)(name)) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(BlockEdit, {
      ...props
    });
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(BlockEdit, {
      ...props
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_controls__WEBPACK_IMPORTED_MODULE_2__.GsapAnimationControls, {
      attributes: attributes,
      setAttributes: setAttributes,
      blockName: name
    })]
  });
}, 'withGsapAnimationControls');

/***/ },

/***/ "./src/editor/with-preview.js"
/*!************************************!*\
  !*** ./src/editor/with-preview.js ***!
  \************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   withAnimationPreview: () => (/* binding */ withAnimationPreview)
/* harmony export */ });
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./src/editor/utils.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);



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

const withAnimationPreview = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_0__.createHigherOrderComponent)(BlockListBlock => props => {
  const {
    name,
    attributes
  } = props;
  const animation = attributes?.gsapAnimation;
  if (!animation || animation === 'none' || !(0,_utils__WEBPACK_IMPORTED_MODULE_1__.isBlockSupported)(name)) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(BlockListBlock, {
      ...props
    });
  }
  const existingClass = props.wrapperProps?.className ?? '';
  const wrapperProps = {
    ...props.wrapperProps,
    className: `${existingClass} has-gsap-preview gsap-preview--${animation}`.trim()
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(BlockListBlock, {
    ...props,
    wrapperProps: wrapperProps
  });
}, 'withAnimationPreview');

/***/ },

/***/ "./src/editor/editor.css"
/*!*******************************!*\
  !*** ./src/editor/editor.css ***!
  \*******************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "react/jsx-runtime"
/*!**********************************!*\
  !*** external "ReactJSXRuntime" ***!
  \**********************************/
(module) {

module.exports = window["ReactJSXRuntime"];

/***/ },

/***/ "@wordpress/block-editor"
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
(module) {

module.exports = window["wp"]["blockEditor"];

/***/ },

/***/ "@wordpress/blocks"
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
(module) {

module.exports = window["wp"]["blocks"];

/***/ },

/***/ "@wordpress/components"
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
(module) {

module.exports = window["wp"]["components"];

/***/ },

/***/ "@wordpress/compose"
/*!*********************************!*\
  !*** external ["wp","compose"] ***!
  \*********************************/
(module) {

module.exports = window["wp"]["compose"];

/***/ },

/***/ "@wordpress/element"
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
(module) {

module.exports = window["wp"]["element"];

/***/ },

/***/ "@wordpress/hooks"
/*!*******************************!*\
  !*** external ["wp","hooks"] ***!
  \*******************************/
(module) {

module.exports = window["wp"]["hooks"];

/***/ },

/***/ "@wordpress/i18n"
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
(module) {

module.exports = window["wp"]["i18n"];

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*****************************!*\
  !*** ./src/editor/index.js ***!
  \*****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./src/editor/constants.js");
/* harmony import */ var _attributes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./attributes */ "./src/editor/attributes.js");
/* harmony import */ var _with_animation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./with-animation */ "./src/editor/with-animation.js");
/* harmony import */ var _with_preview__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./with-preview */ "./src/editor/with-preview.js");
/* harmony import */ var _editor_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./editor.css */ "./src/editor/editor.css");







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
function addGsapAttributes(settings, name) {
  const phpList = window?.hmGsapAnimations?.supportedBlocks ?? _constants__WEBPACK_IMPORTED_MODULE_1__.DEFAULT_SUPPORTED_BLOCKS;
  const inPhpList = phpList.includes(name);
  const hasBlockJsonSupport = !!settings.supports?.hmGsapAnimations;
  if (!inPhpList && !hasBlockJsonSupport) {
    return settings;
  }
  return {
    ...settings,
    attributes: {
      ...settings.attributes,
      ..._attributes__WEBPACK_IMPORTED_MODULE_2__.GSAP_ATTRIBUTES
    }
  };
}
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__.addFilter)('blocks.registerBlockType', 'hm/gsap-animations/add-attributes', addGsapAttributes);

/**
 * Filter: inject GSAP Inspector panel into supported block Edit components.
 */
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__.addFilter)('editor.BlockEdit', 'hm/gsap-animations/add-controls', _with_animation__WEBPACK_IMPORTED_MODULE_3__.withGsapAnimationControls);

/**
 * Filter: add CSS preview class to block wrapper in the editor canvas.
 * Uses CSS animations (GPU/compositor thread) — no GSAP, no performance cost.
 */
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__.addFilter)('editor.BlockListBlock', 'hm/gsap-animations/preview', _with_preview__WEBPACK_IMPORTED_MODULE_4__.withAnimationPreview);
})();

/******/ })()
;
//# sourceMappingURL=editor.js.map