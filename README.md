# HM GSAP Animations

Adds GSAP animation controls to core WordPress blocks via the Gutenberg block editor. Editors pick animation, mode, trigger, timing, and stagger directly from the Inspector panel — no code required.

Inspired by [C9 Animation for Blocks](https://c9.covertnine.com/c9-animation-plugin/) (scrub mode, keyframe markers) and [Counting Number Block](https://wordpress.org/plugins/counting-number-block/) (count-up, animate-once, reduced motion).

---

## How it works

1. **Editor JS** (`src/editor/`) — uses `addFilter` to inject a "GSAP Animation" panel into the Inspector sidebar of every supported block.
2. **Block attributes** — all GSAP settings are saved as block attributes in the post content.
3. **PHP `render_block` filter** — reads saved attributes and injects `data-gsap-*` HTML attributes into the block's outermost element.
4. **Frontend JS** (`src/frontend/`) — queries `[data-gsap-animation]` elements and initialises GSAP tweens, using `ScrollTrigger` where needed.

---

## Animation modes

### Transition (default)
Plays once when the element enters the viewport. Like a CSS animation — choose *On Scroll* or *On Page Load*.

### Scroll Scrub (C9-style)
The animation progress is tied 1-to-1 to the scroll position between **Start** and **End** keyframes. Plays forward while scrolling down, backward while scrolling up. Duration and easing don't apply — scroll speed controls the pace.

---

## Available animations

| Value | Description |
|---|---|
| `fade-in` | Fade from transparent |
| `fade-up` | Fade + slide up |
| `fade-down` | Fade + slide down |
| `fade-left` | Fade + slide from right |
| `fade-right` | Fade + slide from left |
| `zoom-in` | Scale up from 85% + fade |
| `zoom-out` | Scale down from 115% + fade |
| `flip-x` | 3D horizontal flip |
| `flip-y` | 3D vertical flip |
| `count-up` | Counts a number from 0 to the block's value *(heading + paragraph only)* |

### Count-up
Inspired by [Counting Number Block](https://wordpress.org/plugins/counting-number-block/). Finds the first number in the block's text and animates it from 0, preserving any prefix/suffix text (e.g. `"Over 5,000 clients"` → `"Over 0 clients"` → `"Over 5,000 clients"`).

---

## Inspector panel controls

| Control | Applies to |
|---|---|
| Animation type | All modes |
| Mode: Transition / Scroll Scrub | All except count-up |
| Scroll Start (e.g. `"top 80%"`) | Scroll-based modes |
| Scroll End (e.g. `"top 20%"`) | Scrub mode only |
| Scrub smoothing (0–3 s) | Scrub mode only |
| Show markers (debug) | Scroll-based modes |
| Trigger: On Scroll / On Page Load | Transition mode |
| Animate once | Scroll trigger only |
| Duration / Delay / Easing | Transition mode |
| Stagger children | group, columns, gallery, list, buttons |

---

## Accessibility

`prefers-reduced-motion` is respected — all animations are skipped entirely if the user's OS has "Reduce motion" enabled.

---

## Supported blocks (out of the box)

| Block | Stagger | Count-up |
|---|---|---|
| `core/group` | ✅ | — |
| `core/columns` | ✅ | — |
| `core/column` | — | — |
| `core/paragraph` | — | ✅ |
| `core/heading` | — | ✅ |
| `core/image` | — | — |
| `core/gallery` | ✅ | — |
| `core/cover` | — | — |
| `core/media-text` | — | — |
| `core/list` | ✅ | — |
| `core/buttons` | ✅ | — |
| `core/quote` | — | — |
| `core/separator` | — | — |

---

## Installation & build

```bash
cd plugins/hm-gsap-animations
npm install
npm run build   # production → build/
npm run start   # watch mode for development
```

---

## Extending to custom blocks

### Add a block to the supported list

One PHP filter is all that's needed. It feeds both the editor JS (controls + attribute registration) and the PHP renderer.

```php
add_filter( 'hm_gsap_animations_supported_blocks', function ( array $blocks ): array {
    $blocks[] = 'my-plugin/my-custom-block';
    return $blocks;
} );
```

Multiple blocks at once:

```php
add_filter( 'hm_gsap_animations_supported_blocks', function ( array $blocks ): array {
    return array_merge( $blocks, [
        'my-plugin/hero',
        'my-plugin/card',
        'my-plugin/stats-counter',
    ] );
} );
```

### Enable count-up on a custom block

`count-up` is only shown in the dropdown for `core/heading` and `core/paragraph`. To enable it for a custom block, add your block name to `COUNT_UP_SUPPORTED_BLOCKS` in `src/editor/constants.js`, or fork the controls to add conditional logic.

### Enable stagger on a custom block

Same approach — add your block to `STAGGER_SUPPORTED_BLOCKS` in `src/editor/constants.js`.

---

## Frontend data attributes reference

The PHP `render_block` filter injects these on the outermost element:

| Attribute | Example | Description |
|---|---|---|
| `data-gsap-animation` | `fade-up` | Animation preset key |
| `data-gsap-mode` | `transition` / `scrub` | Animation mode |
| `data-gsap-trigger` | `scroll` / `load` | When to fire (transition only) |
| `data-gsap-duration` | `0.8` | Tween duration (s) |
| `data-gsap-delay` | `0.2` | Delay before start (s) |
| `data-gsap-ease` | `power2.out` | GSAP ease string |
| `data-gsap-animate-once` | `true` | Play once or re-trigger on re-entry |
| `data-gsap-scroll-start` | `top 80%` | ScrollTrigger `start` value |
| `data-gsap-scroll-end` | `top 20%` | ScrollTrigger `end` (scrub mode) |
| `data-gsap-scrub` | `1` | Scrub smoothing lag (s) |
| `data-gsap-show-markers` | `false` | Enable debug markers |
| `data-gsap-stagger` | `0.15` | Delay between staggered children |
| `data-gsap-stagger-target` | `children` | CSS selector for stagger targets |

---

## Adding a new animation preset

**1. Add to the editor dropdown** — `src/editor/constants.js`:

```js
export const ANIMATION_OPTIONS = [
    // ...
    { value: 'rotate-in', label: 'Rotate In' },
];
```

**2. Add the GSAP `from` state** — `src/frontend/animations.js`:

```js
export const ANIMATION_PRESETS = {
    // ...
    'rotate-in': { opacity: 0, rotation: -180, transformOrigin: 'center center' },
};
```

Rebuild with `npm run build`. No PHP changes needed.

---

## License

GPL-2.0-or-later — [https://www.gnu.org/licenses/gpl-2.0.html](https://www.gnu.org/licenses/gpl-2.0.html)
