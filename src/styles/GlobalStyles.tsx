import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap');

  :root {
    /* Warm Curator Design Tokens */
    --color-surface: ${props => props.theme.colors.surface};
    --color-container: ${props => props.theme.colors.container};
    --color-lowest: ${props => props.theme.colors.lowest};
    --color-primary: ${props => props.theme.colors.primary};
    --color-primary-container: ${props => props.theme.colors.primaryContainer};
    --color-on-surface: ${props => props.theme.colors.onSurface};
    --color-on-surface-variant: ${props => props.theme.colors.onSurfaceVariant};
    --color-outline: ${props => props.theme.colors.outline};
    --color-border: ${props => props.theme.colors.border};
    
    --text: var(--color-on-surface-variant);
    --text-h: var(--color-on-surface);
    --bg: var(--color-surface);
    --accent: var(--color-primary);
    
    --sans: ${props => props.theme.typography.sans};
    --heading: ${props => props.theme.typography.heading};
    --mono: ui-monospace, Consolas, monospace;

    font: 16px/1.5 var(--sans);
    letter-spacing: -0.01em;
    color-scheme: light;
    color: var(--text);
    background: var(--bg);
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    margin: 0;
    min-height: 100vh;
  }

  #root {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  h1, h2, h3, h4 {
    font-family: var(--heading);
    font-weight: 700;
    color: var(--text-h);
    margin: 0;
  }

  a {
    text-decoration: none;
    color: inherit;
    transition: color 0.2s ease;
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
    font-family: inherit;
  }

  * {
    box-sizing: border-box;
  }

  /* Custom Checkbox Reset */
  input[type="checkbox"] {
    accent-color: var(--color-primary);
  }
`;
