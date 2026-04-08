import React, { useState } from 'react';
import styled from 'styled-components';
import { useToast, ToastProvider } from './Toast';
import type { ToastPosition, ToastType } from './Toast';
import { Button } from '../Button/Button';

const UsageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 40px;
  background-color: ${props => props.theme.colors.surface};
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

const ControlGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 24px;
  padding: 20px;
  background-color: ${props => props.theme.colors.container};
  border-radius: ${props => props.theme.radius.md};
  margin-bottom: 24px;
`;

const ControlLabel = styled.label`
  display: block;
  font-size: 13px;
  font-weight: 700;
  color: ${props => props.theme.colors.onSurfaceVariant};
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border-radius: ${props => props.theme.radius.sm};
  border: 1px solid ${props => props.theme.colors.border};
  font-family: inherit;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: ${props => props.theme.radius.sm};
  border: 1px solid ${props => props.theme.colors.border};
  font-family: inherit;
`;

const ButtonRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
`;

const ToastTester: React.FC = () => {
  const { showToast } = useToast();
  const [position, setPosition] = useState<ToastPosition>('top-right');
  const [duration, setDuration] = useState<number>(3000);

  const triggerToast = (type: ToastType, message: string) => {
    showToast(message, { type, position, duration });
  };

  return (
    <>
      <ControlGrid>
        <div>
          <ControlLabel>Position</ControlLabel>
          <Select
            value={position}
            onChange={(e) => setPosition(e.target.value as ToastPosition)}
          >
            <option value="top-right">Top Right</option>
            <option value="top-center">Top Center</option>
            <option value="bottom-right">Bottom Right</option>
            <option value="bottom-center">Bottom Center</option>
          </Select>
        </div>
        <div>
          <ControlLabel>Duration (ms)</ControlLabel>
          <Input
            type="number"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            step={500}
            min={1000}
          />
        </div>
      </ControlGrid>

      <ButtonRow>
        <Button onClick={() => triggerToast('success', 'Operation completed!')}>
          Show Success
        </Button>
        <Button variant="secondary" onClick={() => triggerToast('error', 'Something went wrong!')}>
          Show Error
        </Button>
        <Button variant="ghost" onClick={() => triggerToast('info', 'System message with some information.')}>
          Show Info
        </Button>
      </ButtonRow>
    </>
  );
};

export const ToastUsage: React.FC = () => {
  return (
    <UsageContainer>
      <UsageSection>
        <p style={{ fontSize: '14px', color: '#666' }}>
          Configure the position and duration below, then click a button to test the enhanced notification system.
        </p>
        <ToastTester />
      </UsageSection>
    </UsageContainer>
  );
};

export const StandaloneToastUsage = () => (
  <ToastProvider>
    <ToastUsage />
  </ToastProvider>
);
