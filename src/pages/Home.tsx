import { motion } from 'framer-motion';
// import appStyles from '../App.module.scss'; // Removed in favor of local styles
import styles from './Home.module.scss';
import FeedList from '../components/feed/FeedList';
import SidebarLeft from '../components/sidebar/SidebarLeft';
import SidebarRight from '../components/sidebar/SidebarRight';

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={styles.homeContainerWrapper} // Wrapper style if needed, or remove class. Actually inner div has container style. Remove class from motion div or rename.
    >
        <div className={styles.homeContainer}>
            <div className={styles.sidebarLeft}>
                <SidebarLeft />
            </div>

            <main className={styles.mainContent}>
                {/* Header or Hero can go here or above grid. Let's keep it simple inside main for now or just remove Hero text to save space? 
                    User said "Content in middle... need sidebars". 
                    Let's keep the "Welcome" text but maybe compact? Or just Feed.
                */}
                 <header style={{ marginBottom: '2rem', textAlign: 'center' }}>
                    <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>我的个人空间</h1>
                    <p style={{ opacity: 0.7 }}>欢迎来到我的数字花园。</p>
                </header>
                
                <section className={styles.section}>
                    <FeedList />
                </section>
            </main>

            <div className={styles.sidebarRight}>
                <SidebarRight />
            </div>
        </div>
    </motion.div>
  );
};

export default Home;
