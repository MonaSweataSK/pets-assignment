import React from 'react';
import styled, { css } from 'styled-components';

interface ToolbarProps {
  children: React.ReactNode;
  isFixed?: boolean;
}

const StyledToolbar = styled.div<{ $isFixed?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 48px;
  background-color: ${props => props.theme.colors.lowest};
  border-bottom: 1px solid ${props => props.theme.colors.container};
  gap: 24px;
  z-index: 50;

  ${props => props.$isFixed && css`
    position: fixed;
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%);
    width: auto;
    min-width: 320px;
    border-radius: ${props.theme.radius.lg};
    box-shadow: ${props.theme.shadows.medium};
    border: 1px solid ${props.theme.colors.border};
    padding: 12px 24px;
  `}

  @media (max-width: 640px) {
    flex-direction: column;
    gap: 16px;
    padding: 16px 24px;
    align-items: flex-start;
  }
`;

export const ToolbarGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
`;

export const Toolbar: React.FC<ToolbarProps> = ({ children, isFixed }) => {
  return (
    <StyledToolbar $isFixed={isFixed}>
      {children}
    </StyledToolbar>
  );
};
