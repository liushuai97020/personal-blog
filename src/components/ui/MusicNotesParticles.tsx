import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMusic } from '../../context/MusicContext';
import styles from './MusicNotesParticles.module.scss';

interface Note {
  id: number;
  x: number;
  size: number;
  color: string;
  duration: number;
  delay: number;
}

const COLORS = [
  '#ffeb3b', // Yellow
  '#e91e63', // Pink
  '#9c27b0', // Purple
  '#2196f3', // Blue
  '#4caf50', // Green
  '#ff9800', // Orange
  '#00bcd4', // Cyan
];

const MusicNotesParticles: React.FC = () => {
  const { isPlaying } = useMusic();
  const [notes, setNotes] = useState<Note[]>([]);

  // Function to remove a note by ID
  const removeNote = (id: number) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  useEffect(() => {
    let interval: any;

    if (isPlaying) {
      interval = window.setInterval(() => {
        const newNote: Note = {
          id: Date.now() + Math.random(),
          x: Math.random() * 100,
          size: 20 + Math.random() * 20,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          duration: 3 + Math.random() * 3, // Slightly faster for better feel
          delay: 0,
        };
        setNotes((prev) => [...prev, newNote]);
      }, 800);
    } else {
      // Clear notes when pausing to prevent them from "sticking"
      setNotes([]);
    }

    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className={styles.container}>
      <AnimatePresence>
        {notes.map((note) => (
          <motion.div
            key={note.id}
            className={styles.note}
            initial={{ y: '105vh', x: `${note.x}vw`, opacity: 0, scale: 0.5 }}
            animate={{ 
              y: '-10vh', 
              opacity: [0, 0.7, 0.7, 0],
              scale: 1,
              x: `${note.x + (Math.random() * 10 - 5)}vw`
            }}
            exit={{ opacity: 0, scale: 1.2 }}
            onAnimationComplete={() => removeNote(note.id)}
            transition={{ 
              duration: note.duration, 
              ease: "easeOut" 
            }}
            style={{ 
              color: note.color,
              fontSize: note.size,
            }}
          >
            <svg width={note.size} height={note.size} viewBox="0 0 24 24" fill="currentColor">
              <path d="M21 3l-10 2v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4v-10.55l8-1.6v7.15c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4v-12z" />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default MusicNotesParticles;
