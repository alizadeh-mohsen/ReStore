import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import { Badge, Box, IconButton, List, ListItem, Toolbar } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { ShoppingCart } from '@mui/icons-material';


interface Props {

  darkMode: boolean,
  handleThemeChange: () => void
}

const midLinks = [
  { path: '/catalog', title: 'catalog' },
  { path: '/about', title: 'about' },
  { path: '/contact', title: 'contact' }
]
const rightLinks = [
  { path: '/resgister', title: 'register' },
  { path: '/login', title: 'login' }
]

const navLinkStyle =
  { color: 'inherit', textDecoration: 'none', '&:hover': { color: 'secondary.main' }, '&.active': { color: 'yellow' } }

export default function MenuAppBar({ handleThemeChange, darkMode }: Props) {

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
          <IconButton sx={{ color: 'inherit' }}>
            <Badge badgeContent={4}>
              <ShoppingCart />
            </Badge>
          </IconButton>

          <List sx={{ display: 'flex' }}>
            {
              rightLinks.map(({ title, path }) => (
                <ListItem component={NavLink} to={path} key={path} sx={navLinkStyle}>
                  {title.toUpperCase()}
                </ListItem>

              ))}
          </List>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
