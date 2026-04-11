import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import { GlobalStyles } from './styles/GlobalStyles';
import Home from './pages/Home';
import About from './pages/About';
import Privacy from './pages/Privacy.tsx';
import Terms from './pages/Terms.tsx';
import Contact from './pages/Contact.tsx';
import DesignSystem from './pages/DesignSystem';
import { ToastRenderer } from './ui/Toast/Toast';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <ToastRenderer />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pet/:index" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/design-system" element={<DesignSystem />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
