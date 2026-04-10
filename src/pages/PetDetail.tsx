import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import { usePets } from '../hooks/usePets';
import { downloadSelectedImages } from '../utils/downloadImages';
import { useToast } from '../ui/Toast/Toast';

/* ─── Layout shells ─────────────────────────────────────────────────────── */

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  background-color: ${props => props.theme.colors.surface};
`;

const MainContent = styled.main`
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

/* Full-height inner shell – everything lives here                           */
const Shell = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 16px 32px 12px;
  gap: 12px;
  overflow: hidden;

  @media (max-width: 640px) {
    padding: 12px 16px 8px;
  }
`;

/* ─── Back row ───────────────────────────────────────────────────────────── */

const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  font-size: 13px;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
  font-family: ${props => props.theme.typography.sans};
  flex-shrink: 0;

  &:hover {
    text-decoration: underline;
    text-underline-offset: 4px;
  }
`;

const ArrowLeftIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5" />
    <path d="M12 19l-7-7 7-7" />
  </svg>
);

const TopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
`;

const Counter = styled.span`
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: ${props => props.theme.colors.onSurfaceVariant};
  background: ${props => props.theme.colors.container};
  padding: 4px 12px;
  border-radius: 999px;
`;

/* ─── Two-column body ────────────────────────────────────────────────────── */

const Body = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 24px;
  overflow: hidden;
  min-height: 0;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr auto;
  }
`;

/* ─── Image panel ────────────────────────────────────────────────────────── */

/* Wrapper adds relative positioning so nav arrows can be overlaid */
const ImageArea = styled.div`
  position: relative;
  overflow: hidden;
  min-height: 0;
  display: flex;
`;

const ImagePanel = styled.div`
  flex: 1;
  overflow: hidden;
  border-radius: ${props => props.theme.radius.lg};
  background-color: ${props => props.theme.colors.container};
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 0;
`;

const PetImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
`;

const NavArrow = styled.button<{ $side: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${props => props.$side === 'left' ? 'left: 12px;' : 'right: 12px;'}
  z-index: 10;

  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  cursor: pointer;

  background: ${props => props.theme.colors.surface}cc;
  backdrop-filter: blur(8px);
  color: ${props => props.theme.colors.onSurface};
  box-shadow: 0 2px 12px rgba(0,0,0,0.15);
  transition: background 0.2s ease, transform 0.2s ease, opacity 0.2s ease;
  opacity: 0.85;

  &:hover:not(:disabled) {
    background: ${props => props.theme.colors.surface};
    opacity: 1;
    transform: translateY(-50%) scale(1.08);
  }

  &:disabled {
    opacity: 0.25;
    cursor: not-allowed;
  }
`;

/* ─── Info panel ─────────────────────────────────────────────────────────── */

const InfoPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: auto;
  padding-right: 4px;
  min-height: 0;

  /* subtle scrollbar */
  scrollbar-width: thin;
  scrollbar-color: ${props => props.theme.colors.primary}44 transparent;
  &::-webkit-scrollbar { width: 4px; }
  &::-webkit-scrollbar-thumb { background: ${props => props.theme.colors.primary}44; border-radius: 2px; }
`;

const Title = styled.h1`
  margin: 0;
  font-family: ${props => props.theme.typography.heading};
  font-size: clamp(28px, 3vw, 46px);
  font-weight: 900;
  letter-spacing: -0.02em;
  color: ${props => props.theme.colors.onSurface};
  line-height: 1.1;
`;

const Meta = styled.p`
  margin: 8px 0 0;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${props => props.theme.colors.onSurfaceVariant};
`;

const Description = styled.p`
  margin: 0;
  font-size: 16px;
  line-height: 1.75;
  color: ${props => props.theme.colors.onSurfaceVariant};
  font-weight: 500;
`;

const ActionsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: auto;
`;

const PrimaryButton = styled.button<{ $loading?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 12px 22px;
  border-radius: ${props => props.theme.radius.md};
  border: none;
  cursor: ${props => (props.$loading ? 'wait' : 'pointer')};
  font-family: ${props => props.theme.typography.sans};
  font-weight: 800;
  font-size: 14px;
  color: white;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.primaryContainer});
  box-shadow: 0 8px 24px rgba(164, 55, 0, 0.18);
  transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1), filter 0.2s ease;

  &:hover:not(:disabled) {
    filter: brightness(1.05);
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const ButtonSpinner = styled.div`
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

/* ─── State ──────────────────────────────────────────────────────────────── */

const StateOverlay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  gap: 18px;
  color: ${props => props.theme.colors.onSurfaceVariant};
`;

const Spinner = styled.div`
  width: 48px;
  height: 48px;
  border: 4px solid ${props => props.theme.colors.container};
  border-top-color: ${props => props.theme.colors.primary};
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const Notice = styled.div`
  padding: 28px;
  background-color: ${props => props.theme.colors.container};
  border-radius: 24px;
  max-width: 480px;
`;

const NoticeTitle = styled.h2`
  margin: 0 0 8px;
  font-family: ${props => props.theme.typography.heading};
  font-size: 22px;
  color: ${props => props.theme.colors.onSurface};
`;

const NoticeBody = styled.p`
  margin: 0;
  font-size: 15px;
  line-height: 1.7;
  font-weight: 500;
  color: ${props => props.theme.colors.onSurfaceVariant};
`;

/* ─── Helpers ────────────────────────────────────────────────────────────── */

const formatCreated = (created: string) => {
  const date = new Date(created);
  if (Number.isNaN(date.getTime())) return created;
  return new Intl.DateTimeFormat(undefined, { year: 'numeric', month: 'short', day: '2-digit' }).format(date);
};

/* ─── Component ──────────────────────────────────────────────────────────── */

const PetDetail: React.FC = () => {
  const navigate = useNavigate();
  const { index } = useParams<{ index: string }>();
  const { pets, loading, error } = usePets();
  const { showToast } = useToast();
  const [isDownloading, setIsDownloading] = useState(false);

  const petIndex = useMemo(() => {
    const parsed = Number(index);
    return Number.isInteger(parsed) ? parsed : Number.NaN;
  }, [index]);

  const pet = useMemo(() => {
    if (!Number.isInteger(petIndex)) return undefined;
    return pets[petIndex];
  }, [pets, petIndex]);

  const prevIndex = petIndex > 0 ? petIndex - 1 : null;
  const nextIndex = petIndex < pets.length - 1 ? petIndex + 1 : null;

  const goToPrev = useCallback(() => {
    if (prevIndex !== null) navigate(`/pet/${prevIndex}`);
  }, [prevIndex, navigate]);

  const goToNext = useCallback(() => {
    if (nextIndex !== null) navigate(`/pet/${nextIndex}`);
  }, [nextIndex, navigate]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goToPrev();
      if (e.key === 'ArrowRight') goToNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goToPrev, goToNext]);

  const download = async () => {
    if (!pet) return;
    try {
      setIsDownloading(true);
      await downloadSelectedImages([pet.url]);
      showToast('Downloaded image', { type: 'success', duration: 3000 });
    } catch (err) {
      console.error('Download failed:', err);
      showToast('Download failed. Please check your browser settings.', { type: 'error', duration: 5000 });
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <PageWrapper>
      <Navbar />
      <MainContent>
        <Shell>
          <TopRow>
            <BackButton onClick={() => navigate(-1)}>
              <ArrowLeftIcon />
              Back to Gallery
            </BackButton>
            {!loading && !error && pet && pets.length > 0 && (
              <Counter>{petIndex + 1} of {pets.length}</Counter>
            )}
          </TopRow>

          {loading ? (
            <StateOverlay>
              <Spinner />
              <p>Fetching pet details…</p>
            </StateOverlay>
          ) : error ? (
            <StateOverlay>
              <Notice>
                <NoticeTitle>Could not load pets</NoticeTitle>
                <NoticeBody>{error}</NoticeBody>
              </Notice>
            </StateOverlay>
          ) : !index ? (
            <StateOverlay>
              <Notice>
                <NoticeTitle>Invalid pet link</NoticeTitle>
                <NoticeBody>Missing pet index in the URL.</NoticeBody>
              </Notice>
            </StateOverlay>
          ) : !pet ? (
            <StateOverlay>
              <Notice>
                <NoticeTitle>Pet not found</NoticeTitle>
                <NoticeBody>We couldn't find a pet matching this link.</NoticeBody>
              </Notice>
            </StateOverlay>
          ) : (
            <Body>
              <ImageArea>
                <ImagePanel>
                  <PetImage src={pet.url} alt={pet.title} />
                </ImagePanel>

                <NavArrow
                  $side="left"
                  onClick={goToPrev}
                  disabled={prevIndex === null}
                  aria-label="Previous pet"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </NavArrow>

                <NavArrow
                  $side="right"
                  onClick={goToNext}
                  disabled={nextIndex === null}
                  aria-label="Next pet"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </NavArrow>
              </ImageArea>

              <InfoPanel>
                <header>
                  <Title>{pet.title}</Title>
                  <Meta>Added {formatCreated(pet.created)}</Meta>
                </header>

                <Description>{pet.description}</Description>

                <ActionsRow>
                  <PrimaryButton onClick={download} disabled={isDownloading} $loading={isDownloading}>
                    {isDownloading ? <ButtonSpinner /> : null}
                    Download
                  </PrimaryButton>
                </ActionsRow>
              </InfoPanel>
            </Body>
          )}
        </Shell>
      </MainContent>
    </PageWrapper>
  );
};

export default PetDetail;

