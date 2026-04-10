import React, { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { usePets } from '../hooks/usePets';
import { downloadSelectedImages } from '../utils/downloadImages';
import { useToast } from '../ui/Toast/Toast';

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${props => props.theme.colors.surface};
`;

const MainContent = styled.main`
  flex: 1;
  width: 100%;
`;

const Container = styled.div`
  max-width: 860px;
  margin: 0 auto;
  padding: 48px 24px 80px;

  @media (max-width: 640px) {
    padding: 24px;
  }
`;

const Title = styled.h1`
  margin: 0;
  font-family: ${props => props.theme.typography.heading};
  font-size: 52px;
  font-weight: 900;
  letter-spacing: -0.02em;
  color: ${props => props.theme.colors.onSurface};
  line-height: 1.1;

  @media (max-width: 640px) {
    font-size: 36px;
  }
`;

const Meta = styled.p`
  margin: 10px 0 0;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${props => props.theme.colors.onSurfaceVariant};
`;

const BackRow = styled.div`
  margin-bottom: 40px;
`;

const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  font-size: 14px;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
  font-family: ${props => props.theme.typography.sans};

  &:hover {
    text-decoration: underline;
    text-underline-offset: 4px;
  }
`;

const ArrowLeftIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5" />
    <path d="M12 19l-7-7 7-7" />
  </svg>
);

const HeroImageWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  border-radius: ${props => props.theme.radius.lg};
  background-color: ${props => props.theme.colors.container};
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  object-fit: contain;
  display: block;
`;

const SplitLayout = styled.section`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 360px;
  gap: 32px;
  align-items: start;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

const Content = styled.div`
  width: 100%;
`;

const DescriptionBlock = styled.div`
  margin-top: 24px;
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Description = styled.p`
  margin: 0;
  font-size: 18px;
  line-height: 1.8;
  color: ${props => props.theme.colors.onSurfaceVariant};
  font-weight: 500;
`;

const ActionsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
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

const LoadingOverlay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100px 24px;
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

const formatCreated = (created: string) => {
  const date = new Date(created);
  if (Number.isNaN(date.getTime())) return created;
  return new Intl.DateTimeFormat(undefined, { year: 'numeric', month: 'short', day: '2-digit' }).format(date);
};

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
        <Container>
          <BackRow>
            <BackButton onClick={() => navigate(-1)}>
              <ArrowLeftIcon />
              Back to Gallery
            </BackButton>
          </BackRow>

          {loading ? (
            <LoadingOverlay>
              <Spinner />
              <p>Fetching pet details...</p>
            </LoadingOverlay>
          ) : error ? (
            <Notice>
              <NoticeTitle>Could not load pets</NoticeTitle>
              <NoticeBody>{error}</NoticeBody>
            </Notice>
          ) : !index ? (
            <Notice>
              <NoticeTitle>Invalid pet link</NoticeTitle>
              <NoticeBody>Missing pet index in the URL.</NoticeBody>
            </Notice>
          ) : !pet ? (
            <Notice>
              <NoticeTitle>Pet not found</NoticeTitle>
              <NoticeBody>We couldn’t find a pet matching this link.</NoticeBody>
            </Notice>
          ) : (
            <SplitLayout>
              <HeroImageWrapper>
                <Image src={pet.url} alt={pet.title} />
              </HeroImageWrapper>

              <Content>
                <header>
                  <Title>{pet.title}</Title>
                  <Meta>Added {formatCreated(pet.created)}</Meta>
                </header>

                <DescriptionBlock>
                  <Description>{pet.description}</Description>
                </DescriptionBlock>

                <ActionsRow>
                  <PrimaryButton onClick={download} disabled={isDownloading} $loading={isDownloading}>
                    {isDownloading ? <ButtonSpinner /> : null}
                    Download
                  </PrimaryButton>
                </ActionsRow>
              </Content>
            </SplitLayout>
          )}
        </Container>
      </MainContent>
      <Footer />
    </PageWrapper>
  );
};

export default PetDetail;
