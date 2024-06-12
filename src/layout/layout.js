// Main Layout

// Default
import { useState, useRef, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

// MUI styles
import { styled } from '@mui/material/styles';

// Custom
import SidebarComponent from '../components/sidebar/SidebarComponent';
import HeaderComponent from '../components/header/HeaderComponent';

const APP_BAR_MOBILE = 20;
const APP_BAR_DESKTOP = 92;

const StyledRoot = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
});

const DashboardLayout = () => {
  const headerRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  const Main = styled('div')(({ theme }) => ({
    flexGrow: 1,
    overflow: 'auto',
    minHeight: '100%',
    paddingTop: APP_BAR_MOBILE + headerHeight,
    paddingBottom: theme.spacing(10),
    [theme.breakpoints.up('lg')]: {
      paddingTop: APP_BAR_DESKTOP + 24,
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  }));
  

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
  }, []);
  const [open, setOpen] = useState(false);
  return (
    <StyledRoot>
      <HeaderComponent onOpenNav={() => setOpen(true)} heightRef={headerRef}/>

      <SidebarComponent openNav={open} onCloseNav={() => setOpen(false)}/>

      <Main>
        <Outlet />
      </Main>
    </StyledRoot>
  );
}

export default DashboardLayout;