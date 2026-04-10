import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import pawHeartSvg from '../assets/svg/paw-heart.svg';

const FooterContainer = styled.footer`
  padding: 80px 48px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: 32px;
  background-color: ${props => props.theme.colors.surface};
  border-top: 1px solid ${props => props.theme.colors.border};
  width: 100%;
`;

const FooterBrand = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const FooterLogoText = styled.span`
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: ${props => props.theme.typography.heading};
  font-weight: 700;
  font-size: 16px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${props => props.theme.colors.onSurface};
`;

const CopyrightText = styled.span`
  font-size: 13px;
  color: ${props => props.theme.colors.outline};
`;

const FooterNav = styled.nav`
  display: flex;
  gap: 32px;
`;

const FooterLink = styled(Link)`
  text-decoration: none;
  font-size: 12px;
  font-weight: 700;
  color: ${props => props.theme.colors.onSurfaceVariant};
  text-transform: uppercase;
  letter-spacing: 0.08em;
  transition: color 0.2s ease;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const Footer: React.FC = () => {
    return (
        <FooterContainer>
            <FooterBrand>
                <FooterLogoText>
                    <img src={pawHeartSvg} alt="PetGallery Logo" width="24" height="24" />
                    PetGallery
                </FooterLogoText>
                <CopyrightText>© 2024 PETGALLERY. EDITORIAL EXCELLENCE IN PET PHOTOGRAPHY.</CopyrightText>
            </FooterBrand>
            <FooterNav>
                <FooterLink to="/privacy">Privacy Policy</FooterLink>
                <FooterLink to="/terms">Terms of Service</FooterLink>
                <FooterLink to="/contact">Contact Us</FooterLink>
            </FooterNav>
        </FooterContainer>
    );
};

export default Footer;
