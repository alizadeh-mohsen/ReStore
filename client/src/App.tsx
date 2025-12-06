import './App.css';
import MenuAppBar from './app/layout/MenuAppBar';
import { Container, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './features/home/Home';
import Catalog from './features/catalog/Catalog';
import ProductDetail from './features/catalog/ProductDetail';
import About from './features/about/About';
import Contact from './features/contact/Contact';
import TestErrors from './features/buggy/TestErrors';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BasketComponent from './features/basket/BasketComponent';
import LoadingIconButton from './test';
import { useAppDispatch } from './app/store/configureStore';
import agent from './app/http/agent';
import { setBasket } from './features/basket/basketSlice';
import LoadingCompoent from './app/layout/loading/LoadingComponent';

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useAppDispatch();

  useEffect(() => {
    const buyerId = '58ae70bc-8573-4094-8754-cb5d397b17c7'
    if (buyerId) {
      agent.Basket.get()
        .then(basket => dispatch(setBasket(basket)))
        .catch(error => toast.error(error))
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [setBasket])

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
  if (loading) return <LoadingCompoent></LoadingCompoent>
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position='bottom-right' />
      <CssBaseline />
      <MenuAppBar handleThemeChange={handleThemeChange} darkMode={darkMode} />
      <Route exact path='/' component={Home} />
      <Route path={'/(.+)'} render={() => (
        <Container sx={{ mt: 4 }}>
          <Switch>
            <Route exact path='/catalog' component={Catalog} />
            <Route path='/catalog/:id' component={ProductDetail} />
            <Route path='/about' component={About} />
            <Route path='/contact' component={Contact} />
            <Route path='/testErrors' component={TestErrors} />
            <Route path='/basket' component={BasketComponent} />
            <Route path='/test' component={LoadingIconButton} />
          </Switch>
        </Container>
      )} />

    </ThemeProvider>
  );
}

export default App;
