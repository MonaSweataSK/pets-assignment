import React from 'react';
import styled from 'styled-components';
import { Button } from './Button';

const UsageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 40px;
  background-color: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.radius.lg};
`;

const UsageSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SectionTitle = styled.h3`
  font-family: ${props => props.theme.typography.heading};
  font-size: 18px;
  font-weight: 700;
  color: ${props => props.theme.colors.onSurface};
`;

const ButtonRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
`;

const DownloadIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

export const ButtonUsage: React.FC = () => {
  return (
    <UsageContainer>
      <UsageSection>
        <SectionTitle>Variants</SectionTitle>
        <ButtonRow>
          <Button variant="primary">Primary Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="ghost">Ghost Button</Button>
        </ButtonRow>
      </UsageSection>

      <UsageSection>
        <SectionTitle>Sizes</SectionTitle>
        <ButtonRow>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </ButtonRow>
      </UsageSection>

      <UsageSection>
        <SectionTitle>States</SectionTitle>
        <ButtonRow>
          <Button isLoading>Loading</Button>
          <Button disabled>Disabled</Button>
          <Button variant="secondary" leftIcon={<DownloadIcon />}>With Icon</Button>
        </ButtonRow>
      </UsageSection>
    </UsageContainer>
  );
};
