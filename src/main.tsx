import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './RootLayout.tsx';
import Home from './pages/Home.tsx';
import Services from './pages/Services.tsx';
import Tools from './pages/Tools.tsx';
import Journal from './pages/Journal.tsx';
import About from './pages/About.tsx';
import Contact from './pages/Contact.tsx';
import MadeInGeorgia from './pages/MadeInGeorgia.tsx';
import ScrollToTop from './components/ScrollToTop.tsx';
import './index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<Home />} />
              <Route path="services" element={<Services />} />
              <Route path="tools" element={<Tools />} />
              <Route path="made-in-georgia" element={<MadeInGeorgia />} />
              <Route path="journal" element={<Journal />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </HelmetProvider>
  </StrictMode>,
);
