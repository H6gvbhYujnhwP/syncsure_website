import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import FeaturesPage from './components/FeaturesPage';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import LoginFixed from './components/LoginFixed';
import Dashboard from './components/Dashboard';
import Help from './components/Help';
import About from './components/About';
import Privacy from './components/Privacy';
import Terms from './components/Terms';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Home Page */}
          <Route path="/" element={
            <>
              <Header />
              <Hero />
              <Features />
              <Footer />
            </>
          } />
          
          {/* Login Page */}
          <Route path="/login" element={<LoginFixed />} />
          
          {/* Dashboard Page */}
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* Features Page */}
          <Route path="/features" element={
            <>
              <Header />
              <FeaturesPage />
              <Footer />
            </>
          } />
          
          {/* Pricing Page */}
          <Route path="/pricing" element={
            <>
              <Header />
              <Pricing />
              <Footer />
            </>
          } />
          
          {/* Help Page */}
          <Route path="/help" element={
            <>
              <Header />
              <Help />
              <Footer />
            </>
          } />
          
          {/* About Page */}
          <Route path="/about" element={
            <>
              <Header />
              <About />
              <Footer />
            </>
          } />
          
          {/* Privacy Page */}
          <Route path="/privacy" element={
            <>
              <Header />
              <Privacy />
              <Footer />
            </>
          } />
          
          {/* Terms Page */}
          <Route path="/terms" element={
            <>
              <Header />
              <Terms />
              <Footer />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
