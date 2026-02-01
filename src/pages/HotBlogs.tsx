import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import styles from './HotBlogs.module.scss';
import { MOCK_FEED_DATA } from '../components/feed/data';

const HotBlogs = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('全部');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Filter only blogs and sort by hotness (likes)
  const allBlogs = useMemo(() => 
    MOCK_FEED_DATA
      .filter(item => item.type === 'blog')
      .sort((a, b) => b.stats.likes - a.stats.likes)
  , []);

  // Extract unique categories from blogs
  const categories = useMemo(() => {
    const cats = allBlogs.reduce((acc: string[], blog) => {
      const cat = blog.content.category;
      if (cat && !acc.includes(cat)) acc.push(cat);
      return acc;
    }, []);
    return ['全部', ...cats];
  }, [allBlogs]);

  // Filter blogs based on selected category
  const filteredBlogs = useMemo(() => {
    if (selectedCategory === '全部') return allBlogs;
    return allBlogs.filter(blog => blog.content.category === selectedCategory);
  }, [allBlogs, selectedCategory]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className={styles.pageWrapper}>
      <motion.div 
        className={styles.container}
        initial="hidden"
        animate="show"
        variants={containerVariants}
      >
        <div className={styles.header}>
          <h1 className={styles.title}>热门博客榜 🏆</h1>
          {selectedCategory !== '全部' && (
            <div className={styles.filterBar}>
              <span>当前分类：<strong>{selectedCategory}</strong></span>
              <button 
                className={styles.clearBtn}
                onClick={() => setSelectedCategory('全部')}
              >
                清除筛选
              </button>
            </div>
          )}
        </div>

        <div className={styles.contentLayout}>
          {/* Main List */}
          <div className={styles.mainGrid}>
            <AnimatePresence mode="popLayout">
              {filteredBlogs.map((blog) => {
                // Find absolute rank in the global 'All' list
                const globalIndex = allBlogs.findIndex(b => b.id === blog.id);
                // Only show ranking if it's top 3 AND we are in 'All' category (or always show global rank?)
                // User said: "I only need to show the top 3 hot blogs, others don't need index"
                const isTop3 = globalIndex < 3;
                
                const cardClass = isTop3 
                  ? `${styles.blogCard} ${styles.topCard} ${styles[`rank${globalIndex + 1}`]}`
                  : styles.blogCard;

                return (
                  <motion.div 
                    key={blog.id} 
                    layout
                    className={cardClass}
                    variants={itemVariants}
                    initial="hidden"
                    animate="show"
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => navigate(`/blog/${blog.id}`)}
                  >
                    {isTop3 && (
                      <div className={styles.rankBadge}>
                        {globalIndex + 1}
                      </div>
                    )}

                    <div className={styles.cardBody}>
                      <div className={styles.titleRow}>
                        <h2 className={styles.blogTitle}>{blog.content.title}</h2>
                        {blog.content.category && (
                          <span className={styles.tag}>{blog.content.category}</span>
                        )}
                      </div>
                      <p className={styles.preview}>{blog.content.text}</p>
                      
                      <div className={styles.meta}>
                         <span>👤 {blog.author.name}</span>
                         <span>📅 {blog.publishDate}</span>
                         <span>🔥 {blog.stats.likes}</span>
                         <span>💬 {blog.stats.comments}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {filteredBlogs.length === 0 && (
              <div className={styles.emptyState}>
                该分类下暂无文章 📭
              </div>
            )}
          </div>

          {/* PC Sidebar Categories */}
          <aside className={styles.sidebar}>
            <div className={styles.sidebarSticky}>
              <div className={styles.categoryMenu}>
                {categories.map(cat => (
                  <button
                    key={cat}
                    className={`${styles.categoryBtn} ${selectedCategory === cat ? styles.active : ''}`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </motion.div>

      {/* Mobile Floating Accordion Menu (Bottom Left) */}
      {/* Mobile Floating Trigger Button (Bottom Left) */}
      <AnimatePresence>
        {!isMobileMenuOpen && (
          <motion.button 
            className={styles.mobileTriggerBtn}
            onClick={() => setIsMobileMenuOpen(true)}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="8" y1="6" x2="21" y2="6"></line>
              <line x1="8" y1="12" x2="21" y2="12"></line>
              <line x1="8" y1="18" x2="21" y2="18"></line>
              <line x1="3" y1="6" x2="3.01" y2="6"></line>
              <line x1="3" y1="12" x2="3.01" y2="12"></line>
              <line x1="3" y1="18" x2="3.01" y2="18"></line>
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Mobile Bottom Sheet Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              className={styles.mobileDrawerOverlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            <motion.div 
              className={styles.mobileDrawer}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: "tween", ease: "easeOut", duration: 0.3 }}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
            >
              <div className={styles.drawerHeader}>
                <h3>选择分类</h3>
                <button 
                  className={styles.closeBtn}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
              
              <div className={styles.drawerContent}>
                {categories.map(cat => (
                  <button
                    key={cat}
                    className={`${styles.mobileCatItem} ${selectedCategory === cat ? styles.active : ''}`}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    {cat}
                    {selectedCategory === cat && <span>✓</span>}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HotBlogs;
