import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.getAttribute('role') === 'button'
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <motion.div
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 200001, // Ensure above Lightbox (99999)
        pointerEvents: 'none',
        x: mousePosition.x - 16, // Center the 32x32 star
        y: mousePosition.y - 16,
      }}
    >
      <motion.svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={{
          scale: isHovering ? 1.5 : [1, 1.2, 1], // Pulse effect or hover enlargement
          rotate: isHovering ? 180 : 0,
        }}
        transition={{
          scale: {
            duration: isHovering ? 0.2 : 1.5,
            repeat: isHovering ? 0 : Infinity,
            ease: "easeInOut"
          },
          rotate: {
            duration: 0.5
          }
        }}
      >
        <path
          d="M16 2 L19 11 L28 14 L19 17 L16 26 L13 17 L4 14 L13 11 Z"
          fill={isHovering ? "white" : "none"}
          stroke="white"
          strokeWidth="1.5"
          style={{ filter: "drop-shadow(0 0 4px rgba(255, 255, 255, 0.5))" }}
        />
      </motion.svg>
    </motion.div>
  );
};

export default CustomCursor;
