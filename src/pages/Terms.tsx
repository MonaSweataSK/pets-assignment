import React from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${props => props.theme.colors.surface};
`;

const Content = styled.main`
  flex: 1;
  max-width: 800px;
  margin: 0 auto;
  padding: 80px 24px;
`;

const Title = styled.h1`
  font-family: ${props => props.theme.typography.heading};
  font-size: 48px;
  margin-bottom: 40px;
  color: ${props => props.theme.colors.onSurface};
`;

const Section = styled.section`
  margin-bottom: 40px;
`;

const SectionTitle = styled.h2`
  font-family: ${props => props.theme.typography.heading};
  font-size: 24px;
  margin-bottom: 16px;
  color: ${props => props.theme.colors.onSurface};
`;

const Text = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: ${props => props.theme.colors.onSurfaceVariant};
  margin-bottom: 16px;
`;

const Terms: React.FC = () => {
    return (
        <PageWrapper>
            <Navbar />
            <Content>
                <Title>Terms of Service</Title>
                <Section>
                    <SectionTitle>1. Acceptance of Terms</SectionTitle>
                    <Text>
                        By accessing PetGallery, you agree to be bound by these terms. If you do not agree, please do not use the application.
                    </Text>
                </Section>
                <Section>
                    <SectionTitle>2. Use License</SectionTitle>
                    <Text>
                        You are granted a limited license to browse the gallery and download pet images for personal, non-commercial use only.
                    </Text>
                </Section>
                <Section>
                    <SectionTitle>3. Disclaimer</SectionTitle>
                    <Text>
                        The images are provided "as is". PetGallery makes no warranties regarding the accuracy or availability of the pet data provided by the third-party API.
                    </Text>
                </Section>
            </Content>
            <Footer />
        </PageWrapper>
    );
};

export default Terms;
