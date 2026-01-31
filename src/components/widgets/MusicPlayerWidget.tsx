import styles from './MusicPlayerWidget.module.scss';
import { motion } from 'framer-motion';
import { useMusic } from '../../context/MusicContext';

const MusicPlayerWidget = () => {
    const { 
        isLoading, 
        currentTrack, 
        isPlaying, 
        togglePlay, 
        nextTrack, 
        prevTrack 
    } = useMusic();

    if (isLoading) return <div className={styles.loading}>Loading Music...</div>;
    if (!currentTrack) return <div className={styles.error}>Music Unavailable</div>;

    return (
        <div className={styles.playerContainer}>
            {/* Audio element is now managed globally in MusicContext */}
            
            <div className={styles.coverWrapper}>
                <motion.div 
                    key={currentTrack.pic} // Force re-render when image changes
                    className={`${styles.cover} ${isPlaying ? styles.rotating : ''}`}
                    style={{ backgroundImage: `url(${currentTrack.pic})` }}
                    initial={false}
                    animate={{ rotate: isPlaying ? 360 : 0 }}
                    transition={{ 
                        duration: 8, 
                        repeat: Infinity, 
                        ease: "linear"
                    }}
                >
                    <div className={styles.coverHole} />
                </motion.div>
            </div>

            <div className={styles.info}>
                <div className={styles.title} title={currentTrack.title}>{currentTrack.title}</div>
                <div className={styles.artist} title={currentTrack.author}>{currentTrack.author}</div>
            </div>

            <div className={styles.controls}>
                <button onClick={prevTrack} className={styles.btn}>⏮</button>
                <button onClick={togglePlay} className={`${styles.btn} ${styles.playBtn}`}>
                    {isPlaying ? "⏸" : "▶"}
                </button>
                <button onClick={nextTrack} className={styles.btn}>⏭</button>
            </div>
        </div>
    );
};

export default MusicPlayerWidget;
