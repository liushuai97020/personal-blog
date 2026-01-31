import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import MainLayout from './layout/MainLayout';
import Home from './pages/Home';
import GenericPage from './pages/GenericPage';
import { ThemeProvider } from './context/ThemeContext';
import ThemeToggle from './components/ui/ThemeToggle';
import { MusicProvider } from './context/MusicContext';
import './styles/main.scss'; // Ensure styles are imported

// Content wrapper to handle route transitions
const AnimatedRoutes = () => {
    const location = useLocation();
    
    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/hot" element={<GenericPage title="热门博客" />} />
                <Route path="/photos" element={<GenericPage title="摄影日记" />} />
                <Route path="/tools" element={<GenericPage title="工具集" />} />
                <Route path="/about" element={<GenericPage title="关于我" />} />
            </Routes>
        </AnimatePresence>
    );
};

function App() {
  return (
    <Router>
        <ThemeProvider>
            <MusicProvider>
                <ThemeToggle />
                <MainLayout>
                    <AnimatedRoutes />
                </MainLayout>
            </MusicProvider>
        </ThemeProvider>
    </Router>
  );
}

export default App;
