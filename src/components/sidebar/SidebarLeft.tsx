// import React from 'react';
import { motion } from 'framer-motion';
import styles from './Sidebar.module.scss';
import MusicPlayerWidget from '../widgets/MusicPlayerWidget';

const SidebarLeft = () => {
  return (
    <motion.aside
      className={styles.sidebarLeft}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className={styles.profileCard}>
        <div className={styles.avatarContainer}>
            <img 
                src="https://i.ibb.co/tTZCyyN8/20260131164423-100-149.jpg" 
                alt="Avatar" 
                className={styles.avatar}
            />
        </div>
        <h2 className={styles.name}>梁非凡</h2>
        <p className={styles.bio}>
            全栈开发者 / 3D 爱好者 / 数字游民
        </p>
        
        <div className={styles.socialIcons}>
            {/* Social Icons (Mock) */}
            <span> Github </span>
            <span> Twitter </span>
            <span> Email </span>
        </div>

        {/* Site Stats */}
        <div className={styles.statRow}>
            <div className={styles.statItem}>
                <span className={styles.statValue}>42</span>
                <span className={styles.statLabel}>文章</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.statItem}>
                <span className={styles.statValue}>128</span>
                <span className={styles.statLabel}>运行天数</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.statItem}>
                <span className={styles.statValue}>8.5k</span>
                <span className={styles.statLabel}>访问</span>
            </div>
        </div>

        <div className={styles.copyright}>
            <p>© 2026 Personal Blog</p>
        </div>
      </div>

      {/* Music Player Widget */}
      <div className={styles.card}>
          <MusicPlayerWidget />
      </div>

      {/* Friend Links Widget */}
      <div className={styles.card}>
        <h3 className={styles.widgetHeader} style={{ marginBottom: '1rem' }}>🤝 友情链接</h3>
        <div className={styles.friendList}>
            {[1,2,3,4].map(i => (
                <div key={i} className={styles.friendAvatar} title={`Friend ${i}`} />
            ))}
        </div>
      </div>
    </motion.aside>
  );
};

export default SidebarLeft;
