import { useRef, useState } from 'react';
import { motion, AnimatePresence, useMotionValue } from 'framer-motion';
import { useMusic } from '../../context/MusicContext';
import { useTheme } from '../../context/ThemeContext';
import styles from './MobileMusicPlayer.module.scss';

const MobileMusicPlayer: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const constraintsRef = useRef(null);
    const { theme } = useTheme();
    
    // Vertical position manager
    const y = useMotionValue(0);

    const { 
        currentTrack, 
        isPlaying, 
        togglePlay, 
        nextTrack, 
        prevTrack,
        isLoading 
    } = useMusic();

    if (isLoading || !currentTrack) return null;

    // Color logic for the note icon: Green for light mode, Darker Purple for dark mode
    const noteIconColor = theme === 'light' ? '#1ed760' : '#7c3aed';

    return (
        <div className={styles.floatingWrapper} ref={constraintsRef}>
            <AnimatePresence mode="wait">
                {!isExpanded ? (
                    <motion.button
                        key="note-btn"
                        className={styles.noteBtn}
                        onClick={() => setIsExpanded(true)}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        whileTap={{ scale: 0.9 }}
                        
                        style={{ y }} // Follow vert position
                        
                        // Drag Implementation - Locked to Y-axis only
                        drag="y"
                        dragConstraints={{
                            top: - (window.innerHeight - 200),
                            bottom: -20 
                        }}
                        dragElastic={0.05}
                    >
                        <motion.span
                            animate={isPlaying ? { rotate: [0, -10, 10, -10, 0] } : {}}
                            transition={{ repeat: Infinity, duration: 2 }}
                            style={{ 
                                display: 'flex',
                                color: noteIconColor
                            }}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M9 18V5l12-2v13" />
                                <circle cx="6" cy="18" r="3" />
                                <circle cx="18" cy="16" r="3" />
                            </svg>
                        </motion.span>
                    </motion.button>
                ) : (
                    <motion.div
                        key="player-panel"
                        className={styles.playerPanel}
                        style={{ y }} // Panel follows icon's vertical position
                        initial={{ scale: 0.8, opacity: 0, x: 50 }}
                        animate={{ scale: 1, opacity: 1, x: 0 }}
                        exit={{ scale: 0.8, opacity: 0, x: 50 }}
                        onClick={(e) => {
                            if (e.target === e.currentTarget) setIsExpanded(false);
                        }}
                    >
                        <div 
                            className={`${styles.miniCover} ${isPlaying ? styles.rotating : ''}`}
                            style={{ backgroundImage: `url(${currentTrack.pic})` }}
                            onClick={() => setIsExpanded(false)}
                        />
                        
                        <div className={styles.trackInfo} onClick={() => setIsExpanded(false)}>
                            <div className={styles.title}>{currentTrack.title}</div>
                            <div className={styles.artist}>{currentTrack.author}</div>
                        </div>

                        <div className={styles.controls}>
                            <button onClick={prevTrack} className={styles.controlBtn}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <polygon points="19 20 9 12 19 4 19 20" />
                                    <line x1="5" y1="4" x2="5" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </button>
                            <button onClick={togglePlay} className={`${styles.controlBtn} ${styles.playBtn}`}>
                                {isPlaying ? (
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                        <rect x="6" y="4" width="4" height="16" />
                                        <rect x="14" y="4" width="4" height="16" />
                                    </svg>
                                ) : (
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                        <polygon points="5 3 19 12 5 21 5 3" />
                                    </svg>
                                )}
                            </button>
                            <button onClick={nextTrack} className={styles.controlBtn}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <polygon points="5 4 15 12 5 20 5 4" />
                                    <line x1="19" y1="4" x2="19" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MobileMusicPlayer;
