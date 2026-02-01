import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { theme } = useTheme();

  // Use MotionValues for smooth, performant movement without React re-renders
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Tighter spring for more responsive cursor (fixes "laggy" feel)
  const springConfig = { damping: 30, stiffness: 1500 }; 
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  // Theme-aware colors
  const cursorColor = theme === 'light' ? '#000000' : '#ffffff';
  const shadowColor = theme === 'light' ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.5)';

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(pointer: coarse)').matches || window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 16);
      mouseY.set(e.clientY - 16);
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

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('resize', checkMobile);
    };
  }, [mouseX, mouseY]);

  if (isMobile) return null;

  return (
    <motion.div
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 200001,
        pointerEvents: 'none',
        x: cursorX,
        y: cursorY,
        willChange: 'transform',
      }}
    >
      <motion.svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={{
          scale: isHovering ? 1.5 : [1, 1.2, 1],
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
        style={{ filter: `drop-shadow(0 0 4px ${shadowColor})` }}
      >
        <path
          d="M16 2 L19 11 L28 14 L19 17 L16 26 L13 17 L4 14 L13 11 Z"
          fill={isHovering ? cursorColor : "none"}
          stroke={cursorColor}
          strokeWidth="1.5"
        />
      </motion.svg>
    </motion.div>
  );
};

export default CustomCursor;
