export const SCROLL_CONFIG = {
  speed: 0.7,
  smooth: 30,
  momentumFactor: 0.85,
  minDelta: 0.5,
  touchSensitivity: 2.6,
} as const;

export const ANIMATION_CONFIG = {
  textRevealDelay: 50,
  shrinkJumpDelay: 50,
  scrollThrottle: 100,
  magneticStrength: 0.3,
  magneticScale: 1.1,
} as const;

export const STORY_CONFIG = {
  scaleRate: 0.0005,
  scaleMin: 0.2,
  scaleMax: 1,
  rotateRate: 0.05,
  scrollThresholds: [100, 70, 50],
} as const;

export const INTRODUCTION_CONFIG = {
  minScroll: 20,
  maxSpacing: 100,
  minSpacing: 0,
  footerThreshold: 20,
} as const;

export const CURSOR_CONFIG = {
  trailSmoothing: 0.15,
  hoverDetectionSelector: "a, button, [role='button']",
} as const;

export const PROJECT_CONFIG = {
  portraitScrollMultiplier: 1.8,
  landscapeScrollMultiplier: 1,
} as const;
