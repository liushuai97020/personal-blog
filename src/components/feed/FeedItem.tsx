import React from 'react';
import { motion } from 'framer-motion';
import styles from './Feed.module.scss';
import type { FeedItemData } from './data';

// Icons (Simple SVG inline for now)
const HeartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const MessageIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const FeedItem: React.FC<{ item: FeedItemData; onImageClick?: (src: string) => void }> = ({ item, onImageClick }) => {
  const { author, content, stats, type, publishDate } = item;

  // Determine image grid class
  let gridClass = styles.imageGrid;
  const imgCount = content.images?.length || 0;
  if (imgCount === 1) gridClass += ` ${styles.single}`;
  else if (imgCount === 2 || imgCount === 4) gridClass += ` ${styles.four}`;

  return (
    <motion.article 
      className={styles.feedItem}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <img src={author.avatar} alt={author.name} className={styles.avatar} />
      
      <div className={styles.mainContent}>
        <div className={styles.header}>
            <span className={styles.authorName}>{author.name}</span>
            <span className={styles.date}>{publishDate}</span>
        </div>

        {/* Text Content */}
        {content.text && <div className={styles.textContent}>{content.text}</div>}

        {/* Blog Specific Content */}
        {type === 'blog' && (
            <div className={styles.blogCard}>
                {content.images && content.images[0] && (
                    <img 
                      src={content.images[0]} 
                      alt={content.title} 
                      onClick={onImageClick ? () => onImageClick(content.images![0]!) : undefined}
                      style={{ cursor: onImageClick ? 'zoom-in' : 'default' }}
                    />
                )}
                <h3>{content.title}</h3>
                <p>{content.text}</p> {/* Summary inside card usually for blogs */}
            </div>
        )}

        {/* Photo Gallery (for 'photo' type) */}
        {type === 'photo' && content.images && (
            <div className={gridClass}>
                {content.images.map((img, idx) => (
                    <img 
                      key={idx} 
                      src={img} 
                      alt={`Gallery ${idx}`} 
                      loading="lazy" 
                      onClick={onImageClick ? () => onImageClick(img) : undefined}
                    />
                ))}
            </div>
        )}

        <div className={styles.footer}>
            <button className={styles.actionBtn}>
                <HeartIcon /> {stats.likes || '赞'}
            </button>
            <button className={styles.actionBtn}>
                <MessageIcon /> {stats.comments || '评论'}
            </button>
        </div>
      </div>
    </motion.article>
  );
};

export default FeedItem;
