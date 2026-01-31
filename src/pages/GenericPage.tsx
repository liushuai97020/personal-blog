import React from 'react';
import { motion } from 'framer-motion';
import styles from '../App.module.scss';

interface Props {
  title: string;
}

const GenericPage: React.FC<Props> = ({ title }) => {
  return (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        style={{ padding: '2rem', textAlign: 'center', paddingTop: '6rem' }} // Add padding top for navbar
    >
      <h1 className={styles.heroTitle}>{title}</h1>
      <div className={styles.section} style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p>此模块正在建设中... ({title})</p>
      </div>
    </motion.div>
  );
};

export default GenericPage;
