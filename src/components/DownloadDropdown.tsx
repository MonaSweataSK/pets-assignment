import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

interface DownloadDropdownProps {
  onDownload: (urlParams: string) => Promise<void>;
  isDownloading: boolean;
  themeColor?: 'primary' | 'green';
}

type SizeOption = 'original' | 'large' | 'medium' | 'small' | 'custom';

const Container = styled.div`
  position: relative;
  display: inline-flex;
  font-family: ${props => props.theme.typography.sans};
  width: 100%;
`;

const ButtonGroup = styled.div<{ $disabled?: boolean, $loading?: boolean }>`
  display: flex;
  width: 100%;
  box-shadow: 0 8px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  
  &:hover {
    transform: ${props => (props.$disabled || props.$loading) ? 'none' : 'translateY(-2px)'};
    box-shadow: ${props => (props.$disabled || props.$loading) ? '0 8px 10px rgba(0,0,0,0.1)' : '0 12px 24px rgba(0,0,0,0.15)'};
  }
`;

const MainButton = styled.button<{ $loading?: boolean }>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px;
  border: none;
  background: ${props => props.theme.colors.primary};
  color: white;
  font-weight: 700;
  font-size: 16px;
  cursor: ${props => props.$loading ? 'wait' : 'pointer'};
  transition: background 0.2s ease;
  
  &:hover:not(:disabled) {
    background: ${props => props.theme.colors.primaryContainer};
  }
  &:disabled { opacity: 0.7; }
`;

const Divider = styled.div`
  width: 1px;
  background-color: rgba(255, 255, 255, 0.3);
  z-index: 1;
`;

const ToggleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  border: none;
  background: ${props => props.theme.colors.primary};
  color: white;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover:not(:disabled) {
    background: ${props => props.theme.colors.primaryContainer};
  }
  &:disabled { opacity: 0.7; cursor: not-allowed; }
`;

const Popover = styled.div`
  position: absolute;
  bottom: calc(100% + 8px);
  right: 0;
  width: 300px;
  background-color: ${props => props.theme.colors.surface};
  border-radius: 12px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
  border: 1px solid ${props => props.theme.colors.border};
  padding: 24px;
  z-index: 1100;
  animation: popoverFade 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  transform-origin: bottom right;

  @keyframes popoverFade {
    from { opacity: 0; transform: scale(0.95) translateY(10px); }
    to { opacity: 1; transform: scale(1) translateY(0); }
  }
  
  @media (max-width: 640px) {
    width: 100%;
    right: 0;
    left: 0;
    bottom: calc(100% + 12px);
  }
`;

const PopoverTitle = styled.h4`
  margin: 0 0 16px 0;
  font-size: 16px;
  font-weight: 600;
  color: ${props => props.theme.colors.onSurfaceVariant};
`;

const OptionRow = styled.div<{ $selected?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  cursor: pointer;
  border-bottom: 1px solid ${props => props.theme.colors.container};
  
  &:hover {
    opacity: 0.8;
  }
`;

const OptionLabel = styled.span<{ $selected?: boolean }>`
  font-size: 15px;
  font-weight: 500;
  color: ${props => props.theme.colors.onSurface};
`;

const CheckIconWrapper = styled.div`
  color: ${props => props.theme.colors.primary};
  display: flex;
  align-items: center;
`;

const CustomSizeContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 12px;
  margin-bottom: 8px;
`;

const Input = styled.input`
  flex: 1;
  width: 100%;
  padding: 10px 12px;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 8px;
  background-color: ${props => props.theme.colors.lowest};
  color: ${props => props.theme.colors.onSurface};
  font-size: 14px;
  outline: none;
  
  &:focus {
    border-color: ${props => props.theme.colors.primary};
  }
  
  &::placeholder {
    color: ${props => props.theme.colors.outline};
  }
`;

const DownloadActionButton = styled.button`
  width: 100%;
  margin-top: 24px;
  padding: 14px;
  border: none;
  background: ${props => props.theme.colors.primary};
  color: white;
  border-radius: 8px;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  transition: opacity 0.2s ease;
  
  &:hover:not(:disabled) {
    opacity: 0.9;
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const DownloadDropdown: React.FC<DownloadDropdownProps> = ({ 
  onDownload, 
  isDownloading 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState<SizeOption>('original');
  const [customWidth, setCustomWidth] = useState('');
  const [customHeight, setCustomHeight] = useState('');
  
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleDownloadClick = async () => {
    let params = '';
    
    switch (selectedSize) {
      case 'original':
        params = '?auto=compress&cs=tinysrgb&w=2400&dpr=2&fm=jpg';
        break;
      case 'large':
        params = '?auto=compress&cs=tinysrgb&w=1920&fm=jpg';
        break;
      case 'medium':
        params = '?auto=compress&cs=tinysrgb&w=1280&fm=jpg';
        break;
      case 'small':
        params = '?auto=compress&cs=tinysrgb&w=640&fm=jpg';
        break;
      case 'custom':
        const paramsList = ['?auto=compress&cs=tinysrgb&fm=jpg'];
        if (customWidth) paramsList.push(`w=${customWidth}`);
        if (customHeight) paramsList.push(`h=${customHeight}`);
        params = paramsList.join('&');
        break;
    }
    
    setIsOpen(false);
    await onDownload(params);
  };

  const CheckIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );

  return (
    <Container ref={popoverRef}>
      <ButtonGroup $disabled={isDownloading} $loading={isDownloading}>
        <MainButton 
          onClick={handleDownloadClick} 
          disabled={isDownloading} 
          $loading={isDownloading}
        >
          {isDownloading ? 'Downloading...' : 'Download'}
        </MainButton>
        <Divider />
        <ToggleButton 
          onClick={() => setIsOpen(!isOpen)} 
          disabled={isDownloading}
          aria-label="Choose size"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </ToggleButton>
      </ButtonGroup>

      {isOpen && (
        <Popover>
          <PopoverTitle>Choose a size:</PopoverTitle>
          
          {(['original', 'large', 'medium', 'small'] as const).map(size => (
            <OptionRow key={size} onClick={() => setSelectedSize(size)}>
              <OptionLabel $selected={selectedSize === size}>
                {size.charAt(0).toUpperCase() + size.slice(1)}
              </OptionLabel>
              {selectedSize === size && (
                <CheckIconWrapper>
                  <CheckIcon />
                </CheckIconWrapper>
              )}
            </OptionRow>
          ))}

          <OptionRow onClick={() => setSelectedSize('custom')} style={{ borderBottom: 'none', paddingBottom: 0 }}>
            <OptionLabel $selected={selectedSize === customWidth}>Custom</OptionLabel>
            {selectedSize === 'custom' && (
              <CheckIconWrapper>
                <CheckIcon />
              </CheckIconWrapper>
            )}
          </OptionRow>

          {selectedSize === 'custom' && (
            <CustomSizeContainer onClick={e => e.stopPropagation()}>
              <Input 
                placeholder="Width" 
                type="number" 
                value={customWidth} 
                onChange={e => setCustomWidth(e.target.value)} 
              />
              <Input 
                placeholder="Height" 
                type="number" 
                value={customHeight} 
                onChange={e => setCustomHeight(e.target.value)} 
              />
            </CustomSizeContainer>
          )}

          <DownloadActionButton 
            onClick={handleDownloadClick}
            disabled={selectedSize === 'custom' && !customWidth && !customHeight}
          >
            Download Selected Size
          </DownloadActionButton>
        </Popover>
      )}
    </Container>
  );
};
