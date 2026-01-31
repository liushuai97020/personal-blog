import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

const PLAYLIST_ID = '8836263546';
const API_URL = `https://api.i-meto.com/meting/api?server=tencent&type=playlist&id=${PLAYLIST_ID}`;

export interface Track {
    title: string;
    author: string;
    pic: string;
    url: string;
    lrc?: string;
}

interface MusicContextType {
    playlist: Track[];
    currentTrackIndex: number;
    isPlaying: boolean;
    isLoading: boolean;
    currentTrack: Track | undefined;
    togglePlay: () => void;
    nextTrack: () => void;
    prevTrack: () => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [playlist, setPlaylist] = useState<Track[]>([]);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true); // Default to true for auto-play intent
    const [isLoading, setIsLoading] = useState(true);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Initial Fetch
    useEffect(() => {
        const fetchPlaylist = async () => {
            try {
                const res = await fetch(API_URL);
                const data = await res.json();
                if (Array.isArray(data) && data.length > 0) {
                    setPlaylist(data);
                    // No need to set isPlaying here as it's true by default
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

    const currentTrack = playlist[currentTrackIndex];

    // Audio Control Loop
    useEffect(() => {
        if (!currentTrack || !audioRef.current) return;

        if (isPlaying) {
            audioRef.current.play().catch(e => {
                console.warn("Autoplay / Play prevented", e);
                // We keep isPlaying true, the interaction listener will catch it
            });
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying, currentTrackIndex, currentTrack]);

    // Autoplay Workaround: Trigger play on first user interaction
    useEffect(() => {
        const startAudio = () => {
            if (audioRef.current && isPlaying) {
                // Try to play even if currentTrack is still being resolved by React
                audioRef.current.play()
                    .then(() => {
                        console.log("Autoplay successful after interaction");
                        // Only remove listeners once we actually succeed
                        window.removeEventListener('click', startAudio);
                        window.removeEventListener('touchstart', startAudio);
                        window.removeEventListener('mousedown', startAudio);
                    })
                    .catch(err => {
                        // If it fails (e.g. no src yet), we don't remove listener
                        console.warn("Autoplay attempt failed or blocked:", err.message);
                    });
            }
        };

        // Listen for ANY interaction
        window.addEventListener('click', startAudio);
        window.addEventListener('touchstart', startAudio);
        window.addEventListener('mousedown', startAudio);

        return () => {
            window.removeEventListener('click', startAudio);
            window.removeEventListener('touchstart', startAudio);
            window.removeEventListener('mousedown', startAudio);
        };
    }, [isPlaying, currentTrack]); // Re-bind when track changes to ensure it has a valid target

    const togglePlay = () => {
        if (!currentTrack) return;
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

    return (
        <MusicContext.Provider value={{
            playlist,
            currentTrackIndex,
            isPlaying,
            isLoading,
            currentTrack,
            togglePlay,
            nextTrack,
            prevTrack
        }}>
            {/* The persistent audio element */}
            <audio 
                ref={audioRef} 
                src={currentTrack?.url} 
                onEnded={nextTrack}
                style={{ display: 'none' }}
            />
            {children}
        </MusicContext.Provider>
    );
};

export const useMusic = () => {
    const context = useContext(MusicContext);
    if (!context) {
        throw new Error('useMusic must be used within a MusicProvider');
    }
    return context;
};
