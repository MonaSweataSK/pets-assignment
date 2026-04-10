import React, { useEffect, useState, useMemo } from 'react';
import styled, { keyframes, createGlobalStyle } from 'styled-components';
import { downloadSelectedImages } from '../utils/downloadImages';
import { useToast } from '../ui/Toast/Toast';
import type { Pet } from '../types/Pet';

/* ─── Global Styles ─────────────────────────────────────────────────────── */
const ModalGlobalStyle = createGlobalStyle`
  body {
    overflow: hidden;
  }
`;

/* ─── Animations ────────────────────────────────────────────────────────── */
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideUp = keyframes`
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

/* ─── Styled Components ─────────────────────────────────────────────────── */
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(26, 28, 27, 0.45);
  backdrop-filter: blur(12px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  animation: ${fadeIn} 0.3s ease-out;

  @media (max-width: 640px) {
    padding: 0;
  }
`;

const ModalContainer = styled.div`
  background-color: ${props => props.theme.colors.surface};
  width: 100%;
  max-width: 1200px;
  height: 85vh;
  min-height: 500px;
  border-radius: 32px;
  overflow: hidden;
  box-shadow: 0 32px 64px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  position: relative;
  animation: ${slideUp} 0.4s cubic-bezier(0.2, 1, 0.3, 1);
  z-index: 1010;

  @media (max-width: 640px) {
    height: 100%;
    border-radius: 0;
  }
`;

const CloseIconButton = styled.button`
  position: absolute;
  top: 24px;
  right: 24px;
  z-index: 1020;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  transition: all 0.2s ease;

  &:hover { transform: scale(1.1); background: #f8f8f8; }
`;

const ContentBody = styled.div`
  display: grid;
  grid-template-columns: 1fr 380px;
  height: 100%;
  overflow: hidden;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr auto;
    overflow-y: auto;
  }
`;

const ImageContainer = styled.div<{ $isZoomed: boolean }>`
  position: relative;
  background-color: ${props => props.theme.colors.container};
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  overflow: ${props => props.$isZoomed ? 'auto' : 'hidden'};
  cursor: ${props => props.$isZoomed ? 'zoom-out' : 'zoom-in'};
`;

const ZoomableImage = styled.img<{ $isZoomed: boolean }>`
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.3s cubic-bezier(0.2, 1, 0.3, 1);
  transform: ${props => props.$isZoomed ? 'scale(2)' : 'scale(1)'};
  transform-origin: center;
  display: block;
`;

const InfoPanel = styled.div`
  padding: 48px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  background-color: ${props => props.theme.colors.surface};
  overflow-y: auto;
  position: relative;

  @media (max-width: 640px) { padding: 32px 24px; }
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const DateText = styled.span`
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${props => props.theme.colors.onSurfaceVariant};
`;

const Title = styled.h2`
  font-family: ${props => props.theme.typography.heading};
  font-size: 32px;
  font-weight: 800;
  color: ${props => props.theme.colors.onSurface};
  margin: 0;
  line-height: 1.2;
`;

const Description = styled.p`
  font-size: 16px;
  line-height: 1.7;
  color: ${props => props.theme.colors.onSurfaceVariant};
  margin: 0;
`;

const Actions = styled.div`
  margin-top: auto;
  padding-top: 24px;
`;

const DownloadButton = styled.button<{ $loading?: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 16px;
  border-radius: 16px;
  border: none;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.primaryContainer});
  color: white;
  font-weight: 700;
  font-size: 16px;
  cursor: ${props => props.$loading ? 'wait' : 'pointer'};
  box-shadow: 0 8px 10px rgba(164, 55, 0, 0.2);
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 12px 24px rgba(164, 55, 0, 0.25);
  }
  &:disabled { opacity: 0.7; }
`;

const NavArrow = styled.button<{ $side: 'left' | 'right' }>`
  position: fixed;
  top: 50%;
  ${props => props.$side === 'left' ? 'left: 40px;' : 'right: 40px;'}
  transform: translateY(-50%);
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  z-index: 1050;
  padding: 20px;
  transition: transform 0.2s;

  &:hover:not(:disabled) { transform: translateY(-50%) scale(1.2); }
  &:disabled { opacity: 0.1; cursor: not-allowed; }

  @media (max-width: 1400px) { ${props => props.$side === 'left' ? 'left: 10px;' : 'right: 10px;'} }
  @media (max-width: 640px) { display: none; }
`;

const CounterBadge = styled.div`
  position: absolute;
  top: 24px;
  left: 24px;
  background: rgba(0,0,0,0.4);
  backdrop-filter: blur(8px);
  color: white;
  padding: 6px 14px;
  border-radius: 99px;
  font-size: 12px;
  font-weight: 700;
  z-index: 10;
`;

/* ─── Main Component ─────────────────────────────────────────────────────────── */
interface PetDetailModalProps {
  pet: Pet;
  currentIndex: number;
  totalCount: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export const PetDetailModal: React.FC<PetDetailModalProps> = ({ 
  pet, 
  currentIndex, 
  totalCount, 
  onClose, 
  onPrev, 
  onNext 
}) => {
  const { showToast } = useToast();
  const [isDownloading, setIsDownloading] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  // Transform optimized WebP into high-res JPEG
  const highResUrl = useMemo(() => {
    const baseUrl = pet.url.split('?')[0];
    return `${baseUrl}?auto=compress&cs=tinysrgb&w=2400&dpr=2&fm=jpg`;
  }, [pet.url]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') { setIsZoomed(false); onPrev(); }
      if (e.key === 'ArrowRight') { setIsZoomed(false); onNext(); }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose, onPrev, onNext]);

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      await downloadSelectedImages([highResUrl]);
      showToast('Image downloaded!', { type: 'success' });
    } catch (err) {
      showToast('Download failed', { type: 'error' });
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Overlay onClick={(e) => e.target === e.currentTarget && onClose()}>
      <ModalGlobalStyle />
      
      <NavArrow $side="left" onClick={onPrev} disabled={currentIndex === 0}>
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </NavArrow>

      <ModalContainer onClick={e => e.stopPropagation()}>
        <CloseIconButton onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </CloseIconButton>

        <ContentBody>
          <ImageContainer $isZoomed={isZoomed} onClick={() => setIsZoomed(!isZoomed)}>
            <CounterBadge>{currentIndex + 1} / {totalCount}</CounterBadge>
            <ZoomableImage 
              src={highResUrl} 
              alt={pet.title} 
              $isZoomed={isZoomed}
            />
          </ImageContainer>

          <InfoPanel>
            <Header>
              <DateText>Added on {new Date(pet.created).toLocaleDateString()}</DateText>
              <Title>{pet.title}</Title>
            </Header>

            <Description>{pet.description}</Description>

            <Actions>
              <DownloadButton onClick={handleDownload} disabled={isDownloading} $loading={isDownloading}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                {isDownloading ? 'Processing...' : 'Download Image'}
              </DownloadButton>
            </Actions>
          </InfoPanel>
        </ContentBody>
      </ModalContainer>

      <NavArrow $side="right" onClick={onNext} disabled={currentIndex === totalCount - 1}>
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </NavArrow>
    </Overlay>
  );
};
