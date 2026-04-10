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

const Privacy: React.FC = () => {
    return (
        <PageWrapper>
            <Navbar />
            <Content>
                <Title>Privacy Policy</Title>
                <Section>
                    <SectionTitle>1. Information We Collect</SectionTitle>
                    <Text>
                        At PetGallery, we collect minimal information to provide you with the best experience. This includes images you choose to download and your preferences within the app.
                    </Text>
                </Section>
                <Section>
                    <SectionTitle>2. How We Use Data</SectionTitle>
                    <Text>
                        Your data is used solely to enhance the functionality of the gallery, such as maintaining your multi-selection states during a session. We do not sell your data to third parties.
                    </Text>
                </Section>
                <Section>
                    <SectionTitle>3. Image Property</SectionTitle>
                    <Text>
                        All pet images are sourced from the Eulerity API. Please refer to their terms for specific usage rights regarding the pet photographs.
                    </Text>
                </Section>
            </Content>
            <Footer />
        </PageWrapper>
    );
};

export default Privacy;
