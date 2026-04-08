import React from 'react';
import styled, { css } from 'styled-components';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'cta';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const getVariantStyles = (variant: ButtonVariant = 'primary', theme: any) => {
  switch (variant) {
    case 'primary':
      return css`
        background-color: ${theme.colors.primary};
        color: white;
        box-shadow: 0 4px 12px rgba(164, 55, 0, 0.2);
        &:hover:not(:disabled) {
          background-color: ${theme.colors.primaryContainer};
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(164, 55, 0, 0.3);
        }
      `;
    case 'secondary':
      return css`
        background-color: ${theme.colors.container};
        color: ${theme.colors.onSurface};
        &:hover:not(:disabled) {
          background-color: ${theme.colors.border};
        }
      `;
    case 'ghost':
      return css`
        background: none;
        color: ${theme.colors.onSurfaceVariant};
        &:hover:not(:disabled) {
          color: ${theme.colors.primary};
          background-color: rgba(164, 55, 0, 0.05);
        }
      `;
    case 'cta':
      return css`
        background: linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.primaryContainer});
        color: white;
        box-shadow: 0 8px 24px rgba(164, 55, 0, 0.2);
        &:hover:not(:disabled) {
          filter: brightness(1.1);
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(164, 55, 0, 0.3);
        }
      `;
    default:
      return '';
  }
};

const StyledButton = styled.button<{ $variant?: ButtonVariant; $size?: 'sm' | 'md' | 'lg' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border: none;
  cursor: pointer;
  font-family: ${props => props.theme.typography.sans};
  font-weight: 700;
  border-radius: ${props => props.theme.radius.md};
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;

  ${props => props.$size === 'sm' && css`
    padding: 8px 16px;
    font-size: 13px;
  `}
  ${(props => (!props.$size || props.$size === 'md') && css`
    padding: 12px 24px;
    font-size: 14px;
  `)}
  ${props => props.$size === 'lg' && css`
    padding: 18px 36px;
    font-size: 16px;
  `}

  ${props => getVariantStyles(props.$variant, props.theme)}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none !important;
    box-shadow: none !important;
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;

const Spinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  ...props
}) => {
  return (
    <StyledButton $variant={variant} $size={size} disabled={isLoading || props.disabled} {...props}>
      {isLoading ? <Spinner /> : leftIcon}
      {children}
      {!isLoading && rightIcon}
    </StyledButton>
  );
};
