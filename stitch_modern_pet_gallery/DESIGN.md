# Design System Strategy: The Warm Curator

## 1. Overview & Creative North Star
This design system is built upon the **"Warm Curator"** North Star. We are moving away from the "generic tech" aesthetic of cold, rigid grids and sterile borders. Instead, we are leaning into an editorial, high-end gallery experience that feels as much like a boutique physical space as it does a digital interface.

The design breaks the "template" look through **Tonal Layering** and **Intentional Asymmetry**. Rather than centering everything perfectly, we use staggered image placements and overlapping typography to create a sense of movement. This system prioritizes breathing room (white space) and soft transitions to convey professionalism through restraint.

## 2. Colors: The Tonal Landscape
Our palette is rooted in organic, earthy neutrals to ensure the pet photography remains the hero. 

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders for sectioning. Structural boundaries must be defined solely through background color shifts. For example, a `surface-container-low` section should sit on a `surface` background to create a "well." Traditional dividers are replaced by 32px-48px of vertical white space.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers—like stacked sheets of fine, heavy-weight paper.
- **Base Layer:** `surface` (#faf9f7) for the main application background.
- **Sectioning:** Use `surface-container` (#efeeec) to grouping related content.
- **The "Lift":** Use `surface-container-lowest` (#ffffff) for primary interactive cards. This creates a soft, natural lift against the warmer background without requiring heavy shadows.

### The "Glass & Gradient" Rule
To add "soul" to the interface, main Call-to-Action (CTA) elements should utilize a subtle linear gradient from `primary` (#a43700) to `primary-container` (#c94c13) at a 135-degree angle. For floating navigation or overlays, use a Glassmorphism effect: a semi-transparent `surface` color with a `backdrop-blur` of 12px-16px.

## 3. Typography: Editorial Authority
The typography system pairs the high-character **Plus Jakarta Sans** for expressive moments with the functional clarity of **Inter**.

- **Display & Headlines (Plus Jakarta Sans):** These are the "voice" of the brand. Use `display-md` for landing moments with a slight negative letter-spacing (-0.02em) to create a premium, tight editorial feel.
- **Titles & Body (Inter):** Reserved for information architecture. The `title-lg` should be used for pet names and gallery categories, providing a grounded contrast to the airy headlines.
- **Hierarchy through Scale:** We distinguish importance not by bolding every header, but by significant jumps in scale. A `headline-lg` next to a `body-md` creates a sophisticated, asymmetrical tension that feels more "designed" than a standard list.

## 4. Elevation & Depth
We reject the heavy, muddy shadows of the early web. Depth in this system is achieved through **Tonal Stacking**.

- **The Layering Principle:** Place a `surface-container-lowest` card on a `surface-container-low` section. The subtle contrast in hex values provides all the "depth" required for the eye to perceive a change in plane.
- **Ambient Shadows:** When a card must "float" (e.g., a modal or an active state), use an extra-diffused shadow: `0 12px 32px rgba(140, 113, 104, 0.08)`. Note the use of a tinted shadow color derived from `outline` to mimic natural ambient light.
- **The "Ghost Border" Fallback:** If accessibility requirements demand a stroke, use the `outline-variant` token at **15% opacity**. Never use a 100% opaque border.
- **Glassmorphism:** Apply to top navigation bars. Use a 70% opacity `surface` fill with a `backdrop-filter: blur(20px)`. This allows the vibrant colors of the pet photography to bleed through the UI, softening the layout.

## 5. Components

### Buttons
- **Primary:** Gradient fill (`primary` to `primary-container`), 8px (`md`) radius, `on-primary` text. No border.
- **Secondary:** `surface-container-high` fill with `primary` text. This feels "embedded" rather than "pasted on."
- **Tertiary:** Pure text with an underline that appears only on hover, using the `primary` color.

### Input Fields
- Avoid the "box" look. Use a `surface-container-low` fill with a `surface-container-highest` bottom-only stroke (2px). When focused, the stroke transitions to `primary` via a soft 200ms ease.

### Gallery Cards
- **Construction:** Use `surface-container-lowest` (#ffffff) with a 16px (`xl`) radius. 
- **Content:** Images should have a 12px (`lg`) internal radius, creating a "nested frame" effect. 
- **Interaction:** On hover, the card should not lift with a shadow; instead, the image should subtly scale (1.02x) while the background shifts to `surface-bright`.

### Chips & Filters
- Use `full` (pill) roundness. Active filters use `secondary-container` with `on-secondary-container` text. Inactive filters use a simple `surface-container-high` fill.

### Contextual Components: "The Memory Strip"
- For the pet gallery context, implement a "Filmstrip" component at the bottom of full-screen views. This should use the Glassmorphism rule (blurred `surface`) to float over the image, using `surface-container-highest` to highlight the "current" frame.

## 6. Do’s and Don’ts

### Do:
- **Do** use asymmetrical margins. A gallery grid where some images span two columns while others span one creates an "Art Director" feel.
- **Do** use `tertiary` (#00628c) for informational cues or "Success" states to provide a cooling contrast to the warm orange `primary`.
- **Do** prioritize large-scale imagery. The UI exists to support the photography, not compete with it.

### Don’t:
- **Don’t** use pure black (#000000) for text. Use `on-surface` (#1a1c1b) to maintain the warmth of the palette.
- **Don’t** use dividers or lines to separate list items. Use 16px of vertical padding and a background color change on hover.
- **Don’t** use "Standard" 40px buttons for everything. Use height variations (32px for chips, 48px for primary actions) to define a clear visual hierarchy.