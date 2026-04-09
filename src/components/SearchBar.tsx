import React from 'react';
import styled from 'styled-components';
import { Dropdown } from '../ui/Dropdown/Dropdown';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  sortOrder: string;
  onSortChange: (order: string) => void;
}

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 48px;
  background-color: ${props => props.theme.colors.lowest};
  border-bottom: 1px solid ${props => props.theme.colors.container};
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    padding: 16px 24px;
  }
`;

const InputWrapper = styled.div`
  position: relative;
  flex: 1;
  max-width: 400px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px 12px 44px;
  border-radius: ${props => props.theme.radius.md};
  border: 1px solid ${props => props.theme.colors.border};
  background-color: ${props => props.theme.colors.surface};
  font-family: ${props => props.theme.typography.sans};
  font-size: 14px;
  color: ${props => props.theme.colors.onSurface};
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 4px rgba(164, 55, 0, 0.1);
    background-color: ${props => props.theme.colors.lowest};
  }

  &::placeholder {
    color: ${props => props.theme.colors.outline};
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: ${props => props.theme.colors.outline};
  display: flex;
  align-items: center;
`;

const SortWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  color: ${props => props.theme.colors.onSurfaceVariant};
`;

const sortOptions = [
  { label: 'Name A-Z', value: 'name-asc' },
  { label: 'Name Z-A', value: 'name-desc' },
  { label: 'Newest First', value: 'date-newest' },
  { label: 'Oldest First', value: 'date-oldest' }
];

const SearchBar: React.FC<SearchBarProps> = ({ 
  searchTerm, 
  onSearchChange, 
  sortOrder, 
  onSortChange 
}) => {
  return (
    <SearchContainer>
      <InputWrapper>
        <SearchIcon>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
        </SearchIcon>
        <Input 
          type="text" 
          placeholder="Search gallery..." 
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </InputWrapper>
      <SortWrapper>
        <span>Sort by:</span>
        <Dropdown
          options={sortOptions}
          value={sortOrder}
          onChange={onSortChange}
          width="160px"
        />
      </SortWrapper>
    </SearchContainer>
  );
};

export default SearchBar;
