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
| `flip-y` | 3D vertical vertical flip |
| `count-up` | Counts a number from 0 to the block's value *(heading + paragraph only)* |
| `parallax-background` | Background image moves at a different speed than the scroll *(cover, group, column, media-text)* |
| `split-words` | Each word enters individually with stagger *(heading + paragraph only)* |
| `split-chars` | Each character enters individually with stagger *(heading + paragraph only)* |

### Count-up
Inspired by [Counting Number Block](https://wordpress.org/plugins/counting-number-block/). Finds the first number in the block's text and animates it from 0, preserving any prefix/suffix text (e.g. `"Over 5,000 clients"` → `"Over 0 clients"` → `"Over 5,000 clients"`).

### Split text

Uses [Splitting.js](https://splitting.js.org/) to wrap each word or character in a `<span>` **at runtime on the frontend only** — the saved HTML is never modified, so there is no conflict with the block editor or with React. Supports the same trigger/stagger/ease controls as other animations.

> **Limitation:** character splitting (`split-chars`) across nested HTML tags (e.g. `<strong>bold</strong>`) may produce unexpected results. Word splitting handles nested tags correctly.

### Parallax background
For `core/cover`: animates the inner `<img>`/`<video>` via `yPercent`. For blocks with a CSS `background-image` (group, column): animates `backgroundPositionY`. Both use GSAP ScrollTrigger scrub.

---

## Inspector panel controls

| Control | Applies to |
|---|---|
| Animation type | All |
| Mode: Transition / Scroll Scrub | All except count-up and parallax |
| Parallax speed (5–50) | `parallax-background` only |
| Scroll Start (e.g. `"top 80%"`) | Scroll-based modes |
| Scroll End (e.g. `"bottom top"`) | Scrub and parallax |
| Scrub smoothing (0–3 s) | Scrub and parallax |
| Show markers (debug) | Scroll-based modes |
| Trigger: On Scroll / On Page Load | Transition and count-up |
| Animate once | Scroll trigger only |
| Duration / Delay / Easing | Transition and count-up |
| Stagger children | group, columns, gallery, list, buttons |
| Stagger between elements (s) | split-words, split-chars |

---

## Accessibility

`prefers-reduced-motion` is respected — all animations are skipped entirely if the user's OS has "Reduce motion" enabled.

---

## Editor preview

When an animation is selected, the block plays a lightweight **CSS preview** in the editor canvas. Switching animation types restarts the preview automatically (the browser detects the `animation-name` change). No GSAP runs in the editor — CSS animations are GPU-accelerated with zero JS overhead.

---

## Supported blocks (out of the box)

| Block | Stagger | Count-up | Parallax | Split |
|---|---|---|---|---|
| `core/group` | ✅ | — | ✅ | — |
| `core/columns` | ✅ | — | — | — |
| `core/column` | — | — | ✅ | — |
| `core/paragraph` | — | ✅ | — | ✅ |
| `core/heading` | — | ✅ | — | ✅ |
| `core/image` | — | — | — | — |
| `core/gallery` | ✅ | — | — | — |
| `core/cover` | — | — | ✅ | — |
| `core/media-text` | — | — | ✅ | — |
| `core/list` | ✅ | — | — | — |
| `core/buttons` | ✅ | — | — | — |
| `core/quote` | — | — | — | — |
| `core/separator` | — | — | — | — |

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

There are two ways to add support for a custom block. Use whichever fits your workflow.

---

### Option A — `block.json` supports (recommended)

Declare support directly in the block's `block.json`. The plugin detects it automatically on both the PHP and JS sides — **no filter, no extra configuration needed**.

```json
{
  "name": "my-plugin/hero",
  "supports": {
    "hmGsapAnimations": true
  }
}
```

This enables all standard animations (fade, zoom, flip, scrub). To also enable specific features, pass an object instead of `true`:

```json
{
  "name": "my-plugin/stats-card",
  "supports": {
    "hmGsapAnimations": {
      "stagger": true,
      "countUp": true,
      "parallax": true
    }
  }
}
```

| Feature key | What it enables |
|---|---|
| `stagger` | "Animate children one by one" toggle in the Inspector |
| `countUp` | `count-up` option in the animation dropdown |
| `parallax` | `parallax-background` option in the animation dropdown |
| `split` | `split-words` and `split-chars` options in the animation dropdown |

> **How it works:** On the PHP side, `get_all_supported_blocks()` scans `WP_Block_Type_Registry` at enqueue time and auto-includes any block with `hmGsapAnimations` in its supports. On the JS side, the `blocks.registerBlockType` filter reads `settings.supports.hmGsapAnimations` at registration time, and the HOCs use `getBlockType(name)?.supports?.hmGsapAnimations` at render time.

---

### Option B — PHP filter

For blocks you don't control (third-party plugins), or when you prefer to centralise the configuration in your theme/mu-plugin:

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

> Note: the PHP filter only adds blocks to the base supported list. Feature flags (stagger, countUp, parallax) for PHP-filtered blocks still follow the hardcoded core lists — to enable extra features for a custom block via PHP, use the `block.json` approach above.

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
| `data-gsap-scroll-end` | `bottom top` | ScrollTrigger `end` (scrub + parallax) |
| `data-gsap-scrub` | `1` | Scrub smoothing lag (s) |
| `data-gsap-show-markers` | `false` | Enable debug markers |
| `data-gsap-parallax-speed` | `20` | Parallax movement intensity (5–50) |
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

**3. Add the editor CSS preview** — `src/editor/editor.css`:

```css
@keyframes gsap-preview-rotate-in {
    from { opacity: 0; transform: rotate(-180deg); }
    to   { opacity: 1; transform: rotate(0deg); }
}
.gsap-preview--rotate-in { animation-name: gsap-preview-rotate-in; }
```

Rebuild with `npm run build`. No PHP changes needed.

---

## License

GPL-2.0-or-later — [https://www.gnu.org/licenses/gpl-2.0.html](https://www.gnu.org/licenses/gpl-2.0.html)
