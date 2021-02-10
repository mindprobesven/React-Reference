import React from 'react';

export const themes = {
  light: {
    background: '#CCC',
    foreground: '#ff0000'
  },
  dark: {
    background: '#000',
    foreground: '#FFF'
  }
};

export const ThemeContext = React.createContext({
  theme: themes.light,
  toggleTheme: () => {},
});