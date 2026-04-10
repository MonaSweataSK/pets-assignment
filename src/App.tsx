import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import Home from './pages/Home';
import About from './pages/About';
import PetDetail from './pages/PetDetail';
import DesignSystem from './pages/DesignSystem';
import { SelectionProvider } from './context/SelectionContext';
import { ToastProvider } from './ui/Toast/Toast';
import './App.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ToastProvider>
        <SelectionProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/pet/:index" element={<PetDetail />} />
              <Route path="/design-system" element={<DesignSystem />} />
            </Routes>
          </Router>
        </SelectionProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
