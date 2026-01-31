import React from 'react';
import Background3D from '../components/canvas/Background3D';
import Navbar from '../components/ui/Navbar';
import styles from './MainLayout.module.scss';
import MouseTrail from '../components/ui/MouseTrail';
import CustomCursor from '../components/ui/CustomCursor';
import MobileMusicPlayer from '../components/ui/MobileMusicPlayer';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  // Move global effects like MouseTrail and CustomCursor here or keep in App. 
  // Let's keep them in App or move here to clean up App. Moving here makes MainLayout truly the main layout.
  return (
    <div className={styles.container}>
      <Background3D />
      <MouseTrail />
      <CustomCursor />
      <Navbar />
      <MobileMusicPlayer />
      <main className={styles.content}>
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
