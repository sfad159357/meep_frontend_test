import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { getTheme } from '@/styles/theme';
import { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { PaletteMode, useMediaQuery } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

// Create theme context
export const ColorModeContext = createContext({ 
  toggleColorMode: () => {},
  mode: 'light' as PaletteMode 
});

export default function App({ Component, pageProps }: AppProps) {
  // Check system preference
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  
  // Initialize mode from localStorage or system preference
  const [mode, setMode] = useState<PaletteMode>('light');
  
  useEffect(() => {
    const savedMode = localStorage.getItem('theme-mode') as PaletteMode;
    if (savedMode) {
      setMode(savedMode);
    } else {
      setMode(prefersDarkMode ? 'dark' : 'light');
    }
  }, [prefersDarkMode]);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          const newMode = prevMode === 'light' ? 'dark' : 'light';
          localStorage.setItem('theme-mode', newMode);
          return newMode;
        });
      },
      mode,
    }),
    [mode],
  );

  const theme = useMemo(() => getTheme(mode), [mode]);

  // Apply dark mode class to body
  useEffect(() => {
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(mode);
  }, [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        <div style={{ position: 'absolute', top: '1rem', right: '1rem', zIndex: 1000 }}>
          <IconButton 
            onClick={colorMode.toggleColorMode} 
            color="inherit"
            sx={{
              bgcolor: mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
              '&:hover': {
                bgcolor: mode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
              }
            }}
          >
            {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </div>
        <Component {...pageProps} />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
} 