import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { motion } from 'framer-motion';
import styles from './ThemeToggle.module.scss';

interface ThemeToggleProps {
  isNavbar?: boolean;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ isNavbar }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className={isNavbar ? styles.navToggleBtn : styles.toggleBtn}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {theme === 'dark' ? '🌞' : '🌙'}
    </motion.button>
  );
};

export default ThemeToggle;
