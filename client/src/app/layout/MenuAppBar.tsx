import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import { Badge, Box, IconButton, List, ListItem, Toolbar } from '@mui/material';
import { Link, NavLink } from 'react-router-dom';
import { ShoppingCart } from '@mui/icons-material';
import { useAppSelector } from '../store/configureStore';
import FadeMenu from './FadeMenu';


interface Props {

  darkMode: boolean,
  handleThemeChange: () => void
}

const midLinks = [
  { path: '/catalog', title: 'catalog' },
  { path: '/about', title: 'about' },
  { path: '/contact', title: 'contact' },
  { path: '/testErrors', title: 'testErrors' },

]
const rightLinks = [
  { path: '/signup', title: 'signup' },
  { path: '/login', title: 'login' }
]

const navLinkStyle =
  { color: 'inherit', textDecoration: 'none', '&:hover': { color: 'secondary.main' }, '&.active': { color: 'yellow' } }

export default function MenuAppBar({ handleThemeChange, darkMode }: Props) {
  const { basket } = useAppSelector(state => state.basket)
  const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0)
  const { userDto } = useAppSelector(state => state.account);

  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

        <Box display='felx' alignItems='center'>
          <Typography variant="h6" component={NavLink} to='/' exact
            sx={navLinkStyle}>
            RE-STORE
          </Typography>
          <Switch checked={darkMode} onChange={handleThemeChange} />
        </Box>
        <List sx={{ display: 'flex' }}>
          {
            midLinks.map(({ title, path }) => (
              <ListItem component={NavLink} to={path} key={path} sx={navLinkStyle}>
                {title.toUpperCase()}
              </ListItem>

            ))}
        </List>
        <Box display='flex' alignItems='center'>
          <IconButton sx={{ color: 'inherit' }} component={Link} to='/basket'>
            <Badge badgeContent={itemCount} color='secondary'>
              <ShoppingCart />
            </Badge>
          </IconButton>
          {userDto ? (
            <FadeMenu></FadeMenu>
          ) : (
            <List sx={{ display: 'flex' }}>
              {
                rightLinks.map(({ title, path }) => (
                  <ListItem component={NavLink} to={path} key={path} sx={navLinkStyle}>
                    {title.toUpperCase()}
                  </ListItem>

                ))}
            </List>
          )}

        </Box>
      </Toolbar>
    </AppBar>
  );
}
