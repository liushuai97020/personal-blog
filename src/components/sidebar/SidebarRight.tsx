// import React from 'react';
import { motion } from 'framer-motion';
import styles from './Sidebar.module.scss';
import CalendarWidget from '../widgets/CalendarWidget';

const SidebarRight = () => {
  return (
    <motion.aside
      className={styles.sidebarRight}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      {/* Tech Stack Widget */}
      <div className={styles.card}>
        <h3 className={styles.widgetHeader}>🛠️ 技术栈</h3>
        <div className={styles.techStackGrid}>
           {['React', 'TypeScript', 'NestJS', 'Three.js', 'Vite', 'SCSS'].map(tech => (
             <span key={tech} className={styles.techBadge}>{tech}</span>
           ))}
        </div>
      </div>

      {/* Hot Tags */}
      <div className={styles.card}>
        <h3 className={styles.widgetHeader}>
            🔥 热门标签
        </h3>
        <div className={styles.tagCloud}>
            {['Cyberpunk', 'Life', 'Photography', 'Coding', 'Music', 'Reading'].map(tag => (
                <span key={tag} className={styles.tag}>
                    #{tag}
                </span>
            ))}
        </div>
      </div>

      {/* Calendar Widget */}
      <div className={styles.card}>
         <CalendarWidget />
      </div>

      {/* Daily Quote */}
      <div className={styles.quoteWidget}>
        <h3 className={styles.widgetHeader}>💡 每日金句</h3>
        <p>
            “Talk is cheap. Show me the code.”
        </p>
        <span style={{ display: 'block', textAlign: 'right', fontSize: '0.8rem', marginTop: '0.5rem', opacity: 0.6 }}>—— Linus Torvalds</span>
      </div>
    </motion.aside>
  );
};

export default SidebarRight;
