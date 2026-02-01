import { useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useTheme } from '../context/ThemeContext';
import { MOCK_FEED_DATA } from '../components/feed/data';
import styles from './BlogDetail.module.scss';

// Register languages for smaller bundle size
import ts from 'react-syntax-highlighter/dist/esm/languages/prism/typescript';
import js from 'react-syntax-highlighter/dist/esm/languages/prism/javascript';
import rst from 'react-syntax-highlighter/dist/esm/languages/prism/rust';
import css from 'react-syntax-highlighter/dist/esm/languages/prism/css';
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash';
import json from 'react-syntax-highlighter/dist/esm/languages/prism/json';

SyntaxHighlighter.registerLanguage('typescript', ts);
SyntaxHighlighter.registerLanguage('javascript', js);
SyntaxHighlighter.registerLanguage('rust', rst);
SyntaxHighlighter.registerLanguage('css', css);
SyntaxHighlighter.registerLanguage('bash', bash);
SyntaxHighlighter.registerLanguage('json', json);

const BlogDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { theme } = useTheme();
  
  // Choose highlight theme based on app theme
  const syntaxTheme = theme === 'dark' ? vscDarkPlus : oneLight;

  // Derive blog data directly during render since data is synchronous
  const blog = useMemo(() => {
    if (!id) return null;
    return MOCK_FEED_DATA.find(item => item.id === Number(id) && item.type === 'blog') || null;
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(-1);
  };

  if (!blog) {
     return (
        <div style={{ textAlign: 'center', padding: '5rem', color: '#fff' }}>
            <h1>🚫 文章未找到</h1>
            <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: 'var(--accent-color)', marginTop: '1rem', cursor: 'pointer', fontSize: '1rem' }}>
             ← 返回上一页
            </button>
        </div>
     );
  }

  return (
    <motion.div> 
      {/* Scroll Progress Bar (Optional, can add later) */}
      
      <div className={styles.detailContainer}>
          {/* Hero Section */}
          <header className={styles.heroSection}>
            {blog.content.images && blog.content.images.length > 0 && (
              <motion.div 
                className={styles.coverImage}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <img src={blog.content.images[0]} alt={blog.content.title} />
              </motion.div>
            )}

            <div className={styles.metaHeader}>
              <motion.h1 
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.1 }}
              >
                {blog.content.title}
              </motion.h1>
              
              <motion.div 
                className={styles.metaInfo}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className={styles.author}>
                  <img src={blog.author.avatar} alt={blog.author.name} />
                  <span>{blog.author.name}</span>
                </div>
                <span>📅 {blog.publishDate}</span>
                <span>🔥 {blog.stats.likes} 热度</span>
              </motion.div>
            </div>
          </header>

          {/* Fade-up Animation for Content */}
          <motion.article 
            className={styles.articleContent}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
          >
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={{
                img: ({...props}) => (
                  <div className={styles.mdImageWrapper}>
                    <img {...props} alt={props.alt || 'blog-image'} loading="lazy" />
                  </div>
                ),
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                code({inline, className, children, ...props}: any) {
                  const match = /language-(\w+)/.exec(className || '');
                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={syntaxTheme}
                      language={match[1]}
                      PreTag="div"
                      {...props}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                }
              }}
            >
              {blog.content.text}
            </ReactMarkdown>
          </motion.article>

          {/* Floating Back Button - Side Tab Design */}
          <motion.button
            className={styles.sideBackTab}
            onClick={handleBack}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ x: 5 }} // Slight peek out on hover
            whileTap={{ scale: 0.95 }}
            transition={{ 
              type: 'spring', 
              damping: 20, 
              stiffness: 200,
              delay: 0.5
            }}
            title="返回"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M15 18l-6-6 6-6" />
            </svg>
            <span>返回</span>
          </motion.button>
          
          {/* PC Bottom Back Button */}
          <div className={styles.bottomNav}>
            <button className={styles.backBtn} onClick={handleBack}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              返回列表
            </button>
          </div>

          <footer className={styles.footer}>
            <div style={{ opacity: 0.6, fontSize: '0.9rem', width: '100%', textAlign: 'center' }}>
              By MyBlog • {new Date().getFullYear()}
            </div>
          </footer>
       </div>
    </motion.div>
  );
};

export default BlogDetail;
