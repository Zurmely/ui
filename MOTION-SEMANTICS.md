# Z-UI Motion Semantics

**Status:** Draft  
**Audience:** Designers and developers  
**Related:** [PRD.md](./PRD.md), [`motion.css`](./motion.css)

This document defines how **motion semantics** work in Z-UI. Motion semantics are purpose-based duration and easing tokens. They keep interaction feedback consistent across components. They honor reduced-motion preferences. They map cleanly between Figma and code.

---

## 1. Why motion semantics exist

Primitive motion values answer: *"How long is step 150?"* or *"What is the standard curve?"*  
Semantic motion answers: *"How fast should a button hover feel?"* or *"How long should a loading spinner rotate?"*

| Layer | Answers | Example | Who uses it |
| --- | --- | --- | --- |
| **Primitive** | Raw duration and curve values | `duration.150`, `easing.decelerate` | Theme authors only |
| **Semantic** | UI purpose | `motion.duration.interaction`, `motion.easing.enter` | Designers and developers (default) |

**Rules:**

1. Components **must** consume semantic motion tokens. Do not use raw primitives in component styles.
2. Motion is **optional enhancement**. State changes must remain understandable without animation.
3. Focus outlines, validation feedback, and keyboard highlighting must stay immediate.
4. Continuous or looping animation requires an explicit component-level reduced-motion fallback.
5. Motion tokens are **theme-independent**. They do not vary between light and dark modes.

---

## 2. Purpose decision table

Use this table to choose a semantic role.

| You are building | Use duration | Use easing | Typical properties |
| --- | --- | --- | --- |
| Hover, pressed, checked, or border/color feedback on a control | `motion.duration.interaction` | `motion.easing.interaction` | `background-color`, `border-color`, `color` |
| Layout rearrange, expand, or resize of a surface | `motion.duration.layout` | `motion.easing.interaction` | `flex-basis`, `flex-grow`, `width`, `height` |
| Content that opens or mounts (dialog, popover, menu, tooltip) | `motion.duration.enter` | `motion.easing.enter` | `opacity`, `transform` |
| Content that closes or unmounts | `motion.duration.exit` | `motion.easing.exit` | `opacity`, `transform` |
| Spinner, skeleton shimmer, or other looping indicator | `motion.duration.continuous` | `motion.easing.continuous` | `transform`, `background-position` |

See [§6.2](#62-css-examples) for copy-paste CSS examples for each purpose.

Exit duration is shorter than enter duration. Dismissal must not make the user wait.

---

## 3. Duration scale

### 3.1 Duration primitives

| Token path | CSS variable | Value | Use |
| --- | --- | --- | --- |
| `duration.0` | `--z-duration-0` | `0ms` | Reduced-motion override |
| `duration.100` | `--z-duration-100` | `100ms` | Fast exit timing |
| `duration.150` | `--z-duration-150` | `150ms` | Standard interaction feedback |
| `duration.200` | `--z-duration-200` | `200ms` | Standard enter timing |
| `duration.400` | `--z-duration-400` | `400ms` | Layout rearrange and expand |
| `duration.800` | `--z-duration-800` | `800ms` | Continuous loading or progress loops |

### 3.2 Semantic durations

| Token path | CSS variable | Maps to | Use |
| --- | --- | --- | --- |
| `motion.duration.interaction` | `--z-motion-duration-interaction` | `duration.150` | Hover, pressed, checked, and border/color feedback |
| `motion.duration.layout` | `--z-motion-duration-layout` | `duration.400` | Layout rearrange, expand, and resize of a surface |
| `motion.duration.enter` | `--z-motion-duration-enter` | `duration.200` | Overlay and floating content open |
| `motion.duration.exit` | `--z-motion-duration-exit` | `duration.100` | Overlay and floating content close |
| `motion.duration.continuous` | `--z-motion-duration-continuous` | `duration.800` | Spinner and other looping indicators |

Under `prefers-reduced-motion: reduce`, `--z-motion-duration-interaction`, `--z-motion-duration-layout`, `--z-motion-duration-enter`, and `--z-motion-duration-exit` resolve to `0ms` globally. Continuous animation duration is **not** globally zeroed. Components that loop must disable animation explicitly.

---

## 4. Easing scale

### 4.1 Easing primitives

| Token path | CSS variable | Value | Use |
| --- | --- | --- | --- |
| `easing.standard` | `--z-easing-standard` | `ease` | Finite state transitions |
| `easing.linear` | `--z-easing-linear` | `linear` | Continuous rotation or progress |
| `easing.decelerate` | `--z-easing-decelerate` | `cubic-bezier(0, 0, 0.2, 1)` | Content enter |
| `easing.accelerate` | `--z-easing-accelerate` | `cubic-bezier(0.4, 0, 1, 1)` | Content exit |

### 4.2 Semantic easing

| Token path | CSS variable | Maps to | Use |
| --- | --- | --- | --- |
| `motion.easing.interaction` | `--z-motion-easing-interaction` | `easing.standard` | Hover, pressed, checked, and border/color feedback |
| `motion.easing.enter` | `--z-motion-easing-enter` | `easing.decelerate` | Overlay and floating content open |
| `motion.easing.exit` | `--z-motion-easing-exit` | `easing.accelerate` | Overlay and floating content close |
| `motion.easing.continuous` | `--z-motion-easing-continuous` | `easing.linear` | Spinner and other looping indicators |

---

## 5. Naming conventions

### 5.1 Motion token path

```text
motion.{property}.{purpose}
```

| Segment | Purpose | Examples |
| --- | --- | --- |
| `motion` | Namespace for motion semantics | — |
| `property` | What is being animated over time | `duration`, `easing` |
| `purpose` | Why this timing exists | `interaction`, `layout`, `enter`, `exit`, `continuous` |

### 5.2 CSS variable mapping

| Semantic path | CSS variable |
| --- | --- |
| `motion.duration.interaction` | `--z-motion-duration-interaction` |
| `motion.duration.layout` | `--z-motion-duration-layout` |
| `motion.duration.enter` | `--z-motion-duration-enter` |
| `motion.duration.exit` | `--z-motion-duration-exit` |
| `motion.duration.continuous` | `--z-motion-duration-continuous` |
| `motion.easing.interaction` | `--z-motion-easing-interaction` |
| `motion.easing.enter` | `--z-motion-easing-enter` |
| `motion.easing.exit` | `--z-motion-easing-exit` |
| `motion.easing.continuous` | `--z-motion-easing-continuous` |

---

## 6. Authoring guidance

### 6.1 Property selection

Animate only the properties required to communicate feedback:

| Property | Typical use |
| --- | --- |
| `background-color` | Button, tab, checkbox, and select trigger feedback |
| `border-color` | Input, switch, checkbox, and radio feedback |
| `color` | Text and icon color feedback |
| `opacity` | Overlay scrim fade and floating content enter/exit |
| `transform` | Switch thumb position, overlay slide, and dialog scale |

Do **not** animate `outline` or `box-shadow` in v1.

### 6.2 CSS examples

```css
/* Interaction feedback */
transition:
  background-color var(--z-motion-duration-interaction) var(--z-motion-easing-interaction),
  border-color var(--z-motion-duration-interaction) var(--z-motion-easing-interaction);

/* Overlay enter */
animation: z-dialog-content-in var(--z-motion-duration-enter) var(--z-motion-easing-enter);

/* Overlay exit */
animation: z-dialog-content-out var(--z-motion-duration-exit) var(--z-motion-easing-exit);

/* Continuous indicator */
animation: z-spinner-spin var(--z-motion-duration-continuous) var(--z-motion-easing-continuous)
  infinite;
```

### 6.3 Overlay choreography recipe

Use this pattern for Radix portal content that opens and closes.

1. Key animation off `data-state` on the animated element.
2. Use `motion.duration.enter` and `motion.easing.enter` for the open state.
3. Use `motion.duration.exit` and `motion.easing.exit` for the closed state.
4. For positioned floating content, key directional slide off `data-side`.
5. Add a component `@media (prefers-reduced-motion: reduce)` block that sets `animation: none`.

```css
.z-popover__content[data-side='bottom'][data-state='open'] {
  animation: z-popover-in-from-top var(--z-motion-duration-enter) var(--z-motion-easing-enter);
}

.z-popover__content[data-side='bottom'][data-state='closed'] {
  animation: z-popover-out-to-top var(--z-motion-duration-exit) var(--z-motion-easing-exit);
}

@media (prefers-reduced-motion: reduce) {
  .z-popover__content[data-state='open'],
  .z-popover__content[data-state='closed'] {
    animation: none;
  }
}
```

When content is centered with `transform: translate(-50%, -50%)`, include that transform in every keyframe step. If you omit it, the content jumps during animation.

### 6.4 Radix state attribute reference

| Component | Open state values | Closed state | Direction attribute | Exit animation |
| --- | --- | --- | --- | --- |
| Dialog, Drawer | `data-state='open'` | `data-state='closed'` | Drawer: `data-side` | Yes |
| Popover, Menu, Megamenu | `data-state='open'` | `data-state='closed'` | `data-side` | Yes |
| Tooltip | `data-state='delayed-open'`, `data-state='instant-open'` | `data-state='closed'` | `data-side` | Yes |
| Select | `data-state='open'` | — | — | No (enter only) |
| Accordion | `data-state='open'` | `data-state='closed'` | — | Yes |
| Toast | `data-state='open'` | `data-state='closed'` | — | Yes |

Radix Select does not keep content mounted long enough for a reliable exit animation. Use enter animation only.

Tooltip does not use `data-state='open'`. Match `delayed-open` and `instant-open` for the enter animation.

### 6.5 Reduced-motion decision tree

1. Does the component use only `transition` with `--z-motion-duration-interaction` or `--z-motion-duration-layout`?
   - Yes → Global token override is enough. Duration becomes `0ms`.
2. Does the component use `@keyframes` or `animation`?
   - Yes → Add a component `@media (prefers-reduced-motion: reduce)` block. Set `animation: none`. Provide a static fallback when needed.
3. Does the component use looping `animation` with `--z-motion-duration-continuous`?
   - Yes → Add a component `@media` block. Set `animation: none`. Show a static muted state.
4. Does the component drive motion from JavaScript?
   - Yes → Call `prefersReducedMotion()` from `@z-ui/react/shared`. Use instant behavior when it returns `true`.

Global token override:

```css
@media (prefers-reduced-motion: reduce) {
  :root {
    --z-motion-duration-interaction: var(--z-duration-0);
    --z-motion-duration-layout: var(--z-duration-0);
    --z-motion-duration-enter: var(--z-duration-0);
    --z-motion-duration-exit: var(--z-duration-0);
  }
}
```

Component responsibility for looping animation:

```css
@media (prefers-reduced-motion: reduce) {
  .z-spinner {
    animation: none;
    opacity: 0.7;
  }
}
```

---

## 7. Component adoption matrix

### 7.1 Adopted in v1

| Component | Motion behavior | Tokens | Reduced-motion fallback |
| --- | --- | --- | --- |
| Button | Hover, pressed, and disabled color feedback | `duration.interaction`, `easing.interaction` | Global interaction duration → `0ms` |
| IconButton | Same as Button | `duration.interaction`, `easing.interaction` | Global interaction duration → `0ms` |
| FloatingActionButton | Same as Button | `duration.interaction`, `easing.interaction` | Global interaction duration → `0ms` |
| TextField | Hover and focus border feedback | `duration.interaction`, `easing.interaction` | Global interaction duration → `0ms` |
| Textarea | Hover and focus border feedback | `duration.interaction`, `easing.interaction` | Global interaction duration → `0ms` |
| Checkbox | Checked and disabled color feedback | `duration.interaction`, `easing.interaction` | Global interaction duration → `0ms` |
| RadioGroup | Checked border and dot feedback | `duration.interaction`, `easing.interaction` | Global interaction duration → `0ms` |
| Switch | Track color and thumb slide | `duration.interaction`, `easing.interaction` | Global interaction duration → `0ms` |
| Select | Trigger hover and focus feedback; content enter only | `duration.interaction`, `easing.interaction`, `duration.enter`, `easing.enter` | Global token override plus component `@media` on content |
| Tabs | Active trigger background feedback | `duration.interaction`, `easing.interaction` | Global interaction duration → `0ms` |
| Accordion | Chevron rotation and content height | `duration.interaction`, `easing.interaction` | Component `@media (prefers-reduced-motion: reduce)` |
| Dialog | Overlay fade and content scale enter/exit | `duration.enter`, `easing.enter`, `duration.exit`, `easing.exit` | Component `@media (prefers-reduced-motion: reduce)` |
| Drawer | Overlay fade and panel slide | `duration.enter`, `easing.enter`, `duration.exit`, `easing.exit` | Component `@media (prefers-reduced-motion: reduce)` |
| Menu | Content fade and directional slide | `duration.enter`, `easing.enter`, `duration.exit`, `easing.exit` | Component `@media (prefers-reduced-motion: reduce)` |
| Megamenu | Same as Menu | `duration.enter`, `easing.enter`, `duration.exit`, `easing.exit` | Component `@media (prefers-reduced-motion: reduce)` |
| Popover | Content fade and directional slide | `duration.enter`, `easing.enter`, `duration.exit`, `easing.exit` | Component `@media (prefers-reduced-motion: reduce)` |
| Tooltip | Content fade and directional slide | `duration.enter`, `easing.enter`, `duration.exit`, `easing.exit` | Component `@media (prefers-reduced-motion: reduce)` |
| Toast | Slide-in and dismiss | `duration.interaction`, `easing.interaction` | Component `@media (prefers-reduced-motion: reduce)` |
| Carousel | Scroll position (JS `scrollTo`) | — | JS must use `behavior: 'auto'` when `prefers-reduced-motion: reduce` |
| Progress | Bar fill width | `duration.interaction`, `easing.interaction`, `duration.continuous`, `easing.continuous` | Component `@media (prefers-reduced-motion: reduce)` |
| RadialProgress | Arc stroke | `duration.interaction`, `easing.interaction`, `duration.continuous`, `easing.continuous` | Component `@media (prefers-reduced-motion: reduce)` |
| Spinner | Continuous rotation | `duration.continuous`, `easing.continuous` | Component `animation: none` fallback |
| Skeleton | Continuous shimmer | `duration.continuous`, `easing.continuous` | Component static muted fill fallback |
| ListItem | Hover background feedback | `duration.interaction`, `easing.interaction` | Component `@media (prefers-reduced-motion: reduce)` |

### 7.2 JS-driven motion

When motion is triggered from JavaScript (for example `element.scrollTo({ behavior: 'smooth' })`), the code **must** check `window.matchMedia('(prefers-reduced-motion: reduce)')` and fall back to instant behavior (`behavior: 'auto'` or no animation). SSR-safe guards are required.

### 7.3 Intentionally excluded in v1

| Component / area | Reason |
| --- | --- |
| Alert, Badge, Avatar, Field, Separator | Static display; motion would distract or delay comprehension |
| Link | Navigation affordance; instant color change is sufficient |
| Focus ring utility | Must appear immediately for accessibility |
| Select list items | Keyboard highlight must remain immediate |
| Validation states | Avoid shake, pulse, or attention-seeking error motion |

---

## 8. Import and override

Import alongside other token stylesheets:

```tsx
import '@z-ui/tokens/colors.css';
import '@z-ui/tokens/sizes.css';
import '@z-ui/tokens/text.css';
import '@z-ui/tokens/motion.css';
import '@z-ui/tokens/elevation.css';
```

Override at the application root or a scoped subtree:

```css
[data-theme='compact'] {
  --z-motion-duration-interaction: 120ms;
}
```

---

## 9. Figma parity

Use the same semantic names in Figma variables and CSS custom properties:

| Figma variable | CSS variable |
| --- | --- |
| `motion/duration/interaction` | `--z-motion-duration-interaction` |
| `motion/duration/layout` | `--z-motion-duration-layout` |
| `motion/duration/enter` | `--z-motion-duration-enter` |
| `motion/duration/exit` | `--z-motion-duration-exit` |
| `motion/duration/continuous` | `--z-motion-duration-continuous` |
| `motion/easing/interaction` | `--z-motion-easing-interaction` |
| `motion/easing/enter` | `--z-motion-easing-enter` |
| `motion/easing/exit` | `--z-motion-easing-exit` |
| `motion/easing/continuous` | `--z-motion-easing-continuous` |

Figma smart-animate or prototype transitions should reference the semantic enter duration for overlay open. Use the semantic exit duration for overlay close. Use the semantic interaction duration for control feedback. Use the semantic layout duration for rearrange and expand. Use the semantic continuous duration only for looping indicators.

---

## 10. Accessibility flags

Reduced motion is activated by `@media (prefers-reduced-motion: reduce)` or `data-motion="reduced"` on the document root. Both zero `--z-motion-duration-interaction`, `--z-motion-duration-layout`, `--z-motion-duration-enter`, and `--z-motion-duration-exit`. See [ACCESSIBILITY-SEMANTICS.md](./ACCESSIBILITY-SEMANTICS.md).

JS-driven motion must call `prefersReducedMotion()`, which reads `data-motion` before falling back to the media query.
