import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Components
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import FeaturesPage from './components/FeaturesPage';
import Footer from './components/Footer';

// Home Page Component
const HomePage = () => (
  <>
    <Hero />
    <Features />
  </>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/features" element={<FeaturesPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
