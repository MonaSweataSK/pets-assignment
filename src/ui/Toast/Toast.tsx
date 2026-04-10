import React, { useCallback } from 'react';
import { useGlobalState } from 'global-use-state';
import styled, { css, keyframes } from 'styled-components';

export type ToastType = 'success' | 'error' | 'info';
export type ToastPosition = 'top-right' | 'top-center' | 'bottom-right' | 'bottom-center';

export interface ToastOptions {
  type?: ToastType;
  position?: ToastPosition;
  duration?: number;
}

export interface ToastMessage {
  id: string;
  message: string;
  type: ToastType;
  position: ToastPosition;
}

// Animations
const slideInRight = keyframes`
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const slideInTop = keyframes`
  from { transform: translateY(-100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const slideInBottom = keyframes`
  from { transform: translateY(100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const ToastContainer = styled.div<{ $position: ToastPosition }>`
  position: fixed;
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 9999;
  pointer-events: none;
  max-width: 450px;
  width: auto;

  ${props => props.$position === 'top-right' && css`
    top: 24px;
    right: 24px;
    align-items: flex-end;
  `}

  ${props => props.$position === 'top-center' && css`
    top: 24px;
    left: 50%;
    transform: translateX(-50%);
    align-items: center;
  `}

  ${props => props.$position === 'bottom-right' && css`
    bottom: 24px;
    right: 24px;
    align-items: flex-end;
  `}

  ${props => props.$position === 'bottom-center' && css`
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%);
    align-items: center;
  `}
`;

const StyledToast = styled.div<{ $type: ToastType; $position: ToastPosition }>`
  min-width: 280px;
  padding: 14px 20px;
  background-color: ${props => props.theme.colors.lowest};
  border-radius: ${props => props.theme.radius.md};
  box-shadow: ${props => props.theme.shadows.medium};
  display: flex;
  align-items: center;
  gap: 12px;
  pointer-events: auto;
  border-left: 4px solid;

  animation: ${props => {
    if (props.$position.includes('right')) return slideInRight;
    if (props.$position.includes('top')) return slideInTop;
    return slideInBottom;
  }} 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  ${props => props.$type === 'success' && css`border-left-color: #00875a;`}
  ${props => props.$type === 'error' && css`border-left-color: #de350b;`}
  ${props => props.$type === 'info' && css`border-left-color: ${props.theme.colors.primary};`}
`;

const IconWrapper = styled.div<{ $type: ToastType }>`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  ${props => props.$type === 'success' && css`color: #00875a;`}
  ${props => props.$type === 'error' && css`color: #de350b;`}
  ${props => props.$type === 'info' && css`color: ${props.theme.colors.primary};`}
`;

const MessageText = styled.p`
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: ${props => props.theme.colors.onSurface};
  font-family: ${props => props.theme.typography.sans};
`;

const TickIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const CrossIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const InfoIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

const POSITIONS: ToastPosition[] = ['top-right', 'top-center', 'bottom-right', 'bottom-center'];

export const useToast = () => {
  const [, setToasts] = useGlobalState('toasts', []);

  const showToast = useCallback((message: string, options: ToastOptions = {}) => {
    const { type = 'success', position = 'top-right', duration = 5000 } = options;
    const id = Math.random().toString(36).substr(2, 9);
    
    setToasts((prev) => [...prev, { id, message, type, position }]);
    
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, [setToasts]);

  return { showToast };
};

export const ToastRenderer: React.FC = () => {
  const [toasts] = useGlobalState('toasts', []);

  return (
    <>
      {POSITIONS.map(pos => {
        const positionToasts = toasts.filter(t => t.position === pos);
        if (positionToasts.length === 0) return null;

        return (
          <ToastContainer key={pos} $position={pos}>
            {positionToasts.map((toast) => (
              <StyledToast key={toast.id} $type={toast.type} $position={toast.position}>
                <IconWrapper $type={toast.type}>
                  {toast.type === 'error' ? (
                    <CrossIcon />
                  ) : toast.type === 'info' ? (
                    <InfoIcon />
                  ) : (
                    <TickIcon />
                  )}
                </IconWrapper>
                <MessageText>{toast.message}</MessageText>
              </StyledToast>
            ))}
          </ToastContainer>
        );
      })}
    </>
  );
};
