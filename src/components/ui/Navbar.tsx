import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Navbar.module.scss';
import ThemeToggle from './ThemeToggle';

const modules = [
  { name: '最新动态', path: '/' },
  { name: '热门博客', path: '/hot' },
  { name: '摄影日记', path: '/photos' },
  { name: '工具集', path: '/tools' },
  { name: '关于我', path: '/about' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <nav className={styles.navbar}>
        <Link to="/" className={styles.logo} onClick={() => setIsOpen(false)}>
          MyBlog
        </Link>

        {/* Desktop Menu */}
        <div className={styles.desktopMenu}>
          {modules.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* Action Controls */}
        <div className={styles.navActions}>
          <ThemeToggle isNavbar={true} />
          
          {/* Mobile Hamburger Button */}
          <button className={styles.mobileMenuBtn} onClick={toggleMenu}>
            {isOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.mobileMenuOverlay}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsOpen(false)} // Click background to close
          >
            {modules.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={styles.mobileNavLink}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
