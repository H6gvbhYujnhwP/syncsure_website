import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Components
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import FeaturesPage from './components/FeaturesPage';
import Login from './components/Login';
import Pricing from './components/Pricing';
import Dashboard from './components/Dashboard';
import Help from './components/Help';
import About from './components/About';
import Privacy from './components/Privacy';
import Terms from './components/Terms';
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
        <Routes>
          {/* Public Pages with Header/Footer */}
          <Route path="/" element={
            <>
              <Header />
              <main><HomePage /></main>
              <Footer />
            </>
          } />
          <Route path="/home" element={
            <>
              <Header />
              <main><HomePage /></main>
              <Footer />
            </>
          } />
          <Route path="/features" element={
            <>
              <Header />
              <main><FeaturesPage /></main>
              <Footer />
            </>
          } />
          <Route path="/pricing" element={
            <>
              <Header />
              <main><Pricing /></main>
              <Footer />
            </>
          } />
          <Route path="/help" element={
            <>
              <Header />
              <main><Help /></main>
              <Footer />
            </>
          } />
          <Route path="/about" element={
            <>
              <Header />
              <main><About /></main>
              <Footer />
            </>
          } />
          <Route path="/privacy" element={
            <>
              <Header />
              <main><Privacy /></main>
              <Footer />
            </>
          } />
          <Route path="/terms" element={
            <>
              <Header />
              <main><Terms /></main>
              <Footer />
            </>
          } />
          
          {/* Authentication Pages (No Header/Footer) */}
          <Route path="/login" element={<Login />} />
          
          {/* Protected Pages (No Header/Footer - Dashboard has its own header) */}
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

