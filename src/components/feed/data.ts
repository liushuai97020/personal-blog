export type FeedType = 'blog' | 'status' | 'photo';

export interface FeedAuthor {
  id: number;
  name: string;
  avatar: string; // URL
}

export interface FeedStats {
  likes: number;
  comments: number;
}

export interface FeedItemData {
  id: number;
  type: FeedType;
  author: FeedAuthor;
  publishDate: string; // e.g., '2 hours ago', '2023-10-27'
  content: {
    text: string;
    title?: string; // For blogs
    images?: string[]; // For blogs (cover) or photos (gallery)
  };
  stats: FeedStats;
}

export const MOCK_FEED_DATA: FeedItemData[] = [
  {
    id: 1,
    type: 'status',
    author: {
      id: 1,
      name: '梁非凡',
      avatar: 'https://i.ibb.co/tTZCyyN8/20260131164423-100-149.jpg'
    },
    publishDate: '刚刚',
    content: {
      text: '终于把个人博客的导航栏和流星特效做好了！✨ 感觉离完美的赛博空间又近了一步。大家觉得这新的星星光标怎么样？ #开发日常 #前端',
    },
    stats: { likes: 12, comments: 2 }
  },
  {
    id: 2,
    type: 'photo',
    author: {
      id: 1,
      name: '梁非凡',
      avatar: 'https://i.ibb.co/tTZCyyN8/20260131164423-100-149.jpg'
    },
    publishDate: '2小时前',
    content: {
      text: '周末去公园采风，捕捉到了一些温柔的光影。🌿📷',
      images: [
        'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=800&auto=format&fit=crop', // Landscape
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop', // Beach
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop', // Portrait
        'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=800&auto=format&fit=crop', // Nature
      ]
    },
    stats: { likes: 45, comments: 8 }
  },
  {
    id: 3,
    type: 'blog',
    author: {
      id: 1,
      name: '梁非凡',
      avatar: 'https://i.ibb.co/tTZCyyN8/20260131164423-100-149.jpg'
    },
    publishDate: '昨天',
    content: {
      title: '深入浅出 Three.js：粒子系统重构指南',
      text: '在 React Three Fiber 中实现高性能的星空背景并不复杂，关键在于 Shader 的运用和 InstanceMesh 的优化...',
      images: ['https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop']
    },
    stats: { likes: 89, comments: 14 }
  },
  {
    id: 4,
    type: 'status',
    author: {
      id: 1,
      name: '梁非凡',
      avatar: 'https://i.ibb.co/tTZCyyN8/20260131164423-100-149.jpg'
    },
    publishDate: '3天前',
    content: {
      text: '咖啡是程序员的血液 ☕️，今天又通过了一个复杂的测试用例！',
    },
    stats: { likes: 5, comments: 0 }
  }
];
