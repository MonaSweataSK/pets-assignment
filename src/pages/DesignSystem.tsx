import React from 'react';
import styled from 'styled-components';
import { ButtonUsage } from '../ui/Button/ButtonUsage';
import { ToolbarUsage } from '../ui/Toolbar/ToolbarUsage';
import { DropdownUsage } from '../ui/Dropdown/DropdownUsage';
import { ToastUsage } from '../ui/Toast/ToastUsage';
import Navbar from '../components/Navbar';

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: ${props => props.theme.colors.surface};
  display: flex;
  flex-direction: column;
`;

const Content = styled.main`
  padding: 80px 48px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 80px;
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 40px;
`;

const Title = styled.h1`
  font-family: ${props => props.theme.typography.heading};
  font-size: 48px;
  font-weight: 800;
  color: ${props => props.theme.colors.onSurface};
  letter-spacing: -0.02em;
`;

const Subtitle = styled.p`
  font-size: 18px;
  color: ${props => props.theme.colors.onSurfaceVariant};
  max-width: 600px;
  line-height: 1.6;
`;

const SectionHeader = styled.div`
  border-bottom: 2px solid ${props => props.theme.colors.container};
  padding-bottom: 16px;
  margin-bottom: 24px;
`;

const SectionTitle = styled.h2`
  font-family: ${props => props.theme.typography.heading};
  font-size: 24px;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

const DesignSystem: React.FC = () => {
    return (
        <PageContainer>
            <Navbar />
            <Content>
                <Header>
                    <Title>Design Library</Title>
                    <Subtitle>
                        A preview of all custom UI components developed for the Pet Gallery. 
                        Each section demonstrates the available variants, sizes, and interactive states.
                    </Subtitle>
                </Header>

                <section>
                    <SectionHeader>
                        <SectionTitle>Buttons</SectionTitle>
                    </SectionHeader>
                    <ButtonUsage />
                </section>

                <section>
                    <SectionHeader>
                        <SectionTitle>Toolbars</SectionTitle>
                    </SectionHeader>
                    <ToolbarUsage />
                </section>

                <section>
                    <SectionHeader>
                        <SectionTitle>Dropdowns</SectionTitle>
                    </SectionHeader>
                    <DropdownUsage />
                </section>

                <section>
                    <SectionHeader>
                        <SectionTitle>Toasts & Notifications</SectionTitle>
                    </SectionHeader>
                    <ToastUsage />
                </section>
            </Content>
        </PageContainer>
    );
};

export default DesignSystem;
