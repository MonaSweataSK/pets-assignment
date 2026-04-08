import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import Home from './pages/Home';
import About from './pages/About';
import PetDetail from './pages/PetDetail';
import { SelectionProvider } from './context/SelectionContext';
import './App.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SelectionProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/pet/:id" element={<PetDetail />} />
          </Routes>
        </Router>
      </SelectionProvider>
    </ThemeProvider>
  );
}

export default App;
