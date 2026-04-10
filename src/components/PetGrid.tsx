import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import type { Pet } from '../types/Pet';

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
`;

const ImageWrapper = styled.div<{ $selected?: boolean }>`
  position: relative;
  aspect-ratio: 1 / 1;
  border-radius: ${props => props.theme.radius.lg};
  overflow: hidden;
  border: 4px solid ${props => props.$selected ? props.theme.colors.primary : 'transparent'};
  box-shadow: ${props => props.$selected ? props.theme.shadows.medium : props.theme.shadows.soft};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${props => props.theme.shadows.elevated};
    
    &::after {
      opacity: 1;
    }
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(26, 28, 27, 0) 60%, rgba(26, 28, 27, 0.4) 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }
`;

const PetImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const CheckboxWrapper = styled.div<{ $selected?: boolean }>`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 24px;
  height: 24px;
  border-radius: 6px;
  background-color: ${props => props.$selected ? props.theme.colors.primary : 'rgba(255, 255, 255, 0.2)'};
  backdrop-filter: blur(8px);
  border: 2px solid ${props => props.$selected ? props.theme.colors.primary : 'rgba(255, 255, 255, 0.8)'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  transition: all 0.2s ease;
  z-index: 2;

  svg {
    opacity: ${props => props.$selected ? 1 : 0};
    transform: scale(${props => props.$selected ? 1 : 0.5});
    transition: all 0.2s ease;
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

  &:hover {
    color: ${props => props.theme.colors.primary};
    text-decoration: underline;
    text-underline-offset: 4px;
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
`;

interface PetCardProps {
  pet: Pet;
  petIndex: number;
  isSelected: boolean;
  onToggle: (url: string) => void;
  priority?: boolean;
  fetchPriority?: 'high' | 'low' | 'auto';
}

const CheckIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
    </svg>
);

export const PetCard: React.FC<PetCardProps> = ({ pet, petIndex, isSelected, onToggle, priority, fetchPriority }) => {
    return (
        <CardContainer>
            <ImageWrapper $selected={isSelected} onClick={() => onToggle(pet.url)}>
                <PetImage src={pet.url} alt={pet.title} loading={priority ? "eager" : "lazy"} fetchPriority={fetchPriority} />
                <CheckboxWrapper $selected={isSelected}>
                    <CheckIcon />
                </CheckboxWrapper>
            </ImageWrapper>
            <PetInfo>
                <PetNameLink to={`/pet/${petIndex}`}>{pet.title}</PetNameLink>
                <PetDetails>{pet.description}</PetDetails>
            </PetInfo>
        </CardContainer>
    );
};

export const PetGrid: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <Grid>{children}</Grid>;
};
