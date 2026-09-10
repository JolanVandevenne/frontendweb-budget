import { useState, useEffect } from 'react';
import { ThemeContext } from '.';


export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {

  const [isDark, setIsDark] = useState(
    () => localStorage.getItem('themeMode') === 'dark',
  );


  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('themeMode', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  const value = { isDark, toggleTheme };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
