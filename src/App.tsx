import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import { GlobalStyles } from './styles/GlobalStyles';
import Home from './pages/Home';
import About from './pages/About';
import PetDetail from './pages/PetDetail';
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
          <Route path="/about" element={<About />} />
          <Route path="/pet/:index" element={<PetDetail />} />
          <Route path="/design-system" element={<DesignSystem />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
