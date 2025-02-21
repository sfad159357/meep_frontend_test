import { createTheme, ThemeOptions } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';

const getDesignTokens = (mode: PaletteMode): ThemeOptions => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // Light mode
          primary: {
            main: '#0ea5e9',
            light: '#38bdf8',
            dark: '#0369a1',
          },
          secondary: {
            main: '#64748b',
            light: '#94a3b8',
            dark: '#475569',
          },
          background: {
            default: '#f8fafc',
            paper: '#ffffff',
          },
          text: {
            primary: '#1e293b',
            secondary: '#475569',
          },
        }
      : {
          // Dark mode
          primary: {
            main: '#38bdf8',
            light: '#7dd3fc',
            dark: '#0284c7',
          },
          secondary: {
            main: '#94a3b8',
            light: '#cbd5e1',
            dark: '#64748b',
          },
          background: {
            default: '#0f172a',
            paper: '#1e293b',
          },
          text: {
            primary: '#f8fafc',
            secondary: '#cbd5e1',
          },
        }),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '0.5rem',
        },
      },
    },
  },
});

export const getTheme = (mode: PaletteMode) => createTheme(getDesignTokens(mode)); 