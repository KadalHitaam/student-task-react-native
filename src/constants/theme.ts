/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://unistyl.es/), etc.
 */

import '@/global.css';

import { Platform } from 'react-native';

export const DevFlowPalette = {
  background: '#EAE4D3',
  paper: '#F5F2E6',
  completedPaper: '#F0EDDF',
  wash: '#E3DAC9',
  ink: '#332E28',
  secondary: '#7A7061',
  bronze: '#A98543',
  green: '#5C874A',
  purple: '#6A4C73',
  crimson: '#8E353C',
  border: '#D4CBB6',
} as const;

export const Colors = {
  light: {
    text: DevFlowPalette.ink,
    background: DevFlowPalette.background,
    backgroundElement: DevFlowPalette.paper,
    backgroundSelected: DevFlowPalette.wash,
    textSecondary: DevFlowPalette.secondary,
  },
  dark: {
    text: DevFlowPalette.ink,
    background: DevFlowPalette.background,
    backgroundElement: DevFlowPalette.paper,
    backgroundSelected: DevFlowPalette.wash,
    textSecondary: DevFlowPalette.secondary,
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
