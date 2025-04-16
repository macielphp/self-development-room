import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LanguageIcon from '@mui/icons-material/Language'; 
import HomeIcon from '@mui/icons-material/Home';
import Avatar from '@mui/material/Avatar';
import { fakeDatabase } from '../../utils/fakeDatabase/fakeDatabase';
import Badge from '@mui/material/Badge';
import NotificationIcon from '@mui/icons-material/Notifications';

const drawerWidth = 240;

// Google data
const userEmail = JSON.parse(localStorage.getItem('users'))?.[0]?.email || '';
const userData = userEmail ? fakeDatabase.getUserByEmail(userEmail) : null;
const userProfilePicture = userData?.profilePicture || ''; // URL da imagem de perfil

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    variants: [
      {
        props: ({ open }) => open,
        style: {
          transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
          marginLeft: 0,
        },
      },
    ],
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleNavigation = (page) => {
    navigate(page);
    setOpen(false);
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{ dispaly: "flex !important", justifyContent: "space-between",backgroundColor: "#FFF"}} variant="regular">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                mr: 2,
              },
              open && { visibility: 'hidden', width: 0, overFlow: 'hidden' },
            ]}
          >
            <MenuIcon
              sx={{
                color:"#121621"
              }} />
          </IconButton>
          <Box sx={{ display: 'flex', gap: '1rem' }}>
            <IconButton color="inherit">
              <Badge badgeContent={3} color="error"> {/* notification number */}
                <NotificationIcon sx={{ fontSize:"1.5rem" , color:"#121621" }} />
              </Badge>
            </IconButton>
            <Avatar 
              alt={userData?.firstName || "User"}
              src={userProfilePicture || "/default-avatar.png"}
              sx={{ width: '40px', height: '40px' }}
            />
          </Box>
        </Toolbar>
        
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: "#121621",
            color: '#fff'
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
        
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon sx={{color:"#fff"}} /> : <ChevronRightIcon />}
          </IconButton>
         
        </DrawerHeader>
        <Divider sx={{ borderColor: "#ffffff60"}}/>
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleNavigation('/home')}>
              <ListItemIcon>
                <HomeIcon sx={{ color: "#FFF"}} />
              </ListItemIcon>
              <ListItemText primary='Home' />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleNavigation('/languagepage')}>
              <ListItemIcon>
                <LanguageIcon sx={{ color: "#FFF"}} />
              </ListItemIcon>
              <ListItemText primary='Languages' />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
      </Main>
    </Box>
  );
}
