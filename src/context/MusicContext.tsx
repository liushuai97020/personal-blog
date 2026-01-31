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
    const [isPlaying, setIsPlaying] = useState(false);
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
                    // setIsPlaying(true); // Disable auto-play by default context, user can trigger it or we can enable it
                    // The user requested seamless play, so auto-play on load is fine if policy allows
                    setIsPlaying(true); 
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
                setIsPlaying(false);
            });
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying, currentTrackIndex, currentTrack]);

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
