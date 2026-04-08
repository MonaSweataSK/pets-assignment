import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 48px;
  height: 80px;
  background-color: rgba(250, 249, 247, 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid ${props => props.theme.colors.container};
`;

const Logo = styled(Link)`
  font-family: ${props => props.theme.typography.heading};
  font-weight: 700;
  font-size: 22px;
  color: ${props => props.theme.colors.onSurface};
  text-decoration: none;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
`;

const NavLinkStyled = styled(Link)<{ $active?: boolean }>`
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  color: ${props => props.$active ? props.theme.colors.primary : props.theme.colors.onSurfaceVariant};
  position: relative;
  transition: all 0.2s ease;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }

  ${props => props.$active && `
    &::after {
      content: '';
      position: absolute;
      bottom: -6px;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: ${props.theme.colors.primary};
      border-radius: 2px;
    }
  `}
`;

const ThemeToggle = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  color: ${props => props.theme.colors.onSurface};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${props => props.theme.colors.container};
  }
`;

const DarkModeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const Navbar: React.FC = () => {
  const location = useLocation();

  return (
    <Nav>
      <Logo to="/">PetGallery</Logo>
      <NavLinks>
        <NavLinkStyled to="/" $active={location.pathname === '/'}>Home</NavLinkStyled>
        <NavLinkStyled to="/about" $active={location.pathname === '/about'}>About</NavLinkStyled>
        <ThemeToggle aria-label="Toggle dark mode">
          <DarkModeIcon />
        </ThemeToggle>
      </NavLinks>
    </Nav>
  );
};

export default Navbar;
