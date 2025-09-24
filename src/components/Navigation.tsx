import React, { useEffect, useState } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton'; // This is already imported
import LightModeIcon from '@mui/icons-material/LightMode';
import List from '@mui/material/List';
import ListIcon from '@mui/icons-material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import "../assets/styles/Navigation.scss";

const drawerWidth = 240;
const navItems = [['Expertise', 'expertise'], ['History', 'history'], ['Projects', 'projects'], ['Contact', 'contact']];

function Navigation({parentToChild, modeChange}: any) {
  const {mode} = parentToChild;
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.getElementById("navigation");
      if (navbar) {
        const scrolled = window.scrollY > navbar.clientHeight;
        setScrolled(scrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.error(`Element with id "${section}" not found`);
    }
  };

  const drawer = (
    <Box className={`navigation-bar-responsive ${mode}-mode`} onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <p className="mobile-menu-top"><ListIcon/>Menu</p>
      <Divider className={`divider-${mode}`} />
      <List>
        {navItems.map((item) => (
          <ListItem key={item[0]} disablePadding>
            <ListItemButton className={`list-item-button-${mode}`} sx={{ textAlign: 'center' }} onClick={() => scrollToSection(item[1])}>
              <ListItemText primary={item[0]} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar 
        component="nav" 
        id="navigation" 
        className={`navbar-fixed-top ${scrolled ? 'scrolled' : ''} ${mode}-mode`}
      >
        <Toolbar className="navigation-bar">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={`icon-button-${mode}`}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          
          {/* CORRECT IMPLEMENTATION FOR ACCESSIBILITY */}
          <IconButton
            color="inherit"
            aria-label={mode === 'dark' ? 'toggle light mode' : 'toggle dark mode'}
            onClick={() => modeChange()}
            className={`theme-icon-${mode}`}
          >
            {mode === 'dark' ? (
              <LightModeIcon />
            ) : (
              <DarkModeIcon />
            )}
          </IconButton>

          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Button 
                key={item[0]} 
                onClick={() => scrollToSection(item[1])} 
                className={`nav-button-${mode}`}
              >
                {item[0]}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          className={`drawer-${mode}`}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}

export default Navigation;