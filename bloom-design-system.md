_bloom_

DESIGN SYSTEM & MASTERPLAN

_An ambient, organic UI component library_

Soft shapes. Breathing motion. Living color.

Version 1.0 • April 2026

01

# **Vision & Philosophy**

Bloom is an ambient, organic UI library built on the premise that digital interfaces should feel alive. Where most component libraries aim for mechanical precision and clinical neutrality, Bloom draws inspiration from the natural world: the gentle rhythm of breathing, the soft curves of river stones, the warm tones of earth and moss.

Bloom is not a general-purpose component library. It is a deeply opinionated design system for applications that prioritize calm, warmth, and presence-wellness platforms, creative tools, journaling apps, meditation software, ambient dashboards, and any product where the interface should feel like a companion rather than a machine.

## Core Principles

**Alive, not animated.** Every motion in Bloom serves a purpose: to make the interface feel present. Components breathe with gentle scale oscillations and soft opacity shifts. Nothing demands attention-everything gently invites it.

**Organic geometry.** Sharp corners, hard grids, and rigid lines are replaced with generous radii, fluid shapes, and soft blob backgrounds. The design language feels grown, not manufactured.

**Earthy warmth.** The palette is rooted in nature: sage greens, sandstone golds, dried lavender purples, and terracotta roses. Even in dark mode, the tones stay warm-never cold or clinical.

**Respectful motion.** Transitions are slow and eased (0.5s minimum, cubic-bezier(0.4, 0, 0.2, 1)). Nothing snaps. Nothing jolts. The interface flows like water.

**Depth through atmosphere.** Rather than drop shadows and elevation, Bloom creates depth with blurred background blobs, layered translucency, and gradient shimmer. Surfaces feel like they exist in a softly lit room.

02

# **Color System**

Bloom's palette is drawn from four natural materials-moss, sandstone, lavender, and clay-each expressed in a light and deep variant. The system also defines three neutral surfaces and two text tones. Every color has been tuned to work in both light and dark mode while maintaining the warm, organic character.

## Primary Palette

| **Sage**<br><br>#B8D4C8 | **Sage Deep**<br><br>#6B9E8A | **Sand**<br><br>#E8C4A0 | **Sand Deep**<br><br>#C49460 |
| ----------------------- | ---------------------------- | ----------------------- | ---------------------------- |

| **Lavender**<br><br>#C4B5D4 | **Lavender Deep**<br><br>#8E72A8 | **Rose**<br><br>#D4A0A0 | **Rose Deep**<br><br>#A06060 |
| --------------------------- | -------------------------------- | ----------------------- | ---------------------------- |

## Neutrals & Surfaces

| **Background**<br><br>#FDFBF7 | **Surface**<br><br>#F7F3EC | **Surface Alt**<br><br>#F0EBE1 | **Text**<br><br>#2C2A25 |
| ----------------------------- | -------------------------- | ------------------------------ | ----------------------- |

## Dark Mode Palette

Dark mode inverts to deep warm tones. Backgrounds shift to charcoal-brown, surfaces to warm gray, and accent colors deepen to rich jewel tones. Text shifts to warm cream. The emotional warmth is preserved.

| **DM Background**<br><br>#1A1917 | **DM Surface**<br><br>#242320 | **DM Surface Alt**<br><br>#2E2D29 | **DM Text**<br><br>#E8E4DB |
| -------------------------------- | ----------------------------- | --------------------------------- | -------------------------- |

## Color Tokens

| **Token**               | **Value** | **Usage**                       |
| ----------------------- | --------- | ------------------------------- |
| \--bloom-bg             | #FDFBF7   | Page background                 |
| \--bloom-surface        | #F7F3EC   | Card, input background          |
| \--bloom-surface2       | #F0EBE1   | Borders, dividers, hover states |
| \--bloom-text           | #2C2A25   | Primary text, headings          |
| \--bloom-text-secondary | #7A756B   | Labels, descriptions, captions  |
| \--bloom-accent1        | #B8D4C8   | Sage - primary actions, success |
| \--bloom-accent1-deep   | #6B9E8A   | Sage deep - hover, focus rings  |
| \--bloom-accent2        | #E8C4A0   | Sand - warnings, pending states |
| \--bloom-accent2-deep   | #C49460   | Sand deep - active warnings     |
| \--bloom-accent3        | #C4B5D4   | Lavender - secondary actions    |
| \--bloom-accent3-deep   | #8E72A8   | Lavender deep - hover, active   |
| \--bloom-accent4        | #D4A0A0   | Rose - destructive, archived    |
| \--bloom-accent4-deep   | #A06060   | Rose deep - danger hover        |

03

# **Typography**

Bloom pairs a serif display font with a clean sans-serif body font. The display face adds organic character to headings and hero text; the body face ensures readability at all sizes. The system uses only two weights (300 and 500) to maintain softness-never bold or heavy.

## Type Scale

| **Name**   | **Font / Weight** | **Size / Line Height** | **Usage**                |
| ---------- | ----------------- | ---------------------- | ------------------------ |
| Display XL | Fraunces 300      | 42px / 1.1             | Hero headlines           |
| Display    | Fraunces 500      | 32px / 1.2             | Section headings         |
| Heading    | Fraunces 500      | 24px / 1.3             | Card titles, subsections |
| Subheading | DM Sans 500       | 18px / 1.4             | Widget titles, labels    |
| Body       | DM Sans 400       | 15px / 1.6             | Paragraphs, descriptions |
| Caption    | DM Sans 400       | 13px / 1.5             | Metadata, timestamps     |
| Micro      | DM Sans 500       | 11px / 1.4             | Badges, tags, overlines  |

## Typography Tokens

| **Token**             | **Value**             | **Usage**                        |
| --------------------- | --------------------- | -------------------------------- |
| \--bloom-font         | 'DM Sans', sans-serif | Body text, inputs, buttons       |
| \--bloom-font-display | 'Fraunces', serif     | Headings, hero text, card titles |
| \--bloom-letter-wide  | 0.12em                | Section labels, micro text       |
| \--bloom-letter-tight | \-0.02em              | Display headlines                |

04

# **Spacing & Layout**

Bloom uses a base-4 spacing scale that produces generous, airy layouts. The system avoids tight packing-whitespace is a design feature, not wasted space. Components breathe by default.

## Spacing Scale

| **Token**    | **Value** | **Usage**                         |
| ------------ | --------- | --------------------------------- |
| \--space-xs  | 4px       | Icon gaps, badge padding vertical |
| \--space-sm  | 8px       | Inline gaps, compact card padding |
| \--space-md  | 12px      | Form gaps, grid gutters           |
| \--space-lg  | 16px      | Card padding, section gaps        |
| \--space-xl  | 24px      | Card body padding, group spacing  |
| \--space-2xl | 32px      | Section dividers, hero padding    |
| \--space-3xl | 48px      | Page section spacing              |
| \--space-4xl | 64px      | Hero top/bottom padding           |

## Border Radius

Generous rounding is fundamental to Bloom's organic feel. No component uses sharp corners.

| **Token**            | **Value** | **Usage**                |
| -------------------- | --------- | ------------------------ |
| \--bloom-radius-sm   | 12px      | Badges, small inputs     |
| \--bloom-radius      | 16px      | Inputs, alerts, tooltips |
| \--bloom-radius-lg   | 24px      | Cards, modals, dropdowns |
| \--bloom-radius-pill | 999px     | Buttons, toggles, pills  |

## Elevation & Depth

Bloom avoids traditional box shadows. Instead, depth is created through atmospheric effects: blurred background blobs, layered opacity, and gradient shimmer. Two subtle shadows exist for interactive feedback only.

| **Token**             | **Value**                      | **Usage**                |
| --------------------- | ------------------------------ | ------------------------ |
| \--bloom-shadow       | 0 2px 24px rgba(44,42,37,0.06) | Resting state for cards  |
| \--bloom-shadow-hover | 0 8px 40px rgba(44,42,37,0.1)  | Hover state lift effect  |
| \--bloom-blur-blob    | blur(60px)                     | Background ambient blobs |
| \--bloom-blur-card    | blur(40px)                     | Card-level accent blobs  |

05

# **Motion System**

Motion is Bloom's signature. Every animation is designed to feel organic and respectful: slow transitions, eased curves, and breathing rhythms that create a sense of life without demanding attention. The system defines four motion categories.

## Motion Tokens

| **Token**              | **Value**                    | **Usage**                          |
| ---------------------- | ---------------------------- | ---------------------------------- |
| \--bloom-ease          | cubic-bezier(0.4, 0, 0.2, 1) | Default easing for all transitions |
| \--bloom-duration      | 500ms                        | Standard transition duration       |
| \--bloom-duration-slow | 800ms                        | Card hover, modal enter            |
| \--bloom-duration-fast | 300ms                        | Toggle, focus ring                 |

## Animation Primitives

**Breathe** - Gentle scale oscillation (1.0 → 1.08 → 1.0) with opacity fade (0.7 → 1.0 → 0.7). Duration: 5-8s. Used on avatars, badge dots, background blobs. Each instance uses a unique animation-delay so nothing pulses in sync.

**Float** - Vertical translation (-8px) with subtle scale (1.02). Duration: 6-7s. Used on badges, color swatches, and decorative elements to create a sense of weightlessness.

**Morph** - Fluid border-radius keyframe cycle between organic blob shapes. Duration: 10-15s. Used exclusively on background blobs to create the ambient atmosphere.

**Shimmer** - Background-position animation on gradient fills. Duration: 3s. Used on progress bars and loading states to add living texture.

## Reduced Motion

All Bloom animations must respect prefers-reduced-motion. When this media query matches, animations freeze at their 0% keyframe and transitions reduce to 0ms. The toggle component ("Ambient motion") provides an app-level override via a .bloom-reduced-motion class on the root.

06

# **Component Specifications**

Bloom ships with a focused set of 16 components, each designed to embody the library's ambient organic aesthetic. Every component supports light/dark mode, reduced motion, and keyboard navigation.

## Component Inventory

| **Component** | **Variants**                      | **Signature Details**                            |
| ------------- | --------------------------------- | ------------------------------------------------ |
| Button        | Primary, Secondary, Ghost, Accent | Pill shape, hover lift, gradient reveal on hover |
| Card          | Default, Interactive, Featured    | 24px radius, ambient blob, hover lift + border   |
| Input         | Text, Email, Password, Textarea   | 16px radius, sage focus ring, soft background    |
| Toggle        | Default                           | Pill track, circle thumb, spring animation       |
| Badge         | Sage, Sand, Lavender, Rose        | Pill shape, breathing dot, float animation       |
| Alert         | Info, Success, Warning, Error     | Left border accent, ambient blob, serif title    |
| Avatar        | Initials, Image                   | Circle, breathing pulse, overlap stacking        |
| Tooltip       | Top, Bottom, Left, Right          | 12px radius, soft enter animation                |
| Progress      | Bar, Circular                     | Gradient fill, shimmer animation                 |
| Slider        | Continuous, Stepped               | 6px track, 24px thumb, hover scale               |
| Modal         | Default, Drawer                   | 24px radius, backdrop blur, spring enter         |
| Dropdown      | Select, Multi-select              | 16px radius, staggered item enter                |
| Tabs          | Default, Pill                     | Animated indicator, morph transition             |
| Date Picker   | Single, Range                     | Calendar grid, hover blob, sage selection        |
| Toast         | Info, Success, Warning, Error     | Float entrance, auto-dismiss with progress       |
| Skeleton      | Text, Card, Avatar, Custom        | Breathing shimmer, organic edge shapes           |

## Anatomy: Button

The Button is Bloom's most distinctive component. Its pill shape, gradient hover reveal, and subtle lift set the tone for the entire library.

| **Property**  | **Value**                 | **Notes**                        |
| ------------- | ------------------------- | -------------------------------- |
| Height        | 44px                      | All variants                     |
| Padding       | 12px 28px                 | Horizontal generosity            |
| Border Radius | 999px (pill)              | Signature organic shape          |
| Font          | DM Sans 400, 14px         | Never bold-soft labels           |
| Transition    | all 500ms ease            | Slow, intentional movement       |
| Hover         | translateY(-2px) + shadow | Gentle lift effect               |
| Active        | translateY(0) scale(0.98) | Soft press feedback              |
| Primary Hover | Gradient overlay reveal   | ::before with opacity transition |
| Focus         | 4px sage ring             | Accessible keyboard indicator    |

## Anatomy: Card

| **Property**    | **Value**                  | **Notes**               |
| --------------- | -------------------------- | ----------------------- |
| Padding         | 24px                       | Generous internal space |
| Border Radius   | 24px                       | Signature soft corners  |
| Background      | \--bloom-surface           | Warm off-white          |
| Border          | 1px solid transparent      | Appears on hover        |
| Hover Border    | 1px solid --bloom-surface2 | Subtle definition       |
| Hover Transform | translateY(-4px)           | Gentle lift             |
| Hover Shadow    | \--bloom-shadow-hover      | Atmospheric depth       |
| Blob            | 100px circle, blur(40px)   | Top-right accent glow   |
| Blob Animation  | breathe 8s infinite        | Unique delay per card   |
| Title Font      | Fraunces 500, 18px         | Serif character         |
| Body Font       | DM Sans 400, 13px          | Secondary color         |

07

# **Technical Architecture**

Bloom follows the shadcn model: copy-paste components that you own, not an npm dependency. This gives developers full control over the source while maintaining a consistent design language through shared tokens and conventions.

## Stack

- React 18+ with TypeScript
- Tailwind CSS 4 for utility classes
- CSS custom properties for all design tokens
- Framer Motion for physics-based animations
- Radix UI primitives for accessibility (headless)
- Class Variance Authority (CVA) for variant management

## File Structure

Each component is a self-contained directory with its implementation, variants, animations, and types:

bloom/ tokens/ colors.css typography.css spacing.css motion.css radius.css components/ button/ button.tsx button.variants.ts button.motion.ts index.ts card/ input/ toggle/ ... hooks/ use-reduced-motion.ts use-breathing.ts use-blob-position.ts utils/ cn.ts motion-presets.ts bloom.css

## CSS Token Layer

All design tokens live in a single CSS layer that auto-adapts to light/dark mode. Components reference these tokens exclusively-no hardcoded values. This means theming is as simple as overriding the custom properties.

The @layer bloom.tokens declaration ensures the token layer has the lowest specificity, making overrides trivial for consuming applications.

## Animation Architecture

Bloom's motion system uses a hybrid approach: CSS keyframe animations for ambient loops (breathe, float, morph) and Framer Motion springs for interactive transitions (hover, press, enter/exit). This keeps ambient motion GPU-accelerated while giving interactive motion the physics-based feel.

Every animated component exposes a motion prop that accepts "ambient" (default), "reduced", or "none". The useReducedMotion hook auto-detects the OS preference and applies it globally.

08

# **Accessibility**

Bloom's organic aesthetic does not compromise accessibility. Every component is built on Radix UI headless primitives, ensuring proper ARIA attributes, keyboard navigation, and focus management out of the box.

## Guidelines

- All interactive components have visible focus indicators (4px sage ring with 0.15 opacity spread)
- Color contrast meets WCAG 2.1 AA in both light and dark modes (verified with automated testing)
- Animations respect prefers-reduced-motion at both the OS and app level
- All components support full keyboard navigation (Tab, Enter, Space, Arrow keys, Escape)
- Screen reader announcements for dynamic content (toasts, modals, live regions)
- Touch targets are minimum 44px for mobile accessibility
- Color is never the sole indicator of state-icons, text, and shape changes accompany all status colors

09

# **Theming & Customization**

While Bloom ships with its signature warm organic palette, the entire system is themeable through CSS custom property overrides. Developers can create custom themes by redefining the token layer.

## Theme Presets

**Bloom Default** - The signature warm organic palette described in this document. Sage, sand, lavender, rose on a warm off-white background.

**Midnight Garden** - A dark-first theme with deep forest greens, midnight blues, and moonlit silvers. For apps that live in dark mode.

**Desert Rose** - Terracotta, ochre, and dried sage on a sandy warm background. For a southwestern, earthy feel.

**Ocean Mist** - Cool aquas, seafoam greens, and pearl whites. The cool-toned counterpart to the default warm palette.

## Creating Custom Themes

A Bloom theme is a CSS file that overrides the token custom properties. The minimum viable theme requires overriding the 4 accent colors, 3 surfaces, and 2 text colors. Motion, spacing, and typography tokens can optionally be adjusted for more dramatic theme changes.

10

# **Masterplan & Roadmap**

Bloom's development follows a phased approach, starting with a solid token foundation and expanding through components, tooling, and ecosystem.

## Phase 1: Foundation (Weeks 1-4)

- Define and finalize all design tokens (colors, spacing, typography, motion, radius)
- Build the CSS token layer with light/dark mode auto-switching
- Create the project scaffold (monorepo, Turborepo, Storybook, testing)
- Implement the 4 animation primitives (breathe, float, morph, shimmer)
- Build useReducedMotion and useBreathing hooks
- Ship Button, Card, and Input as proof-of-concept components

## Phase 2: Core Components (Weeks 5-10)

- Build all 16 core components with full variant support
- Write comprehensive Storybook stories for every component and variant
- Achieve WCAG 2.1 AA compliance across all components
- Build the CLI tool for scaffolding (npx bloom-ui add button)
- Create the documentation site with live component playground
- Ship the default theme and 2 preset themes (Midnight Garden, Desert Rose)

## Phase 3: Ecosystem (Weeks 11-16)

- Launch the public documentation site (bloom-ui.dev)
- Build the Figma component library mirroring all React components
- Create VS Code snippets and IntelliSense support
- Ship 3 full application templates (dashboard, journal, meditation app)
- Build the theme creator tool (visual token editor that exports CSS)
- Community launch: GitHub, Discord, X/Twitter presence

## Phase 4: Growth (Ongoing)

- Community-contributed themes published to a theme registry
- Additional component packs (charts, data tables, rich text editor)
- Vue and Svelte adapter libraries
- Animation performance auditing and optimization tools
- Sponsored development for niche use cases (accessibility modes, RTL support)

11

# **Competitive Positioning**

Bloom occupies a unique position in the UI library landscape. Here is how it compares to existing solutions:

| **Library**  | **Model**        | **Aesthetic**       | **Bloom Differentiation**                                                                    |
| ------------ | ---------------- | ------------------- | -------------------------------------------------------------------------------------------- |
| shadcn/ui    | Copy-paste React | Neutral, minimal    | Bloom shares the ownership model but offers a strong aesthetic opinion instead of neutrality |
| Radix Themes | npm package      | Professional        | Bloom uses Radix primitives under the hood but wraps them in organic design language         |
| Chakra UI    | npm package      | Functional          | Bloom prioritizes emotional design over functional breadth                                   |
| Flux UI      | Livewire/Laravel | Polished, corporate | Different ecosystem entirely-Bloom targets React                                             |
| Mantine      | npm package      | Comprehensive       | Bloom is deliberately focused (16 components vs 100+)                                        |
| DaisyUI      | Tailwind plugin  | Themeable           | Bloom's animation system and organic geometry go far beyond theme swaps                      |

## Target Audience

- Wellness and meditation app developers
- Creative tool builders (journaling, mood tracking, habit apps)
- Portfolio and personal website creators seeking organic aesthetics
- Ambient dashboard designers (home automation, weather, music)
- Indie developers building products with strong emotional identity
- Design-forward startups wanting to differentiate from clinical SaaS aesthetics

12

# **Naming & Brand Identity**

**_Bloom_** evokes growth, opening, and organic life-the perfect metaphor for a UI library that breathes. The name is short, memorable, and visually distinctive.

## Brand Elements

- Name: Bloom (stylized lowercase in logo: bloom)
- Tagline: "Components that breathe."
- Logo: The word "bloom" in Fraunces italic, with the two o's rendered as soft blob shapes
- Package: @bloom-ui/react (npm scope)
- CLI: npx bloom-ui init / npx bloom-ui add \[component\]
- Documentation: bloom-ui.dev
- Repository: github.com/bloom-ui/bloom

• • •

_End of Bloom Design System v1.0_