import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../ui/Button/Button';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// ─── Styled Components ────────────────────────────────────────────────────────

const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
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

// ─── Main Component ───────────────────────────────────────────────────────────

const About: React.FC = () => {
  return (
    <PageWrapper>
      <Navbar />

      <HeroSection>
        <IconCard>
          <PawSVG />
        </IconCard>
        <Headline>The Vision Behind PetGallery</Headline>
        <BodyText>
          PetGallery was born from a simple observation: our companions deserve more than just a place in a phone's camera roll. They deserve a curated, high-fidelity stage. This project is an exploration of editorial-grade web experiences, bridging the gap between digital efficiency and the soul of a boutique art gallery.
        </BodyText>
      </HeroSection>

      <FeaturesSection>
        <Card>
          <CardIcon>
            <SparkIcon />
          </CardIcon>
          <CardTitle>Editorial Excellence</CardTitle>
          <CardBody>
            Every interaction is designed to respect the subject. From optimized WebP delivery to high-resolution JPEG modal views, quality is my primary north star.
          </CardBody>
        </Card>
        <Card>
          <CardIcon>
            <CommunityIcon />
          </CardIcon>
          <CardTitle>Crafted Experience</CardTitle>
          <CardBody>
            Beyond features, this is about feeling. A smooth, glassmorphic interface that lets the warmth of the pet photography shine through without distraction.
          </CardBody>
        </Card>
      </FeaturesSection>

      <div style={{ maxWidth: '1040px', margin: '64px auto', padding: '0 48px' }}>
        <Card style={{ background: 'white', border: '1px solid #f0f0f0' }}>
          <CardTitle style={{ textAlign: 'center', marginBottom: '32px' }}>Modern Tech Stack</CardTitle>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', textAlign: 'center' }}>
            <div>
              <strong style={{ display: 'block', marginBottom: '8px' }}>Framework</strong>
              <span style={{ color: '#666' }}>React 18 & Vite</span>
            </div>
            <div>
              <strong style={{ display: 'block', marginBottom: '8px' }}>Styling</strong>
              <span style={{ color: '#666' }}>Styled Components</span>
            </div>
            <div>
              <strong style={{ display: 'block', marginBottom: '8px' }}>Performance</strong>
              <span style={{ color: '#666' }}>Dynamic Pexels API Optimization</span>
            </div>
            <div>
              <strong style={{ display: 'block', marginBottom: '8px' }}>Routing</strong>
              <span style={{ color: '#666' }}>React Router v7 (Deep Linking)</span>
            </div>
          </div>
        </Card>
      </div>

      <CTAWrapper>
        <CTALayout>
          <CTAImage
            src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=1200"
            alt="Artistic portrait of a dog"
          />
          <CTAContent>
            <CTAHeadline>Explore the Collection</CTAHeadline>
            <BodyText style={{ margin: '0 0 32px', textAlign: 'left' }}>
              Every pet has a story. Whether it's a playful dash or a quiet afternoon nap, every moment is a piece of art waiting to be discovered in our grid.
            </BodyText>
            <Link to="/">
              <Button variant="cta" style={{ alignSelf: 'flex-start' }}>Visit the Gallery</Button>
            </Link>
          </CTAContent>
        </CTALayout>
      </CTAWrapper>
      <Footer />
    </PageWrapper>
  );
};

export default About;
