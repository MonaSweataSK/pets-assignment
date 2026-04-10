import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import type { Pet } from '../types/Pet';
import { useSelection } from '../context/SelectionContext';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 32px;
  padding: 40px 48px;
  background-color: ${props => props.theme.colors.lowest};
  flex: 1;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    padding: 24px;
    gap: 24px;
  }
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  cursor: pointer;
`;

const ImageWrapper = styled.div<{ $selected?: boolean; $anySelected?: boolean }>`
  position: relative;
  aspect-ratio: 1 / 1;
  border-radius: ${props => props.theme.radius.lg};
  overflow: hidden;
  border: 4px solid ${props => props.$selected ? props.theme.colors.primary : 'transparent'};
  box-shadow: ${props => props.$selected ? props.theme.shadows.medium : '0 4px 12px rgba(140, 113, 104, 0.04)'};
  transition: transform 0.2s ease-out, box-shadow 0.2s ease-out, border-color 0.2s ease-out;
  cursor: pointer;
  background-color: ${props => props.theme.colors.container};

  &:hover {
    transform: translateY(-8px);
    box-shadow: ${props => props.theme.shadows.elevated};
    
    /* Show checkbox on hover */
    .checkbox-trigger {
      opacity: 1;
      transform: scale(1);
    }
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(26, 28, 27, 0) 50%, rgba(26, 28, 27, 0.15) 100%);
    opacity: 1;
    transition: opacity 0.2s ease-out;
    pointer-events: none;
  }
`;

const PetImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.3s ease-out;

  ${ImageWrapper}:hover & {
    transform: scale(1.04);
  }
`;

const CheckboxWrapper = styled.div<{ $selected?: boolean; $visible?: boolean }>`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background-color: ${props => props.$selected ? props.theme.colors.primary : 'rgba(255, 255, 255, 0.3)'};
  backdrop-filter: blur(8px);
  border: 2px solid ${props => props.$selected ? props.theme.colors.primary : 'rgba(255, 255, 255, 0.8)'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  transition: opacity 0.15s ease-out, transform 0.15s ease-out, background-color 0.15s ease-out;
  z-index: 10;
  
  /* Initial state: invisible unless selected or forced visible */
  opacity: ${props => (props.$selected || props.$visible) ? 1 : 0};
  transform: scale(${props => (props.$selected || props.$visible) ? 1 : 0.85});

  &:hover {
    transform: scale(1.08) !important;
    background-color: ${props => props.$selected ? props.theme.colors.primaryContainer : 'rgba(255, 255, 255, 0.5)'};
  }

  svg {
    opacity: ${props => props.$selected ? 1 : 0};
    transform: scale(${props => props.$selected ? 1 : 0.5});
    transition: opacity 0.15s ease-out, transform 0.15s ease-out;
  }
`;

const PetInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const PetNameLink = styled(Link)`
  display: inline-block;
  font-size: 18px;
  font-weight: 700;
  color: ${props => props.theme.colors.onSurface};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const PetDetails = styled.p`
  font-size: 14px;
  color: ${props => props.theme.colors.onSurfaceVariant};
  font-weight: 500;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  opacity: 0.8;
`;

interface PetCardProps {
  pet: Pet;
  petIndex: number;
  onOpen: (index: number) => void;
  priority?: boolean;
  fetchPriority?: 'high' | 'low' | 'auto';
}

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export const PetCard: React.FC<PetCardProps> = ({ pet, petIndex, onOpen, priority, fetchPriority }) => {
  const { selectedUrls, isSelected, select, clear } = useSelection();

  const selected = isSelected(pet.url);
  const anySelected = selectedUrls.size > 0;

  const toggle = () => {
    if (selected) clear(pet.url);
    else select(pet.url);
  };

  const handleImageClick = (e: React.MouseEvent) => {
    if (anySelected) {
      toggle();
    } else {
      onOpen(petIndex);
    }
  };

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggle();
  };

  return (
    <CardContainer onClick={() => onOpen(petIndex)}>
      <ImageWrapper
        $selected={selected}
        $anySelected={anySelected}
        onClick={handleImageClick}
      >
        <PetImage
          src={pet.url}
          alt={pet.title}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={fetchPriority}
        />
        <CheckboxWrapper
          className="checkbox-trigger"
          $selected={selected}
          $visible={anySelected}
          onClick={handleCheckboxClick}
        >
          <CheckIcon />
        </CheckboxWrapper>
      </ImageWrapper>
      <PetInfo>
        <PetNameLink as="div">{pet.title}</PetNameLink>
        <PetDetails>{pet.description}</PetDetails>
      </PetInfo>
    </CardContainer>
  );
};

export const PetGrid: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <Grid>{children}</Grid>;
};
