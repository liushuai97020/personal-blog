import { useState, useRef, useEffect } from 'react';
import styles from './MusicPlayerWidget.module.scss';
import { motion } from 'framer-motion';

const PLAYLIST_ID = '8836263546'; // Default QQ Music Playlist ID (Demo)
const API_URL = `https://api.i-meto.com/meting/api?server=tencent&type=playlist&id=${PLAYLIST_ID}`;

interface Track {
    title: string;
    author: string;
    pic: string;
    url: string;
    lrc?: string;
}

const MusicPlayerWidget = () => {
    const [playlist, setPlaylist] = useState<Track[]>([]);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        const fetchPlaylist = async () => {
            try {
                const res = await fetch(API_URL);
                const data = await res.json();
                if (Array.isArray(data) && data.length > 0) {
                    setPlaylist(data);
                    setIsPlaying(true); // Enable auto-play
                } else {
                    console.warn("Empty playlist or API error");
                }
            } catch (error) {
                console.error("Failed to fetch music:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPlaylist();
    }, []);

    const track = playlist[currentTrackIndex];

    useEffect(() => {
        if (!track) return;
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.play().catch(e => {
                    console.log("Autoplay prevented", e);
                    setIsPlaying(false); // Revert state if blocked
                });
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying, currentTrackIndex, track]);

    const togglePlay = () => {
        if (!track) return;
        setIsPlaying(!isPlaying);
    };

    const nextTrack = () => {
        if (playlist.length === 0) return;
        setCurrentTrackIndex((prev) => (prev + 1) % playlist.length);
        setIsPlaying(true);
    };

    const prevTrack = () => {
        if (playlist.length === 0) return;
        setCurrentTrackIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
        setIsPlaying(true);
    };

    if (isLoading) return <div className={styles.loading}>Loading Music...</div>;
    if (!track) return <div className={styles.error}>Music Unavailable</div>;

    return (
        <div className={styles.playerContainer}>
             <audio 
                ref={audioRef} 
                src={track.url} 
                onEnded={nextTrack}
            />
            
            <div className={styles.coverWrapper}>
                <motion.div 
                    key={track.pic} // Force re-render when image changes
                    className={`${styles.cover} ${isPlaying ? styles.rotating : ''}`}
                    style={{ backgroundImage: `url(${track.pic})` }}
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
                <div className={styles.title} title={track.title}>{track.title}</div>
                <div className={styles.artist} title={track.author}>{track.author}</div>
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
