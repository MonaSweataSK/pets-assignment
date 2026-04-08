import React, { useState, useRef, useEffect, useMemo } from 'react';
import styled, { css } from 'styled-components';

export interface DropdownOption {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

interface DropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  width?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isSearchable?: boolean;
}

const DropdownContainer = styled.div<{ $width?: string }>`
  position: relative;
  width: ${props => props.$width || 'auto'};
  min-width: 160px;
  font-family: ${props => props.theme.typography.sans};
`;

const SelectedDisplay = styled.div<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  background-color: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.$isOpen ? props.theme.colors.primary : props.theme.colors.border};
  border-radius: ${props => props.theme.radius.md};
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  color: ${props => props.theme.colors.onSurface};
  transition: all 0.2s ease;
  user-select: none;

  &:hover {
    background-color: ${props => props.theme.colors.container};
  }

  ${props => props.$isOpen && css`
    box-shadow: 0 0 0 4px rgba(164, 55, 0, 0.1);
  `}
`;

const LabelWrapper = styled.span`
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const IconWrapper = styled.div<{ $isOpen?: boolean; $isChevron?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.outline};
  flex-shrink: 0;
  
  ${props => props.$isChevron && css`
    transition: transform 0.2s ease;
    transform: rotate(${props.$isOpen ? '180deg' : '0'});
  `}
`;

const OptionsListContainer = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  background-color: ${props => props.theme.colors.lowest};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.radius.md};
  box-shadow: ${props => props.theme.shadows.medium};
  z-index: 1000;
  overflow: hidden;
  animation: slideIn 0.2s ease-out;

  @keyframes slideIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const SearchInputWrapper = styled.div`
  padding: 8px;
  border-bottom: 1px solid ${props => props.theme.colors.container};
  background-color: ${props => props.theme.colors.surface};
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.radius.sm};
  font-size: 13px;
  outline: none;
  font-family: inherit;

  &:focus {
    border-color: ${props => props.theme.colors.primary};
  }
`;

const OptionsList = styled.ul`
  margin: 0;
  padding: 4px;
  list-style: none;
  max-height: 240px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${props => props.theme.colors.container};
    border-radius: 3px;
  }
`;

const OptionItem = styled.li<{ $isSelected: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: ${props => props.theme.radius.sm};
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  color: ${props => props.$isSelected ? props.theme.colors.primary : props.theme.colors.onSurfaceVariant};
  background-color: ${props => props.$isSelected ? 'rgba(164, 55, 0, 0.05)' : 'transparent'};
  transition: all 0.15s ease;

  &:hover {
    background-color: ${props => props.$isSelected ? 'rgba(164, 55, 0, 0.1)' : props.theme.colors.surface};
    color: ${props => props.theme.colors.primary};
  }
`;

const NoResults = styled.div`
  padding: 16px;
  text-align: center;
  font-size: 13px;
  color: ${props => props.theme.colors.outline};
`;

const ChevronIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select option',
  width,
  leftIcon,
  rightIcon,
  isSearchable = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const selectedOption = options.find(opt => opt.value === value);

  const displayLeftIcon = leftIcon || selectedOption?.icon;

  const filteredOptions = useMemo(() => {
    if (!isSearchable || !searchTerm) return options;
    return options.filter(opt => 
      opt.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [options, searchTerm, isSearchable]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && isSearchable) {
      setSearchTerm('');
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
  }, [isOpen, isSearchable]);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <DropdownContainer ref={dropdownRef} $width={width}>
      <SelectedDisplay $isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
        {displayLeftIcon && <IconWrapper>{displayLeftIcon}</IconWrapper>}
        <LabelWrapper>
          {selectedOption ? selectedOption.label : placeholder}
        </LabelWrapper>
        {rightIcon && <IconWrapper>{rightIcon}</IconWrapper>}
        <IconWrapper $isOpen={isOpen} $isChevron>
          <ChevronIcon />
        </IconWrapper>
      </SelectedDisplay>
      
      {isOpen && (
        <OptionsListContainer>
          {isSearchable && (
            <SearchInputWrapper onClick={(e) => e.stopPropagation()}>
              <SearchInput 
                ref={searchInputRef}
                type="text" 
                placeholder="Search..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </SearchInputWrapper>
          )}
          <OptionsList>
            {filteredOptions.length > 0 ? (
              filteredOptions.map(option => (
                <OptionItem 
                  key={option.value} 
                  $isSelected={value === option.value}
                  onClick={() => handleSelect(option.value)}
                >
                  {option.icon && <IconWrapper>{option.icon}</IconWrapper>}
                  <span>{option.label}</span>
                </OptionItem>
              ))
            ) : (
              <NoResults>No results found</NoResults>
            )}
          </OptionsList>
        </OptionsListContainer>
      )}
    </DropdownContainer>
  );
};
