// EGO Brand Color Palette - Dark Modern Design (Based on UI Images)
export const COLORS = {
  // Primary Brand Gradients (From EGO Specifications)
  CELESTIAL: ['#C33764', '#1D2671'],
  PURPLE_LAKE: ['#662D8C', '#ED1E79'],
  SWEET_MORNING: ['#FF5F6D', '#FFC371'],
  BLOODY_MARY: ['#FF512F', '#DD2476'],
  OCEAN_BLUE: ['#2E3192', '#1BFFFF'],
  QUEPAL: ['#11998E', '#38EF7D'],
  TOXIC: ['#BFF098', '#6FD6FF'],
  ANTARCTICA: ['#D8B5FF', '#1EAE98'],

  // New Design System Colors (From UI Images)
  PRIMARY_YELLOW: '#FFD700',
  PRIMARY_PURPLE: '#8B5CF6',
  PURE_BLACK: '#000000',
  DARK_CARD: '#1A1A1A',
  DARK_GRAY: '#2A2A2A',

  // Instagram-like Color System
  PRIMARY: '#FFD700', // Changed to yellow
  SECONDARY: '#8B5CF6', // Changed to purple
  ACCENT: '#ED1E79',
  SUCCESS: '#38EF7D',
  WARNING: '#FFC371',
  ERROR: '#FF512F',
  INFO: '#1BFFFF',

  // Neutral Colors
  WHITE: '#FFFFFF',
  BLACK: '#000000',
  GRAY_50: '#FAFAFA',
  GRAY_100: '#F5F5F5',
  GRAY_200: '#EEEEEE',
  GRAY_300: '#E0E0E0',
  GRAY_400: '#BDBDBD',
  GRAY_500: '#9E9E9E',
  GRAY_600: '#757575',
  GRAY_700: '#616161',
  GRAY_800: '#424242',
  GRAY_900: '#212121',

  // Transparent Overlays
  OVERLAY_LIGHT: 'rgba(255, 255, 255, 0.9)',
  OVERLAY_DARK: 'rgba(0, 0, 0, 0.7)',
  OVERLAY_PRIMARY: 'rgba(255, 215, 0, 0.1)',
  OVERLAY_SECONDARY: 'rgba(139, 92, 246, 0.1)',

  // Card and Surface Colors
  CARD_BACKGROUND: 'rgba(26, 26, 26, 0.95)',
  CARD_BORDER: 'rgba(255, 215, 0, 0.2)',
  SURFACE_LIGHT: '#FAFAFA',
  SURFACE_DARK: '#000000',

  // Text Colors
  TEXT_PRIMARY: '#FFFFFF',
  TEXT_SECONDARY: 'rgba(255,255,255,0.7)',
  TEXT_INVERSE: '#FFFFFF',
  TEXT_MUTED: 'rgba(255,255,255,0.5)',
  TEXT_LINK: '#8B5CF6',
  TEXT_YELLOW: '#FFD700',

  // Button States
  BUTTON_ACTIVE: '#FFD700',
  BUTTON_DISABLED: '#424242',
  BUTTON_PRESSED: '#FFC700',

  // Status Colors
  STATUS_ONLINE: '#38EF7D',
  STATUS_OFFLINE: '#9E9E9E',
  STATUS_AWAY: '#FFC371',
  STATUS_BUSY: '#FF512F',
};

// Gradient Presets for Easy Use
export const GRADIENTS = {
  // Spec Gradients (14 total from egospecs.md)
  CELESTIAL: ['#C33764', '#1D2671'],
  NO_MANS: ['#A9F1DF', '#FFBBBB'],
  ORBIT: ['#4E65FF', '#92EFFD'],
  TOXIC: ['#BFF098', '#6FD6FF'],
  ANTARCTICA: ['#D8B5FF', '#1EAE98'],
  CACTUS: ['#C6EA8D', '#FE90AF'],
  QUEPAL: ['#11998E', '#38EF7D'],
  SWEET_MORNING: ['#FF5F6D', '#FFC371'],
  BLOODY_MARY: ['#FF512F', '#DD2476'],
  KASHMIR: ['#614385', '#516395'],
  PURPLE_LAKE: ['#662D8C', '#ED1E79'],
  LUSCIOUS_LIME: ['#009245', '#FCEE21'],
  SANGUINE: ['#D41454', '#FBB03B'],
  OCEAN_BLUE: ['#2E3192', '#1BFFFF'],

  // Shorthand mappings for ease of use
  PRIMARY: ['#C33764', '#1D2671'], // CELESTIAL
  SECONDARY: ['#662D8C', '#ED1E79'], // PURPLE_LAKE
  ACCENT: ['#FF5F6D', '#FFC371'], // SWEET_MORNING
  ACTION: ['#FF512F', '#DD2476'], // BLOODY_MARY
  COOL: ['#2E3192', '#1BFFFF'], // OCEAN_BLUE
  SUCCESS: ['#11998E', '#38EF7D'], // QUEPAL
  INFO: ['#BFF098', '#6FD6FF'], // TOXIC
  PREMIUM: ['#D8B5FF', '#1EAE98'], // ANTARCTICA

  // New Design System Gradients (Yellow/Purple brand)
  YELLOW: ['#FFD700', '#FFA500'],
  PURPLE: ['#8B5CF6', '#7C3AED'],
  PURPLE_BORDER: ['#A78BFA', '#8B5CF6'],

  // Instagram Story-like Gradients
  STORY_1: ['#FF6B6B', '#FFE66D'],
  STORY_2: ['#A8E6CF', '#88D8C0'],
  STORY_3: ['#FFB74D', '#FF8A65'],
  STORY_4: ['#81C784', '#66BB6A'],
};

// Typography Scale - Comic Sans as per specs
export const TYPOGRAPHY = {
  FONT_FAMILY: 'Comic Sans MS', // Primary font as per specs
  FONT_FAMILY_FALLBACK: 'Chalkboard SE', // iOS fallback
  FONT_FAMILY_ANDROID: 'casual', // Android fallback

  // Font sizes as per specs: H1: 16px, H2: 14px, P: 12px
  FONT_SIZE_XS: 10,
  FONT_SIZE_SM: 12,  // Paragraph size
  FONT_SIZE_BASE: 12, // Paragraph size (specs)
  FONT_SIZE_LG: 14,   // H2 size (specs)
  FONT_SIZE_XL: 16,   // H1 size (specs)
  FONT_SIZE_2XL: 18,
  FONT_SIZE_3XL: 20,
  FONT_SIZE_4XL: 24,
  FONT_SIZE_5XL: 28,
  FONT_SIZE_6XL: 32,

  FONT_WEIGHT_LIGHT: '300',
  FONT_WEIGHT_NORMAL: '400',
  FONT_WEIGHT_MEDIUM: '500',
  FONT_WEIGHT_SEMIBOLD: '600',
  FONT_WEIGHT_BOLD: '700',
  FONT_WEIGHT_EXTRABOLD: '800',

  LINE_HEIGHT_TIGHT: 1.2,
  LINE_HEIGHT_NORMAL: 1.5,
  LINE_HEIGHT_RELAXED: 1.75,
};

// Spacing Scale
export const SPACING = {
  XS: 4,
  SM: 8,
  MD: 16,
  LG: 24,
  XL: 32,
  XXL: 48,
  XXXL: 64,
};

// Border Radius Scale
export const RADIUS = {
  XS: 4,
  SM: 8,
  MD: 12,
  LG: 16,
  XL: 24,
  FULL: 999,
};

// Shadow Presets
export const SHADOWS = {
  SMALL: {
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  MEDIUM: {
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  LARGE: {
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  PREMIUM: {
    shadowColor: COLORS.PRIMARY,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
};

// Animation Durations
export const ANIMATIONS = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
  VERY_SLOW: 1000,
};

export default {
  COLORS,
  GRADIENTS,
  TYPOGRAPHY,
  SPACING,
  RADIUS,
  SHADOWS,
  ANIMATIONS,
}; 