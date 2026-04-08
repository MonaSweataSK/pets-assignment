import 'styled-components';

export const theme = {
  colors: {
    surface: '#faf9f7',
    container: '#efeeec',
    lowest: '#ffffff',
    primary: '#a43700',
    primaryContainer: '#c94c13',
    onSurface: '#1a1c1b',
    onSurfaceVariant: '#594139',
    outline: '#8c7168',
    border: '#e0bfb4',
  },
  typography: {
    heading: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
    sans: "'Inter', system-ui, -apple-system, sans-serif",
  },
  shadows: {
    soft: '0 8px 16px rgba(140, 113, 104, 0.04)',
    medium: '0 12px 24px rgba(140, 113, 104, 0.08)',
    elevated: '0 20px 48px rgba(140, 113, 104, 0.12)',
  },
  radius: {
    lg: '24px',
    md: '12px',
    sm: '8px',
  }
};

export type ThemeType = typeof theme;

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}
