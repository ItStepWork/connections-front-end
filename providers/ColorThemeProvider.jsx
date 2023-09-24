'use client'
import { ThemeProvider } from 'next-themes';

const ColorThemeProvider = ({ children }) => {
  return ( <ThemeProvider attribute='class'>{children}</ThemeProvider> )
};

export default ColorThemeProvider;
