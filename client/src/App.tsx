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
import TestErrors from './features/buggy/TestErrors';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const [darkMode, setDarkMode] = useState(false)
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
      <ToastContainer position='bottom-right' />
      <MenuAppBar handleThemeChange={handleThemeChange} darkMode={darkMode} />
      <Container>
        <Route exact path='/' component={Home} />
        <Route exact path='/catalog' component={Catalog} />
        <Route path='/catalog/:id' component={ProductDetail} />
        <Route path='/about' component={About} />
        <Route path='/contact' component={Contact} />
        <Route path='/testErrors' component={TestErrors} />
      </Container>
    </ThemeProvider>
  );
}

export default App;
