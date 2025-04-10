import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material';
import { AnimatePresence } from 'framer-motion';
import Home from './components/Home';
import GiftRecommender from './components/GiftRecommender';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2D3250',
      light: '#424769',
    },
    secondary: {
      main: '#F6B17A',
      light: '#F7C59F',
    },
    background: {
      default: '#F1F6F9',
      paper: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
      marginBottom: '2rem',
      color: '#2D3250',
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 600,
      marginBottom: '1.5rem',
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 600,
      marginBottom: '1rem',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          textTransform: 'none',
          fontSize: '1.1rem',
          padding: '12px 24px',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
          },
        },
      },
    },
  },
});

function App() {
  const [showGiftRecommender, setShowGiftRecommender] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <div className="gradient-bg gradient-1"></div>
        <div className="gradient-bg gradient-2"></div>
        
        <AnimatePresence mode="wait">
          {!showGiftRecommender ? (
            <Home onGetStarted={() => setShowGiftRecommender(true)} key="home" />
          ) : (
            <GiftRecommender onBack={() => setShowGiftRecommender(false)} key="recommender" />
          )}
        </AnimatePresence>
      </div>
    </ThemeProvider>
  );
}

export default App;
