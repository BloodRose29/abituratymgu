import { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Assistant from './components/Assistant';
import HomePage from './pages/HomePage';
import ForeignPage from './pages/ForeignPage';
import StudentPage from './pages/StudentPage';
import DormPage from './pages/DormPage';
import AboutPage from './pages/AboutPage';

const TITLES: Record<string, string> = {
  '/': 'Абитуриенту ТюмГУ — всё о поступлении, документах и жизни',
  '/foreign': 'Иностранным студентам — Абитуриенту ТюмГУ',
  '/student': 'Студентам и первокурснику — Абитуриенту ТюмГУ',
  '/dorm': 'Общежития ТюмГУ — Абитуриенту ТюмГУ',
  '/about': 'О нас — авторы и помощники — Абитуриенту ТюмГУ',
};

/** Скролл к разделу при переходе по адресу вида /page/anchor. */
function AnchorScroll() {
  const { pathname } = useLocation();
  useEffect(() => {
    const parts = pathname.split('/').filter(Boolean);
    if (parts.length >= 2) {
      const id = parts[parts.length - 1];
      requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        else window.scrollTo(0, 0);
      });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);
  return null;
}

function PageTitle() {
  const { pathname } = useLocation();
  useEffect(() => {
    const key = `/${pathname.split('/')[1] || ''}`;
    document.title = TITLES[key] ?? TITLES['/'];
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <HashRouter>
      <div className="app">
        <Header />
        <main>
          <AnchorScroll />
          <PageTitle />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/foreign" element={<ForeignPage />} />
            <Route path="/foreign/:anchor" element={<ForeignPage />} />
            <Route path="/student" element={<StudentPage />} />
            <Route path="/student/:anchor" element={<StudentPage />} />
            <Route path="/dorm" element={<DormPage />} />
            <Route path="/dorm/:anchor" element={<DormPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/about/:anchor" element={<AboutPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>
        <Footer />
        <Assistant />
      </div>
    </HashRouter>
  );
}