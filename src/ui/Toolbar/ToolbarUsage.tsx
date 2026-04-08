import React from 'react';
import styled from 'styled-components';
import { Toolbar, ToolbarGroup } from './Toolbar';
import { Button } from '../Button/Button';

const UsageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
  padding: 40px;
  background-color: ${props => props.theme.colors.surface};
`;

const UsageSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SectionTitle = styled.h3`
  font-family: ${props => props.theme.typography.heading};
  font-size: 18px;
  font-weight: 700;
  color: ${props => props.theme.colors.onSurface};
`;

const SelectionInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  font-weight: 600;
  color: ${props => props.theme.colors.onSurface};
`;

export const ToolbarUsage: React.FC = () => {
  return (
    <UsageContainer>
      <UsageSection>
        <SectionTitle>Standard Toolbar</SectionTitle>
        <Toolbar>
          <ToolbarGroup>
            <SelectionInfo>12 items selected • 8.4 MB</SelectionInfo>
            <Button variant="ghost" size="sm">Select All</Button>
            <Button variant="ghost" size="sm">Clear</Button>
          </ToolbarGroup>
          <Button size="sm">Download Selected</Button>
        </Toolbar>
      </UsageSection>

      <UsageSection>
        <SectionTitle>Action Buttons Grouping</SectionTitle>
        <Toolbar>
          <ToolbarGroup>
            <Button variant="secondary">Cancel</Button>
            <Button variant="secondary">Save Draft</Button>
          </ToolbarGroup>
          <Button>Publish Now</Button>
        </Toolbar>
      </UsageSection>
    </UsageContainer>
  );
};
