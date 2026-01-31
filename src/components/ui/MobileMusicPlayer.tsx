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

    // Spotify/QQ Music style green for light mode

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
                            bottom: -20 // Smaller gap from screen bottom
                        }}
                        dragElastic={0.05}
                    >
                        <motion.span
                            animate={isPlaying ? { rotate: [0, -10, 10, -10, 0] } : {}}
                            transition={{ repeat: Infinity, duration: 2 }}
                            style={{ 
                                display: 'flex',
                                // CSS filter trick to turn the purple 🎵 emoji green in light mode
                                // hue-rotate(150deg) + high saturation for a vibrant QQ Music style green
                                filter: theme === 'light' ? 'hue-rotate(340deg) saturate(3) brightness(1.1)' : 'none'
                            }}
                        >
                            🎵
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
                            <button onClick={prevTrack} className={styles.controlBtn}>⏮</button>
                            <button onClick={togglePlay} className={`${styles.controlBtn} ${styles.playBtn}`}>
                                {isPlaying ? "⏸" : "▶"}
                            </button>
                            <button onClick={nextTrack} className={styles.controlBtn}>⏭</button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MobileMusicPlayer;
