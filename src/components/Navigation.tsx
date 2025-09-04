// import React, { useEffect, useState } from "react";
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import DarkModeIcon from '@mui/icons-material/DarkMode';
// import Divider from '@mui/material/Divider';
// import Drawer from '@mui/material/Drawer';
// import IconButton from '@mui/material/IconButton';
// import LightModeIcon from '@mui/icons-material/LightMode';
// import List from '@mui/material/List';
// import ListIcon from '@mui/icons-material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemText from '@mui/material/ListItemText';
// import MenuIcon from '@mui/icons-material/Menu';
// import Toolbar from '@mui/material/Toolbar';

// const drawerWidth = 240;
// const navItems = [['Expertise', 'expertise'], ['History', 'history'], ['Projects', 'projects'], ['Contact', 'contact']];

// function Navigation({parentToChild, modeChange}: any) {

//   const {mode} = parentToChild;

//   const [mobileOpen, setMobileOpen] = useState<boolean>(false);
//   const [scrolled, setScrolled] = useState<boolean>(false);

//   const handleDrawerToggle = () => {
//     setMobileOpen((prevState) => !prevState);
//   };

//   useEffect(() => {
//     const handleScroll = () => {
//       const navbar = document.getElementById("navigation");
//       if (navbar) {
//         const scrolled = window.scrollY > navbar.clientHeight;
//         setScrolled(scrolled);
//       }
//     };

//     window.addEventListener('scroll', handleScroll);

//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

//   const scrollToSection = (section: string) => {
//     console.log(section)
//     const expertiseElement = document.getElementById(section);
//     if (expertiseElement) {
//       expertiseElement.scrollIntoView({ behavior: 'smooth' });
//       console.log('Scrolling to:', expertiseElement);  // Debugging: Ensure the element is found
//     } else {
//       console.error('Element with id "expertise" not found');  // Debugging: Log error if element is not found
//     }
//   };

//   const drawer = (
//     <Box className="navigation-bar-responsive" onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
//       <p className="mobile-menu-top"><ListIcon/>Menu</p>
//       <Divider />
//       <List>
//         {navItems.map((item) => (
//           <ListItem key={item[0]} disablePadding>
//             <ListItemButton sx={{ textAlign: 'center' }} onClick={() => scrollToSection(item[1])}>
//               <ListItemText primary={item[0]} />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>
//     </Box>
//   );

//   return (
//     <Box sx={{ display: 'flex' }}>
//       <CssBaseline />
//       <AppBar component="nav" id="navigation" className={`navbar-fixed-top${scrolled ? ' scrolled' : ''}`}>
//         <Toolbar className='navigation-bar'>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             edge="start"
//             onClick={handleDrawerToggle}
//             sx={{ mr: 2, display: { sm: 'none' } }}
//           >
//             <MenuIcon />
//           </IconButton>
//           {mode === 'dark' ? (
//             <LightModeIcon onClick={() => modeChange()}/>
//           ) : (
//             <DarkModeIcon onClick={() => modeChange()}/>
//           )}
//           <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
//             {navItems.map((item) => (
//               <Button key={item[0]} onClick={() => scrollToSection(item[1])} sx={{ color: '#fff' }}>
//                 {item[0]}
//               </Button>
//             ))}
//           </Box>
//         </Toolbar>
//       </AppBar>
//       <nav>
//         <Drawer
//           variant="temporary"
//           open={mobileOpen}
//           onClose={handleDrawerToggle}
//           ModalProps={{
//             keepMounted: true, // Better open performance on mobile.
//           }}
//           sx={{
//             display: { xs: 'block', sm: 'none' },
//             '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
//           }}
//         >
//           {drawer}
//         </Drawer>
//       </nav>
//     </Box>
//   );
// }

// export default Navigation;


import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import ListIcon from "@mui/icons-material/List";

type NavItem = [label: string, id: string];

const drawerWidth = 280;
const navItems: NavItem[] = [
  ["Expertise", "expertise"],
  ["History", "history"],
  ["Projects", "projects"],
  ["Contact", "contact"],
];

type Props = {
  parentToChild: { mode: "light" | "dark" };
  modeChange: () => void;
};

function Navigation({ parentToChild, modeChange }: Props) {
  const { mode } = parentToChild;

  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>(navItems[0][1]);
  const appbarRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const handleDrawerToggle = () => setMobileOpen((prev) => !prev);

  // Smooth scroll with header offset
  const scrollToSection = useCallback((sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (!el) return;

    const headerH = appbarRef.current?.offsetHeight ?? 0;
    const rect = el.getBoundingClientRect();
    const targetY = window.scrollY + rect.top - (headerH + 8); // little breathing room

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({
      top: Math.max(0, targetY),
      behavior: prefersReduced ? "auto" : "smooth",
    });

    setActive(sectionId);
  }, []);
  useEffect(()=>{ console.log('scrolled?', scrolled); }, [scrolled]);


  // Toggle glass opacity strength on scroll
  useEffect(() => {
    const onScroll = () => {
      const headerH = appbarRef.current?.offsetHeight ?? 64;
      setScrolled(window.scrollY > headerH * 0.5);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll spy (active link) via IntersectionObserver
  useEffect(() => {
    const opts: IntersectionObserverInit = {
      root: null,
      rootMargin: "-40% 0px -55% 0px", // focus around viewport middle
      threshold: 0,
    };

    const sections = navItems
      .map(([, id]) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    observerRef.current?.disconnect();
    const obs = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];
      if (visible?.target?.id) setActive(visible.target.id);
    }, opts);

    sections.forEach((s) => obs.observe(s));
    observerRef.current = obs;

    return () => obs.disconnect();
  }, []);

  const drawer = (
    <Box
      className="navigation-bar-responsive"
      role="menu"
      aria-label="Mobile navigation"
      sx={{ textAlign: "center", height: "100%" }}
      onClick={handleDrawerToggle}
    >
      <p className="mobile-menu-top" style={{ display: "flex", gap: 8, alignItems: "center", padding: 16 }}>
        <ListIcon /> Menu
      </p>
      <Divider />
      <List>
        {navItems.map(([label, id]) => (
          <ListItem key={id} disablePadding>
            <ListItemButton
              sx={{ textAlign: "center" }}
              onClick={() => scrollToSection(id)}
              selected={active === id}
              role="menuitem"
              aria-current={active === id ? "page" : undefined}
            >
              <ListItemText primary={label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider sx={{ mt: "auto" }} />
      <Box sx={{ p: 2 }}>
        <Button
          fullWidth
          variant="outlined"
          onClick={(e) => {
            e.stopPropagation();
            modeChange();
          }}
          aria-label={`Switch to ${mode === "dark" ? "light" : "dark"} mode`}
          startIcon={mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
        >
          {mode === "dark" ? "Light mode" : "Dark mode"}
        </Button>
      </Box>
    </Box>
  );

  // Glass effect styles: lighter at top, more opaque when scrolled
const appBarSx = useMemo(
  () => ({
    // frosted glass
    backdropFilter: "saturate(140%) blur(14px)",
    WebkitBackdropFilter: "saturate(140%) blur(14px)",

    // dynamic background **with !important** so it wins over MUI classes or your CSS
    backgroundColor:
      mode === "dark"
        ? (scrolled ? "rgba(17, 24, 39, .75) !important " : "rgba(17, 24, 39, .35) !important")
        : (scrolled ? "rgba(255, 255, 255, .78) !important" : "rgba(255, 255, 255, .36) !important"),

    boxShadow: scrolled ? "0 8px 24px rgba(0,0,0,.12)" : "0 2px 10px rgba(0,0,0,.06)",
    transition: "background-color .25s ease, box-shadow .25s ease",
    borderBottom: mode === "dark" ? "1px solid rgba(255,255,255,.06)" : "1px solid rgba(17,24,39,.06)",
    zIndex: (theme: any) => theme.zIndex.drawer + 1,
  }),
  [mode, scrolled]
);


  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* keyboard skip link */}
      <a href="#expertise" className="skip-link">
        Skip to content
      </a>

      <AppBar
        ref={appbarRef}
        component="nav"
        id="navigation"
        position="fixed"
        className={`navbar-fixed-top${scrolled ? " scrolled" : ""}`}
        sx={appBarSx}
        elevation={0}
      >
        <Toolbar className="navigation-bar" sx={{ gap: 1, minHeight: 64 }}>
          {/* Mobile menu */}
          <IconButton
            color="inherit"
            aria-label="Open menu"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 1, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          {/* Mode toggle */}
          <IconButton
            color="inherit"
            aria-label={`Switch to ${mode === "dark" ? "light" : "dark"} mode`}
            onClick={modeChange}
          >
            {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>

          {/* Desktop nav */}
          <Box component="ul" sx={{ display: { xs: "none", sm: "flex" }, gap: 0.5, ml: 1, p: 0, m: 0 }}>
            {navItems.map(([label, id]) => (
              <li key={id} style={{ listStyle: "none" }}>
                <Button
                  onClick={() => scrollToSection(id)}
                  sx={{
                    color: "inherit",
                    opacity: active === id ? 1 : 0.85,
                    fontWeight: active === id ? 700 : 500,
                    textTransform: "none",
                    borderRadius: "10px",
                    px: 1.2,
                    "&:hover": { opacity: 1, background: "rgba(255,255,255,.08)" },
                  }}
                  aria-current={active === id ? "page" : undefined}
                >
                  {label}
                </Button>
              </li>
            ))}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile drawer */}
      <nav aria-label="Mobile">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              backgroundColor: mode === "dark" ? "rgba(17,24,39,.9)" : "rgba(255,255,255,.9)",
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}

export default Navigation;
