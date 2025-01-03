import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { createContext, useMemo, useState } from 'react';
import './App.css';
import MainPage from './components/MainPage';

export const ColorModeContext = createContext({ toggleColorMode: () => {}});

export default function App() {
  const [mode, setMode] = useState<'light' | 'dark'>('dark');
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      }
    }), [mode]
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode
        }
      }), [mode]
  )

  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline/>
          <MainPage/>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
}
