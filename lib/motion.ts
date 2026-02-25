/**
 * CanCAF Motion System
 *
 * A healthcare-appropriate animation system designed for:
 * - Professional, calm, trustworthy feel
 * - WCAG accessibility compliance
 * - Emotional sensitivity (healthcare context)
 *
 * Animation Psychology Principles:
 * - Fast motion = instability, anxiety
 * - Subtle motion = safety, trust
 * - Healthcare websites must feel calm and stable
 *
 * References: WHO, American Cancer Society, Cancer Research UK, St. Jude
 */

import { type Variants, type Transition } from 'motion/react'

// =============================================================================
// TIMING & EASING
// =============================================================================

/**
 * Soft, professional easing curves
 * - Avoid bounce, elastic, or aggressive easings
 * - Use gentle deceleration for a calm feel
 */
export const easing = {
  // Primary easing - gentle deceleration (most common)
  gentle: [0.22, 1, 0.36, 1] as const,

  // For elements entering the viewport
  enter: [0.0, 0.0, 0.2, 1] as const,

  // For elements leaving (rarely needed)
  exit: [0.4, 0.0, 1, 1] as const,

  // Linear for progress indicators only
  linear: [0, 0, 1, 1] as const,
} as const

/**
 * Duration presets
 * Healthcare UX: Keep animations under 600ms to avoid feeling sluggish
 * but above 200ms to feel intentional and calm
 */
export const duration = {
  // Micro-interactions (hover, focus)
  instant: 0.15,

  // Quick transitions (button states, toggles)
  fast: 0.2,

  // Standard transitions (most UI elements)
  normal: 0.35,

  // Content reveals (sections, modals)
  slow: 0.5,

  // Counter animations (numbers counting up)
  counter: 1.2,
} as const

// =============================================================================
// TRANSITION PRESETS
// =============================================================================

/**
 * Reusable transition configurations
 */
export const transitions = {
  // Default for most animations
  default: {
    duration: duration.normal,
    ease: easing.gentle,
  } satisfies Transition,

  // For scroll-triggered reveals
  reveal: {
    duration: duration.slow,
    ease: easing.enter,
  } satisfies Transition,

  // For micro-interactions (hover, focus)
  micro: {
    duration: duration.fast,
    ease: easing.gentle,
  } satisfies Transition,

  // For staggered children
  stagger: {
    staggerChildren: 0.08,
    delayChildren: 0.1,
  } satisfies Transition,
} as const

// =============================================================================
// ANIMATION VARIANTS
// =============================================================================

/**
 * Fade In - Simple opacity transition
 * Use for: Headlines, text content, UI elements
 */
export const fadeIn: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: transitions.default,
  },
}

/**
 * Fade Up - Gentle upward motion with fade
 * Use for: Section content, cards, important information
 * Movement: 15px (subtle, not distracting)
 */
export const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 15,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.reveal,
  },
}

/**
 * Fade Down - For elements that should feel grounded
 * Use for: Dropdowns, notifications from top
 */
export const fadeDown: Variants = {
  hidden: {
    opacity: 0,
    y: -10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.default,
  },
}

/**
 * Scale Fade - Subtle scale with fade
 * Use for: Modals, dialogs, focused content
 * Scale: 0.98 (barely perceptible, but adds depth)
 */
export const scaleFade: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: transitions.default,
  },
}

/**
 * Stagger Container - For animating lists of items
 * Use for: Card grids, feature lists, navigation items
 */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

/**
 * Stagger Item - Child items in stagger container
 */
export const staggerItem: Variants = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.default,
  },
}

// =============================================================================
// SCROLL-TRIGGERED ANIMATION PROPS
// =============================================================================

/**
 * Props for scroll-triggered animations
 * Use with motion.div for section reveals
 */
export const scrollRevealProps = {
  initial: 'hidden',
  whileInView: 'visible',
  viewport: {
    once: true,
    margin: '-50px',  // Trigger slightly before element enters
  },
} as const

/**
 * Combined scroll reveal with fadeUp variant
 * Most common pattern for section content
 */
export const scrollFadeUp = {
  ...scrollRevealProps,
  variants: fadeUp,
} as const

// =============================================================================
// HOVER & INTERACTION STATES
// =============================================================================

/**
 * Button hover - Subtle lift effect
 * Max 3px lift to avoid feeling "jumpy"
 */
export const buttonHover = {
  y: -2,
  transition: transitions.micro,
} as const

/**
 * Card hover - Gentle elevation
 * Use for: Clickable cards, interactive panels
 */
export const cardHover = {
  y: -4,
  transition: transitions.micro,
} as const

/**
 * Link hover - Very subtle scale
 * Use for: Text links, nav items
 */
export const linkHover = {
  scale: 1.02,
  transition: transitions.micro,
} as const

// =============================================================================
// REDUCED MOTION UTILITIES
// =============================================================================

/**
 * Check if user prefers reduced motion
 * Use in useEffect or during SSR-safe checks
 */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Variants that respect reduced motion preference
 * Falls back to simple opacity fade
 */
export const accessibleFadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: prefersReducedMotion() ? 0 : 15,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: prefersReducedMotion() ? duration.fast : duration.slow,
      ease: easing.gentle,
    },
  },
}

/**
 * Create reduced-motion safe variants
 * Strips out transforms, keeps opacity
 */
export function createAccessibleVariant(variants: Variants): Variants {
  if (prefersReducedMotion()) {
    return {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { duration: duration.fast },
      },
    }
  }
  return variants
}

// =============================================================================
// COUNTER ANIMATION UTILITIES
// =============================================================================

/**
 * Easing function for number counters
 * Gentle deceleration - starts fast, slows down naturally
 */
export function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - t, 4)
}

/**
 * Configuration for animated counters
 */
export const counterConfig = {
  duration: duration.counter,
  easing: easeOutQuart,
} as const

// =============================================================================
// CSS TRANSITION CLASSES
// =============================================================================

/**
 * Tailwind-compatible transition classes
 * Use these for simple CSS-based animations (preferred for micro-interactions)
 */
export const transitionClasses = {
  // Default transition for interactive elements
  base: 'transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',

  // Fast micro-interactions
  fast: 'transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]',

  // Opacity only (for fade effects)
  opacity: 'transition-opacity duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',

  // Transform only (for movement)
  transform: 'transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',

  // Colors only (for hover states)
  colors: 'transition-colors duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]',

  // Shadow transitions (for elevation)
  shadow: 'transition-shadow duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
} as const

// =============================================================================
// MOTION COMPONENT PRESETS
// =============================================================================

/**
 * Pre-configured motion props for common patterns
 * Import and spread onto motion components
 */
export const motionPresets = {
  // Hero section text
  heroText: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: duration.slow, ease: easing.gentle },
  },

  // Section headers
  sectionHeader: {
    ...scrollRevealProps,
    variants: fadeUp,
  },

  // Content cards
  card: {
    ...scrollRevealProps,
    variants: fadeUp,
    whileHover: cardHover,
  },

  // Interactive buttons
  button: {
    whileHover: buttonHover,
    whileTap: { scale: 0.98 },
    transition: transitions.micro,
  },

  // Stats/numbers
  stat: {
    ...scrollRevealProps,
    variants: scaleFade,
  },
} as const

// =============================================================================
// TYPE EXPORTS
// =============================================================================

export type EasingType = keyof typeof easing
export type DurationType = keyof typeof duration
export type TransitionType = keyof typeof transitions
