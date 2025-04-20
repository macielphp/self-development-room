import React from 'react';
import { Box, CssBaseline, AppBar, Toolbar, IconButton, Typography, Drawer, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import PropTypes from 'prop-types';

const drawerWidth = 240;

export default function DrawerLayout({ window, title, navigationItems, children }) {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <List>
                {navigationItems.map(({ text, icon, path }) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton onClick={() => window.location.href = path}>
                            <ListItemIcon>
                                { icon || <InboxIcon /> }
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </div>
    );

    const container = window !== undefined ? () => window.document.body : undefined;

    return(
        <Box sx={{ display: 'flex' }}>
            <CssBaseline/>
            <AppBar 
                position='fixed'
                sx={{
                    width: {sm: `calc(100% - ${drawerWidth}px)`},
                    ml: { sm: `${drawerWidth}px`}
                }}>
                <Toolbar sx={{backgroundColor: "#ffffff"}}>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { sm: 'none' } }}>
                    <MenuIcon />
                </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        {title}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component='nav'
                sx={{ width: {sm: drawerWidth }, flexShrink: {sm: 0} }}
                arial-label='navigation folders'
            >
                <Drawer
                    container={container}
                    variant='temporary'
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{ keepMounted: true }}
                    sx={{ 
                        display: { xs: 'block', sm:'none' },
                        '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth },
                     }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                    >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                {children}
            </Box>
        </Box>
    );
}

DrawerLayout.propTypes = {
    window: PropTypes.func,
    title: PropTypes.string.isRequired,
    navigationItems: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string.isRequired,
        icon: PropTypes.node,
        path: PropTypes.string.isRequired,
      })
    ).isRequired,
    children: PropTypes.node,
  };