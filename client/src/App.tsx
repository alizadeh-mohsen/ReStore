import './App.css';
import MenuAppBar from './app/layout/MenuAppBar';
import { Container, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { useState } from 'react';
import { Route } from 'react-router-dom';
import Home from './features/home/Home';
import Catalog from './features/catalog/Catalog';
import ProductDetail from './features/catalog/ProductDetail';
import About from './features/about/About';
import Contact from './features/contact/Contact';

function App() {

  const [darkMode, setDarkMode] = useState(true)
  const paletteType = darkMode ? 'dark' : 'light'

  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === 'dark' ? '#121212' : '#eaeaea'
      }
    }
  });

  function handleThemeChange() {
    setDarkMode(!darkMode)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MenuAppBar handleThemeChange={handleThemeChange} darkMode={darkMode} />
      <Container>
        <Route exact path='/' component={Home} />
        <Route exact path='/catalog' component={Catalog} />
        <Route path='/catalog/:id' component={ProductDetail} />
        <Route path='/about' component={About} />
        <Route path='/contact' component={Contact} />
      </Container>
    </ThemeProvider>
  );
}

export default App;
