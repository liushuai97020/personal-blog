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
    category?: string; // For blogs/photos categorization
  };
  stats: FeedStats;
}

export const MOCK_FEED_DATA: FeedItemData[] = [
  {
    id: 1,
    type: 'status',
    author: { id: 1, name: '梁非凡', avatar: '/avatar.jpg' },
    publishDate: '刚刚',
    content: {
      text: '终于把个人博客的导航栏和流星特效做好了！✨ 感觉离完美的赛博空间又近了一步。大家觉得这新的星星光标怎么样？ #开发日常 #前端',
    },
    stats: { likes: 12, comments: 2 }
  },
  {
    id: 101,
    type: 'blog',
    author: { id: 1, name: '梁非凡', avatar: '/avatar.jpg' },
    publishDate: '2小时前',
    content: {
      category: '前端',
      title: 'React 19 前瞻：Compiler 与 Server Actions',
      images: ['https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1000&auto=format&fit=crop'],
      text: `
React 19 即将带来翻天覆地的变化，其中最引人注目的莫过于 **React Compiler** 和 **Server Actions**。

## React Compiler (React Forget)

React Compiler 是一个自动化的构建工具，它能自动优化你的 React 代码，意味着你可能再也不需要手写 \`useMemo\` 和 \`useCallback\` 了！

### 以前的写法

\`\`\`javascript
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);

const handleClick = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
\`\`\`

### Compiler 优化后

你只需要正常写代码，Compiler 会自动处理依赖和缓存：

\`\`\`javascript
const value = computeExpensiveValue(a, b);

function handleClick() {
  doSomething(a, b);
}
\`\`\`

## Server Actions

Server Actions 允许我们在客户端组件中直接调用运行在服务器端的函数。

\`\`\`typescript
// actions.ts
'use server'

export async function createTodo(formData: FormData) {
  const title = formData.get('title');
  await db.todos.create({ title });
}
\`\`\`

\`\`\`tsx
// TodoForm.tsx
import { createTodo } from './actions';

export default function TodoForm() {
  return (
    <form action={createTodo}>
      <input name="title" />
      <button type="submit">Add</button>
    </form>
  );
}
\`\`\`

这大大简化了数据变更的流程。
      `
    },
    stats: { likes: 128, comments: 45 }
  },
  {
    id: 102,
    type: 'blog',
    author: { id: 1, name: '梁非凡', avatar: '/avatar.jpg' },
    publishDate: '5小时前',
    content: {
      category: '前端',
      title: 'CSS Grid vs Flexbox：终极指南',
      images: ['https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?q=80&w=1000&auto=format&fit=crop'],
      text: `
在现代 CSS 布局中，Grid 和 Flexbox 既是竞争对手也是最佳拍档。什么时候用哪个？让我们一探究竟。

## Flexbox (一维布局)

Flexbox 擅长在**一个方向**（行或列）上排列元素，处理对齐和空间分配。

\`\`\`css
.flex-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
\`\`\`

**适用场景：**
*   导航栏
*   居中对齐
*   卡片列表（简单的流式布局）

## Grid (二维布局)

Grid 擅长同时处理**行和列**，可以创建复杂的网格结构。

\`\`\`css
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto 1fr auto;
  gap: 20px;
}
\`\`\`

### 圣杯布局示例

\`\`\`css
.layout {
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar main ads"
    "footer footer footer";
}
\`\`\`

## 结论

> "Flexbox is for layout in one dimension. Grid is for layout in two dimensions."

不要死板地只用一个，**混合使用**才是王道！
      `
    },
    stats: { likes: 89, comments: 12 }
  },
  {
    id: 103,
    type: 'blog',
    author: { id: 1, name: '梁非凡', avatar: '/avatar.jpg' },
    publishDate: '昨天',
    content: {
      category: '前端',
      title: 'TypeScript 高级技巧：泛型与工具类型',
      images: ['https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=1000&auto=format&fit=crop'],
      text: `
TypeScript 不仅仅是加了类型的 JavaScript，它的类型系统是图灵完备的。

## 泛型约束 (Generic Constraints)

限制泛型必须包含某些属性：

\`\`\`typescript
interface Lengthwise {
  length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}
\`\`\`

## 映射类型 (Mapped Types)

快速根据旧类型创建新类型：

\`\`\`typescript
type OptionsFlags<Type> = {
  [Property in keyof Type]: boolean;
};

type Features = {
  darkMode: () => void;
  newUserProfile: () => void;
};

type FeatureFlags = OptionsFlags<Features>;
// 结果:
// {
//   darkMode: boolean;
//   newUserProfile: boolean;
// }
\`\`\`

## 实用工具类型

*   \`Partial<T>\`: 所有属性变为可选
*   \`Pick<T, K>\`: 选择部分属性
*   \`Omit<T, K>\`: 排除部分属性

熟练掌握这些，你的代码质量将飞升！🚀
      `
    },
    stats: { likes: 230, comments: 56 }
  },
  {
    id: 2,
    type: 'photo',
    author: { id: 1, name: '梁非凡', avatar: '/avatar.jpg' },
    publishDate: '2小时前',
    content: {
      category: '摄影',
      text: '周末去公园采风，捕捉到了一些温柔的光影。🌿📷',
      images: [
        'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=800&auto=format&fit=crop',
      ]
    },
    stats: { likes: 45, comments: 8 }
  },
  {
    id: 104,
    type: 'blog',
    author: { id: 1, name: '梁非凡', avatar: '/avatar.jpg' },
    publishDate: '3天前',
    content: {
      category: '后端',
      title: 'Rust 初体验：内存安全与所有权',
      images: ['https://images.unsplash.com/photo-1535551951406-a19828b8e785?q=80&w=1000&auto=format&fit=crop'],
      text: `
最近开始学习 Rust，被它的**所有权 (Ownership)** 机制深深折服（也折磨）。

## 规则

1.  Rust 中的每一个值都有一个被称为其 **所有者 (owner)** 的变量。
2.  值在任一时刻有且只有一个所有者。
3.  当所有者（变量）离开作用域，这个值将被丢弃。

## 移动 (Move)

\`\`\`rust
let s1 = String::from("hello");
let s2 = s1; // s1 被移除，所有权转移给 s2

// println!("{}, world!", s1); // 这行会报错！
\`\`\`

## 借用 (Borrowing)

通过引用 \`&\` 来借用值，而不获取所有权：

\`\`\`rust
fn calculate_length(s: &String) -> usize {
    s.len()
}

let s1 = String::from("hello");
let len = calculate_length(&s1); // s1 仍然有效
\`\`\`

虽然学习曲线陡峭，但 Rust 带来的安全感是无与伦比的。🛡️
      `
    },
    stats: { likes: 156, comments: 33 }
  },
  {
    id: 105,
    type: 'blog',
    author: { id: 1, name: '梁非凡', avatar: '/avatar.jpg' },
    publishDate: '4天前',
    content: {
      category: '前端',
      title: 'Three.js 粒子系统实战',
      images: ['https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop'],
      text: `
在 React Three Fiber 中实现漫天星空。✨

## 核心思路

使用 \`Points\` 和 \`BufferGeometry\` 来高效渲染成千上万个粒子。

\`\`\`javascript
const particlesCount = 5000;
const posArray = new Float32Array(particlesCount * 3);

for(let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 5;
}

geometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
\`\`\`

## 材质设置

使用 \`PointsMaterial\` 控制粒子大小和颜色：

\`\`\`javascript
const material = new THREE.PointsMaterial({
    size: 0.005,
    color: '#ffffff',
    transparent: true,
    opacity: 0.8,
    sizeAttenuation: true
});
\`\`\`

## 动画

在 \`useFrame\` 中让粒子旋转起来：

\`\`\`javascript
useFrame((state, delta) => {
    ref.current.rotation.y += delta * 0.1;
    ref.current.rotation.x += delta * 0.05;
});
\`\`\`

这就是我的博客背景的原理！
      `
    },
    stats: { likes: 312, comments: 88 }
  },
  {
    id: 106,
    type: 'blog',
    author: { id: 1, name: '梁非凡', avatar: '/avatar.jpg' },
    publishDate: '1周前',
    content: {
      category: '摄影',
      title: '摄影日记：捕捉光的艺术',
      images: ['https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1000&auto=format&fit=crop'],
      text: `
摄影不仅仅是按下快门，而是**观察、等待和构图**。

## 黄金时刻 (Golden Hour)

日出后和日落前的一小时，光线柔和金黄，是拍摄人像和风景的最佳时机。

*   **侧光**: 增强立体感
*   **逆光**: 创造剪影和轮廓光

## 构图技巧

1.  **三分法**: 将画面分为九宫格，主体放在交叉点。
2.  **引导线**: 利用道路、河流引导视线。
3.  **框架**: 利用门窗、树枝作为前景框架。

![风景示例](https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=800&auto=format&fit=crop)

拿起相机，去记录生活吧！📸
      `
    },
    stats: { likes: 98, comments: 14 }
  },
  {
    id: 107,
    type: 'blog',
    author: { id: 1, name: '梁非凡', avatar: '/avatar.jpg' },
    publishDate: '1周前',
    content: {
      category: '算法',
      title: '算法笔记：快速排序 (Quick Sort)',
      images: ['https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=1000&auto=format&fit=crop'],
      text: `
快速排序是一种高效的排序算法，采用**分治法**策略。

## 原理

1.  从数列中挑出一个元素，通过该元素将数列分为两部分。
2.  将比它小的放左边，比它大的放右边。
3.  递归地对左右两边进行排序。

## JavaScript 实现

\`\`\`javascript
function quickSort(arr) {
  if (arr.length <= 1) { return arr; }

  const pivot = arr[0];
  const left = [];
  const right = [];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  return [...quickSort(left), pivot, ...quickSort(right)];
}
\`\`\`

## 复杂度

*   **平均时间复杂度**: O(n log n)
*   **最坏时间复杂度**: O(n^2) (已排序数组)

面试常考，必须背熟！🤓
      `
    },
    stats: { likes: 145, comments: 22 }
  },
  {
    id: 108,
    type: 'blog',
    author: { id: 1, name: '梁非凡', avatar: '/avatar.jpg' },
    publishDate: '2周前',
    content: {
      category: '生活',
      title: '2025 年度书单推荐',
      images: ['https://images.unsplash.com/photo-1491841573634-28140fc9602b?q=80&w=1000&auto=format&fit=crop'],
      text: `
今年读了不少好书，挑选几本分享给大家。📚

### 技术类

1.  **《深入理解计算机系统》** (CSAPP)
    *   *推荐理由*: 程序员的内功修炼手册，打通软硬件任督二脉。
2.  **《Refactoring》** (重构)
    *   *推荐理由*: 改善既有代码设计的艺术。

### 文学类

> "There is no friend as loyal as a book." - Ernest Hemingway

*   **《百年孤独》**
    *   魔幻现实主义的巅峰，展现了布恩迪亚家族七代人的传奇故事。
*   **《三体》** series
    *   刘慈欣的科幻巨作，对宇宙社会学的深刻探讨。

### 效率类

*   **《Atomic Habits》** (掌控习惯)
    *   微小的改变，如何在长时间内产生巨大的复利效应。

阅读是成本最低的投资。💰
      `
    },
    stats: { likes: 210, comments: 67 }
  },
  {
    id: 109,
    type: 'blog',
    author: { id: 1, name: '梁非凡', avatar: '/avatar.jpg' },
    publishDate: '2周前',
    content: {
      category: '工具',
      title: 'Vim：编辑器之神？',
      images: ['https://images.unsplash.com/photo-1629654297299-c8506221ca97?q=80&w=1000&auto=format&fit=crop'],
      text: `
如何退出 Vim？\`Esc\` + \`:wq\`。学会了这个，你就已经入门了一半。

## 为什么用 Vim？

1.  **双手不离键盘**：极致的编辑效率。
2.  **通用性**：几乎所有 Linux 服务器都预装。
3.  **可定制性**：Lua 脚本让它无所不能。

## 常用快捷键

| 键位 | 功能 |
| :--- | :--- |
| \`i\` | 进入插入模式 |
| \`Esc\` | 退出插入模式 |
| \`:w\` | 保存 |
| \`dd\` | 删除当前行 |
| \`u\` | 撤销 |
| \`gg\` | 跳到首行 |
| \`G\` | 跳到尾行 |

\`\`\`bash
# .vimrc 配置示例
set number
set relativenumber
syntax on
set tabstop=4
\`\`\`

一旦习惯了 Vim 的键位，你会发现鼠标是多余的。⌨️
      `
    },
    stats: { likes: 304, comments: 102 }
  },
  {
    id: 110,
    type: 'blog',
    author: { id: 1, name: '梁非凡', avatar: '/avatar.jpg' },
    publishDate: '1个月前',
    content: {
      category: '工具',
      title: 'Bash 脚本自动化入门',
      images: ['https://images.unsplash.com/photo-1629654297299-c8506221ca97?q=80&w=1000&auto=format&fit=crop'], // Reusing code img
      text: `
懒惰是程序员的美德。手动做两次的事情，就应该写脚本自动化。

## Hello World

\`\`\`bash
#!/bin/bash
echo "Hello, World!"
\`\`\`

## 自动备份脚本

\`\`\`bash
#!/bin/bash

SOURCE_DIR="/var/www/html"
BACKUP_DIR="/backup"
DATE=$(date +%Y-%m-%d)

tar -czf $BACKUP_DIR/backup-$DATE.tar.gz $SOURCE_DIR

echo "Backup completed for $DATE"
\`\`\`

## 循环

\`\`\`bash
for i in {1..5}
do
   echo "Number: $i"
done
\`\`\`

掌握 Shell 脚本，让机器为你工作！🤖
      `
    },
    stats: { likes: 67, comments: 5 }
  }
];
