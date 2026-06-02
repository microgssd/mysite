import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AuroraBackground from './components/AuroraBackground';
import { CustomCursor, ScrollProgress, Navbar, Footer } from './components/index.js';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import PortfolioPage from './pages/PortfolioPage';
import PricingPage from './pages/PricingPage';
import BlogPage from './pages/BlogPage';
import BlogDetailPage from './pages/BlogDetailPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import './index.css';

export default function App() {
  const [page, setPage] = useState('home');
  const go = useCallback((p) => { setPage(p); window.scrollTo({top:0,behavior:'smooth'}); }, []);

  const renderPage = () => {
    if (page.startsWith('service_')) return <ServiceDetailPage id={page.replace('service_','')} go={go} />;
    if (page.startsWith('blog_')) return <BlogDetailPage id={parseInt(page.replace('blog_',''))} go={go} />;
    switch (page) {
      case 'services':  return <ServicesPage go={go} />;
      case 'portfolio': return <PortfolioPage go={go} />;
      case 'pricing':   return <PricingPage go={go} />;
      case 'blog':      return <BlogPage go={go} />;
      case 'about':     return <AboutPage go={go} />;
      case 'contact':   return <ContactPage go={go} />;
      default:          return <HomePage go={go} />;
    }
  };

  const pageKey = page.startsWith('blog_') ? 'blog_d' : page.startsWith('service_') ? 'svc_d' : page;

  return (
    <div style={{ minHeight:'100vh', background:'var(--bg)', position:'relative' }}>
      <CustomCursor />
      <ScrollProgress />
      <AuroraBackground />
      <div className="tech-grid" />
      <Navbar page={page} go={go} />
      <AnimatePresence mode="wait">
        <motion.main key={pageKey}
          initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-10 }}
          transition={{ duration:.38, ease:[0.16,1,0.3,1] }}
          style={{ position:'relative', zIndex:2 }}>
          {renderPage()}
        </motion.main>
      </AnimatePresence>
      <Footer go={go} />
    </div>
  );
}
