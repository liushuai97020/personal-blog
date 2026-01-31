import { motion } from 'framer-motion';
import styles from './About.module.scss';
import { MOCK_FEED_DATA } from '../components/feed/data';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
} as any;

const GAMES = [
    { title: "Red Dead Redemption 2", cover: "https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/library_600x900.jpg" },
    { title: "PUBG: BATTLEGROUNDS", cover: "https://cdn.cloudflare.steamstatic.com/steam/apps/578080/library_600x900.jpg" },
    { title: "Black Myth: Wukong", cover: "https://cdn.cloudflare.steamstatic.com/steam/apps/2358720/library_600x900.jpg" },
    { title: "Cyberpunk 2077", cover: "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/library_600x900.jpg" },
    { title: "Detroit: Become Human", cover: "https://cdn.cloudflare.steamstatic.com/steam/apps/1222140/library_600x900.jpg" },
    { title: "Mafia: Definitive Edition", cover: "https://cdn.cloudflare.steamstatic.com/steam/apps/1030840/library_600x900.jpg" },
    { title: "Battlefield 2042", cover: "https://cdn.cloudflare.steamstatic.com/steam/apps/1517290/library_600x900.jpg" },
    { title: "Far Cry 6", cover: "https://cdn.cloudflare.steamstatic.com/steam/apps/2369390/library_600x900.jpg" },
    { title: "Watch Dogs 2", cover: "https://cdn.cloudflare.steamstatic.com/steam/apps/447040/library_600x900.jpg" },
    { title: "The Last of Us™ Part I", cover: "https://cdn.cloudflare.steamstatic.com/steam/apps/1888930/library_600x900.jpg" }, 
    { title: "Horizon Zero Dawn", cover: "https://cdn.cloudflare.steamstatic.com/steam/apps/1151640/library_600x900.jpg" },
    { title: "Shadow of the Tomb Raider", cover: "https://cdn.cloudflare.steamstatic.com/steam/apps/750920/library_600x900.jpg" },
    { title: "Metro Exodus", cover: "https://cdn.cloudflare.steamstatic.com/steam/apps/412020/library_600x900.jpg" }
];

const About = () => {
    const allPhotos = MOCK_FEED_DATA
        .filter(item => item.content.images && item.content.images.length > 0)
        .flatMap(item => item.content.images!)
        .slice(0, 12); 

  return (
    <motion.div 
      className={styles.container}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className={styles.introSection} variants={itemVariants}>
        <h1>关于我</h1>
        <p className={styles.subtitle}>
           虚拟世界的构建者，现实生活的观察家。
        </p>
      </motion.div>

      <div className={styles.contentGrid}>
        
        {/* Left Column */}
        <div className={styles.leftColumn}>
            {/* Profile Card */}
            <motion.div className={`${styles.card} ${styles.profileCard}`} variants={itemVariants}>
                <div className={styles.avatarContainer}>
                    <img src="/avatar.jpg" alt="Avatar" />
                </div>
                <h2 className={styles.name}>梁非凡</h2>
                <p className={styles.bio}>Web 前端开发工程师</p>
                
                <div className={styles.infoRow}>
                    <div className={styles.infoItem}>
                        <span>28</span>
                        <span>年龄</span>
                    </div>
                    <div className={styles.infoItem}>
                        <span>CN</span>
                        <span>坐标</span>
                    </div>
                    <div className={styles.infoItem}>
                        <span>7Y</span>
                        <span>经验</span>
                    </div>
                </div>
            </motion.div>
            
             {/* Contact Card */}
            <motion.div className={styles.card} variants={itemVariants}>
                <h2>📬 保持联系</h2>
                <div className={styles.contactList}>
                    
                    {/* WeChat */}
                    <div className={styles.contactItem}>
                        <div className={styles.icon}>
                            <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M666.3 586.2c-100.3 0-181.6-76.3-181.6-170.4 0-94.1 81.3-170.4 181.6-170.4 100.3 0 181.6 76.3 181.6 170.4 0 94.1-81.3 170.4-181.6 170.4z m-269 133.2c16.3 0 32.2-1.9 47.7-5.5l0.1-0.1c7.2 40.5 45.4 71.3 91.2 71.3 0.9 0 1.9 0 2.8-0.1-2.9-10.7-4.5-22-4.5-33.5 0-77.9 67.4-141.1 150.7-141.1 14.8 0 29.3 2 43.1 5.8 4.2-9.4 6.5-19.8 6.5-30.7 0-106.3-99.3-192.5-221.7-192.5S191.6 480.1 191.6 586.4c0 60.1 32 113.8 81.8 148.9v78.3l69.8-38.4c17.2 4.4 35.5 6.7 54.1 6.7zM397.3 719.5c-112.5 0-203.7-83.3-203.7-186S284.8 347.4 397.3 347.4c112.5 0 203.7 83.3 203.7 186.1S509.8 719.5 397.3 719.5z" p-id="1530"></path><path d="M783.5 197.4c-134.7 0-244 95.8-244 213.9 0 118.1 109.2 213.9 244 213.9 22.2 0 43.7-2.7 64-7.8l56.8 33.3v-67.9c40.6-28.5 66.6-72.2 66.6-121 0-118.1-109.3-214.4-244-214.4z m-157.9 119h23.5v22.2h-23.5v-22.2z m178 0h23.5v22.2h-23.5v-22.2z" p-id="1531"></path></svg>
                        </div>
                        <div className={styles.info}>
                            <span className={styles.label}>微信 WeChat</span>
                            <span className={styles.value}>点击或悬停扫码</span>
                        </div>
                        {/* QR Code Popup */}
                        <div className={styles.wechatPopup}>
                            <img src="/qrcode.jpg" alt="WeChat QR" />
                        </div>
                    </div>

                    {/* Douyin */}
                    <a href="https://v.douyin.com/x296jpjvbvc/" target="_blank" rel="noopener noreferrer" className={styles.contactItem}>
                        <div className={styles.icon}>
                            <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M569.6 0H416v736c0 11.2-2.3 22.2-6.6 32.4-7.8 18.5-22.1 32.1-40.4 38.6-11.4 4.1-23.8 6.2-36.8 6.2-56.1 0-101.6-45.6-101.6-101.9s45.5-101.9 101.6-101.9c13.2 0 25.8 2.5 37.6 7l11.4-150.3c-15.4-3.5-31.5-5.4-48-5.4-135.2 0-244.8 110-244.8 245.7S198 852 333.2 852 578 742 578 606.3V253.3c68.3 49 152 77.9 242.4 79.4v-156c-112.9 0-204.4-91.8-204.4-205.1l-0.1 28.4h-46.3z" /></svg>
                        </div>
                        <div className={styles.info}>
                            <span className={styles.label}>抖音 Douyin</span>
                            <span className={styles.value}>记录美好生活</span>
                        </div>
                    </a>

                    {/* Email */}
                    <a href="mailto:liushuai970206@outlook.com" className={styles.contactItem}>
                        <div className={styles.icon}>
                            <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M128 224h768a64 64 0 0 1 64 64v512a64 64 0 0 1-64 64H128a64 64 0 0 1-64-64V288a64 64 0 0 1 64-64z m0 64v512h768V288H128z m96.64 32l287.36 215.552L799.36 320h80l-334.72 251.008a64 64 0 0 1-76.8 0.512L144.64 320h80z" /></svg>
                        </div>
                        <div className={styles.info}>
                            <span className={styles.label}>Email</span>
                            <span className={styles.value}>liushuai970206@outlook.com</span>
                        </div>
                    </a>

                </div>
            </motion.div>

            {/* Profession / Tech Stack */}
            <motion.div className={styles.card} variants={itemVariants}>
                <h2>💻 技术栈</h2>
                <div className={styles.skillTags}>
                    <span className={styles.tag}>React</span>
                    <span className={styles.tag}>Vue</span>
                    <span className={styles.tag}>TypeScript</span>
                    <span className={styles.tag}>Node.js</span>
                    <span className={styles.tag}>Three.js</span>
                    <span className={styles.tag}>Next.js</span>
                </div>
            </motion.div>
        </div>

        {/* Right Column: Hobbies & Gallery */}
        <div className={styles.rightColumn}>
            
            {/* Gaming & Hobbies */}
            <motion.div className={styles.card} variants={itemVariants}>
                <h2>🎮 资深玩家 & 多元爱好</h2>
                <p style={{ marginBottom: '1rem', opacity: 0.8, lineHeight: '1.6' }}>
                    沉浸于 3A 大作的宏大叙事，也钟情于独立游戏的巧思。
                    当放下键盘，我是一名摄影师，用镜头捕捉光影；也是一名旅行者，探索未知的边界。
                </p>
                <div className={styles.gameTags}>
                    <span className={styles.gameTag}>PC 单机</span>
                    <span className={styles.gameTag}>Steam 鉴赏家</span>
                    <span className={styles.gameTag}>MMORPG</span>
                    <span className={styles.gameTag}>✈️ 旅游</span>
                    <span className={styles.gameTag}>📷 摄影</span>
                    <span className={styles.gameTag}>🎮 游戏</span>
                    <span className={styles.gameTag}>🎬 电影</span>
                </div>
            </motion.div>

            {/* Game Library Showcase */}
            <motion.div className={styles.card} variants={itemVariants}>
                <h2>🕹️ 我的游戏库</h2>
                <div className={styles.gameGrid}>
                    {GAMES.map((game, index) => (
                         <motion.div 
                            key={index}
                            className={styles.gameCard}
                            whileHover={{ y: -5 }}
                         >
                            <img src={game.cover} alt={game.title} loading="lazy" />
                            <div className={styles.gameTitle}>{game.title}</div>
                         </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Photography Showcase */}
            <motion.div className={styles.card} variants={itemVariants}>
                <h2>📷 镜头下的世界</h2>
                <p style={{ marginBottom: '1.5rem', opacity: 0.8 }}>
                    每一张照片都是对瞬间的永恒定格。
                </p>
                <div className={styles.galleryGrid}>
                    {allPhotos.map((img, index) => (
                        <motion.div 
                            key={index} 
                            className={styles.photoCard}
                            whileHover={{ y: -5 }}
                        >
                            <img src={img} alt={`Gallery ${index}`} loading="lazy" />
                            <div className={styles.photoOverlay}>
                                <span>Photography</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>

      </div>
    </motion.div>
  );
};

export default About;
