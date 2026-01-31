import { useState } from 'react';
import FeedItem from './FeedItem';
import { MOCK_FEED_DATA } from './data';
import styles from './Feed.module.scss';
import ImageLightbox from '../ui/ImageLightbox';

const FeedList = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className={styles.feedList}>
      {MOCK_FEED_DATA.map((item) => (
        <FeedItem 
          key={item.id} 
          item={item} 
          onImageClick={(src) => setSelectedImage(src)}
        />
      ))}
      
      {/* Loading Sentinel or Footer */}
      <div style={{ textAlign: 'center', opacity: 0.5, padding: '2rem' }}>
        已经到底啦 ~
      </div>

      <ImageLightbox 
        isOpen={!!selectedImage} 
        src={selectedImage} 
        onClose={() => setSelectedImage(null)} 
      />
    </div>
  );
};

export default FeedList;
