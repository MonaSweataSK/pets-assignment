import React from 'react';
import styled from 'styled-components';

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

const SortSelect = styled.select`
  appearance: none;
  padding: 8px 36px 8px 16px;
  background-color: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.radius.md};
  font-weight: 600;
  cursor: pointer;
  color: ${props => props.theme.colors.onSurface};
  font-family: inherit;
  font-size: 14px;
  position: relative;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%238c7168' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;

  &:hover {
    background-color: ${props => props.theme.colors.container};
  }

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

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
        <SortSelect 
          value={sortOrder} 
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="name-asc">Name A-Z</option>
          <option value="name-desc">Name Z-A</option>
          <option value="date-newest">Newest First</option>
          <option value="date-oldest">Oldest First</option>
        </SortSelect>
      </SortWrapper>
    </SearchContainer>
  );
};

export default SearchBar;
