import React from 'react';
import styled from 'styled-components';

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

const FooterLink = styled.a`
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
                <FooterLogoText>PetGallery</FooterLogoText>
                <CopyrightText>© 2024 PETGALLERY. EDITORIAL EXCELLENCE IN PET PHOTOGRAPHY.</CopyrightText>
            </FooterBrand>
            <FooterNav>
                <FooterLink href="#">Privacy Policy</FooterLink>
                <FooterLink href="#">Terms of Service</FooterLink>
                <FooterLink href="#">Contact Us</FooterLink>
            </FooterNav>
        </FooterContainer>
    );
};

export default Footer;
