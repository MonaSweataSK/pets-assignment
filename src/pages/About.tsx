import { Link } from 'react-router-dom';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import { Button } from '../ui/Button/Button';

// ─── Design System Types ──────────────────────────────────────────────────────

// Type declaration removed; now managed globally in theme.ts

// ─── Design System Theme ──────────────────────────────────────────────────────

const theme = {
  colors: {
    surface: '#faf9f7',
    container: '#efeeec',
    lowest: '#ffffff',
    primary: '#a43700',
    primaryContainer: '#c94c13',
    onSurface: '#1a1c1b',
    onSurfaceVariant: '#594139',
    outline: '#8c7168',
    border: '#e0bfb4',
  },
  typography: {
    heading: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
    sans: "'Inter', system-ui, -apple-system, sans-serif",
  },
  shadows: {
    soft: '0 12px 32px rgba(140, 113, 104, 0.04)',
    medium: '0 12px 32px rgba(140, 113, 104, 0.08)',
    elevated: '0 20px 48px rgba(140, 113, 104, 0.12)',
  },
  radius: {
    lg: '24px',
    md: '12px',
    sm: '8px',
  }
};

// ─── Global Styles ───────────────────────────────────────────────────────────

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: ${props => props.theme.colors.surface};
    color: ${props => props.theme.colors.onSurfaceVariant};
    font-family: ${props => props.theme.typography.sans};
    -webkit-font-smoothing: antialiased;
  }
  
  * {
    box-sizing: border-box;
  }
`;

// ─── Styled Components ────────────────────────────────────────────────────────

const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Nav = styled.nav`
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 48px;
  height: 80px;
  background-color: rgba(250, 249, 247, 0.8);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
`;

const NavLogo = styled.span`
  font-family: ${props => props.theme.typography.heading};
  font-weight: 700;
  font-size: 20px;
  color: ${props => props.theme.colors.onSurface};
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
  transition: color 0.2s ease;
  
  ${props => props.$active && `
    &::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: ${props.theme.colors.primary};
    }
  `}

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
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
`;

// ─── Hero Section ─────────────────────────────────────────────────────────────

const HeroSection = styled.section`
  padding: 96px 48px 80px;
  max-width: 860px;
  margin: 0 auto;
  text-align: center;
`;

const IconCard = styled.div`
  width: 120px;
  height: 120px;
  background-color: ${props => props.theme.colors.container};
  border-radius: ${props => props.theme.radius.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 40px;
  color: ${props => props.theme.colors.primary};
`;

const Headline = styled.h1`
  font-family: ${props => props.theme.typography.heading};
  font-size: clamp(44px, 6.5vw, 68px);
  font-weight: 700;
  letter-spacing: -0.02em;
  margin: 0 0 28px;
  line-height: 1.05;
  color: ${props => props.theme.colors.onSurface};
`;

const BodyText = styled.p`
  font-size: 18px;
  line-height: 1.7;
  color: ${props => props.theme.colors.onSurfaceVariant};
  max-width: 680px;
  margin: 0 auto;
`;

// ─── Features Grid ────────────────────────────────────────────────────────────

const FeaturesSection = styled.section`
  padding: 64px 48px;
  max-width: 1040px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background-color: ${props => props.theme.colors.lowest};
  padding: 48px;
  border-radius: 28px;
  box-shadow: ${props => props.theme.shadows.soft};
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${props => props.theme.shadows.medium};
  }
`;

const CardIcon = styled.div`
  color: ${props => props.theme.colors.primary};
  margin-bottom: 24px;
`;

const CardTitle = styled.h3`
  font-family: ${props => props.theme.typography.heading};
  font-size: 22px;
  font-weight: 700;
  margin: 0 0 14px;
  color: ${props => props.theme.colors.onSurface};
`;

const CardBody = styled.p`
  font-size: 15px;
  line-height: 1.65;
  color: ${props => props.theme.colors.onSurfaceVariant};
  margin: 0;
`;

// ─── CTA Banner ───────────────────────────────────────────────────────────────

const CTAWrapper = styled.section`
  background-color: ${props => props.theme.colors.container};
  margin-top: 96px;
`;

const CTALayout = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: stretch;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

const CTAImage = styled.img`
  width: 100%;
  height: 640px;
  object-fit: cover;
  display: block;
`;

const CTAContent = styled.div`
  padding: 96px 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  @media (max-width: 640px) {
    padding: 64px 40px;
  }
`;

const CTAHeadline = styled.h2`
  font-family: ${props => props.theme.typography.heading};
  font-size: 42px;
  font-weight: 700;
  margin: 0 0 24px;
  letter-spacing: -0.025em;
  color: ${props => props.theme.colors.onSurface};
`;


// ─── Standard Footer ──────────────────────────────────────────────────────────

const FooterStyled = styled.footer`
  padding: 80px 48px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: 32px;
  border-top: 1px solid ${props => props.theme.colors.border};
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

// ─── SVG Icons ───────────────────────────────────────────────────────────────

const PawSVG = () => (
  <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12,18C9.79,18 8,16.21 8,14C8,11.79 9.79,10 12,10C14.21,10 16,11.79 16,14C16,16.21 14.21,18 12,18M7,7.1C7,8.26 6.06,9.2 4.9,9.2C3.74,9.2 2.8,8.26 2.8,7.1C2.8,5.94 3.74,5 4.9,5C6.06,5 7,5.94 7,7.1M19.1,9.2C20.26,9.2 21.2,8.26 21.2,7.1C21.2,5.94 20.26,5 19.1,5C17.94,5 17,5.94 17,7.1C17,8.26 17.94,9.2 19.1,9.2M12,4.8C10.84,4.8 9.9,3.86 9.9,2.7C9.9,1.54 10.84,0.6 12,0.6C13.16,0.6 14.1,1.54 14.1,2.7C14.1,3.86 13.16,4.8 12,4.8M12,6.5C14.48,6.5 16.5,8.52 16.5,11C16.5,13.48 14.48,15.5 12,15.5C9.52,15.5 7.5,13.48 7.5,11C7.5,8.52 9.52,6.5 12,6.5" />
  </svg>
);

const SparkIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3l1.912 5.886L20 10.8l-5.088 1.914L13 18.6l-1.912-5.886L6 10.8l5.088-1.914L12 3z" />
  </svg>
);

const CommunityIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="8" />
    <path d="M12 8v8" />
    <path d="M8 12h8" />
  </svg>
);

const DarkModeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

// ─── Main Component ───────────────────────────────────────────────────────────

const About: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <PageWrapper>
        <Nav>
          <NavLogo>PetGallery</NavLogo>
          <NavLinks>
            <NavLinkStyled to="/">Home</NavLinkStyled>
            <NavLinkStyled to="/about" $active>About</NavLinkStyled>
            <ThemeToggle aria-label="Toggle dark mode">
              <DarkModeIcon />
            </ThemeToggle>
          </NavLinks>
        </Nav>

        <HeroSection>
          <IconCard>
            <PawSVG />
          </IconCard>
          <Headline>About PetGallery</Headline>
          <BodyText>
            We believe every pet has a story worth telling. PetGallery is a premium editorial space dedicated to the art of pet photography, bridging the gap between digital convenience and the soul of a boutique art gallery. Our mission is to curate the world's most heartwarming moments, providing a sanctuary for owners to celebrate their companions through a lens of excellence and warmth.
          </BodyText>
        </HeroSection>

        <FeaturesSection>
          <Card>
            <CardIcon>
              <SparkIcon />
            </CardIcon>
            <CardTitle>Curated Excellence</CardTitle>
            <CardBody>
              Every image in our ecosystem is treated with the respect of a masterpiece, ensuring your pet's memory is preserved in high fidelity.
            </CardBody>
          </Card>
          <Card>
            <CardIcon>
              <CommunityIcon />
            </CardIcon>
            <CardTitle>Soulful Connection</CardTitle>
            <CardBody>
              Beyond a simple app, we are a community of curators who understand the profound bond between humans and their animals.
            </CardBody>
          </Card>
        </FeaturesSection>

        <CTAWrapper>
          <CTALayout>
            <CTAImage 
              src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=1200" 
              alt="Artistic portrait of a dog" 
            />
            <CTAContent>
              <CTAHeadline>Join Our Journey</CTAHeadline>
              <BodyText style={{ margin: '0 0 32px', textAlign: 'left' }}>
                Start your collection today. Whether it's a playful dash or a quiet afternoon nap, every moment is a piece of art waiting to be framed.
              </BodyText>
              <Button variant="cta" style={{ alignSelf: 'flex-start' }}>Explore Gallery</Button>
            </CTAContent>
          </CTALayout>
        </CTAWrapper>

        <FooterStyled>
          <FooterBrand>
            <FooterLogoText>PetGallery</FooterLogoText>
            <CopyrightText>© 2024 PetGallery. Editorial Excellence in Pet Photography.</CopyrightText>
          </FooterBrand>
          <FooterNav>
            <FooterLink href="#">Privacy Policy</FooterLink>
            <FooterLink href="#">Terms of Service</FooterLink>
            <FooterLink href="#">Contact Us</FooterLink>
          </FooterNav>
        </FooterStyled>
      </PageWrapper>
    </ThemeProvider>
  );
};

export default About;
