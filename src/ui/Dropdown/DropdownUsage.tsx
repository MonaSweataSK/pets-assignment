import React, { useState } from 'react';
import styled from 'styled-components';
import { Dropdown } from './Dropdown';
import type { DropdownOption } from './Dropdown';

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
  max-width: 320px;
`;

const SectionTitle = styled.h3`
  font-family: ${props => props.theme.typography.heading};
  font-size: 18px;
  font-weight: 700;
  color: ${props => props.theme.colors.onSurface};
`;

const FilterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);

const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const DogIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 5.172a2 2 0 0 0-1.414.586l-1.172 1.172A2 2 0 0 1 6 7.515V9a1 1 0 0 0 1 1h.5a1 1 0 0 1 1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-2h1a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1h-2.172a2 2 0 0 1-1.414-.586V5z" />
    <path d="M14 6h1a2 2 0 0 1 2 2v2.172a2 2 0 0 0 .586 1.414l.828.828A2 2 0 0 1 19 13.828V15a2 2 0 0 1-2 2h-3" />
    <path d="M10 17v2a2 2 0 0 1-2 2H5" />
    <path d="M3 13v2a2 2 0 0 0 2 2h2" />
  </svg>
);

const CatIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 5c.67 0 1.35.09 2 .26 1.78-2 2.61-2.84 3.93-2.95.14-.02.28 0 .41.05.24.08.38.32.32.56-.12.56-.3 1.19-.53 1.84.45.83.68 1.79.68 2.78 0 3.31-2.69 6-6 6s-6-2.69-6-6c0-.99.23-1.95.68-2.78-.23-.65-.41-1.28-.53-1.84-.06-.24.08-.48.32-.56.13-.05.27-.07.41-.05 1.32.11 2.15.95 3.93 2.95.65-.17 1.33-.26 2-.26z" />
    <path d="M15 15.5c2.5 1.5 4.5 4.5 4.5 4.5" />
    <path d="M9 15.5c-2.5 1.5-4.5 4.5-4.5 4.5" />
  </svg>
);

const sortOptions: DropdownOption[] = [
  { label: 'Name A-Z', value: 'name-asc' },
  { label: 'Name Z-A', value: 'name-desc' },
  { label: 'Newest First', value: 'date-newest' },
  { label: 'Oldest First', value: 'date-oldest' },
];

const petOptions: DropdownOption[] = [
  { label: 'All Pets', value: 'all', icon: <FilterIcon /> },
  { label: 'Dogs Only', value: 'dogs', icon: <DogIcon /> },
  { label: 'Cats Only', value: 'cats', icon: <CatIcon /> },
  { label: 'Adopters', value: 'users', icon: <UserIcon /> },
];

export const DropdownUsage: React.FC = () => {
  const [standardVal, setStandardVal] = useState('name-asc');
  const [iconVal, setIconVal] = useState('name-asc');
  const [searchVal, setSearchVal] = useState('');
  const [petVal, setPetVal] = useState('all');

  return (
    <UsageContainer>
      <UsageSection>
        <SectionTitle>Standard Dropdown</SectionTitle>
        <Dropdown
          options={sortOptions}
          value={standardVal}
          onChange={setStandardVal}
        />
      </UsageSection>

      <UsageSection>
        <SectionTitle>Custom Prop Icons</SectionTitle>
        <Dropdown
          options={sortOptions}
          value={iconVal}
          onChange={setIconVal}
          leftIcon={<FilterIcon />}
          rightIcon={<UserIcon />}
        />
      </UsageSection>

      <UsageSection>
        <SectionTitle>Searchable Variant</SectionTitle>
        <Dropdown
          options={sortOptions}
          value={searchVal}
          onChange={setSearchVal}
          placeholder="Search and select..."
          isSearchable
        />
      </UsageSection>

      <UsageSection>
        <SectionTitle>Options with Icons</SectionTitle>
        <Dropdown
          options={petOptions}
          value={petVal}
          onChange={setPetVal}
        />
      </UsageSection>
    </UsageContainer>
  );
};
