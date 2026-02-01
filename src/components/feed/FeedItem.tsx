import React from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ts from 'react-syntax-highlighter/dist/esm/languages/prism/typescript';
import js from 'react-syntax-highlighter/dist/esm/languages/prism/javascript';
import rst from 'react-syntax-highlighter/dist/esm/languages/prism/rust';
import css from 'react-syntax-highlighter/dist/esm/languages/prism/css';
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash';
import json from 'react-syntax-highlighter/dist/esm/languages/prism/json';
import { useTheme } from '../../context/ThemeContext';
import styles from './Feed.module.scss';
import type { FeedItemData } from './data';

// Register languages
SyntaxHighlighter.registerLanguage('typescript', ts);
SyntaxHighlighter.registerLanguage('javascript', js);
SyntaxHighlighter.registerLanguage('rust', rst);
SyntaxHighlighter.registerLanguage('css', css);
SyntaxHighlighter.registerLanguage('bash', bash);
SyntaxHighlighter.registerLanguage('json', json);

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
  const { theme } = useTheme();
  
  const syntaxTheme = theme === 'dark' ? vscDarkPlus : oneLight;

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

        {/* Text Content - Render Markdown for non-blogs only */}
        {content.text && type !== 'blog' && (
            <div className={styles.textContent}>
                <ReactMarkdown 
                    remarkPlugins={[remarkGfm]}
                    components={{
                        // Remove img handling here to avoid duplicates if images are separate
                        // or handle if they are embedded in markdown. 
                        // Given the structure separates images, let's just render text.
                        img: ({...props}) => (
                           // Hide markdown images if we act as if we extracted them? 
                           // But content.images is provided separately.
                           // Let's assume markdown text might have inline images we want to show?
                           // Or mostly text? The user screenshot has code.
                           <img {...props} style={{maxWidth: '100%', borderRadius: '8px'}} loading="lazy" />
                        ),
                        code({inline, className, children, ...props}: any) {
                          const match = /language-(\w+)/.exec(className || '');
                          return !inline && match ? (
                            <SyntaxHighlighter
                              style={syntaxTheme}
                              language={match[1]}
                              PreTag="div"
                              {...props}
                              customStyle={{ margin: '1rem 0', borderRadius: '8px', fontSize: '0.9rem' }}
                            >
                              {String(children).replace(/\n$/, '')}
                            </SyntaxHighlighter>
                          ) : (
                            <code className={className} {...props} style={{ background: 'rgba(128,128,128,0.2)', padding: '0.2rem 0.4rem', borderRadius: '4px', fontFamily: 'monospace' }}>
                              {children}
                            </code>
                          );
                        }
                    }}
                >
                    {content.text}
                </ReactMarkdown>
            </div>
        )}

        {/* Blog Specific Content (If type is blog, usually text is summary, but we just rendered it above?)
            Actually, if type === 'blog', maybe we shouldn't render styles.textContent above IF it duplicates?
            Usually feed items have either main text OR a blog card.
            Let's keep logic: if text exists, render it.
            But wait, the user complaint implies the text IS visible but raw.
        */}
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
                {/* For blog card summary, we might want to strip markdown or just show text. 
                    Let's leave it as is for now, it's just a summary. 
                */}
                <p>{content.text}</p> 
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
