import React, { useState, useMemo, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import SelectionToolbar from '../components/SelectionToolbar';
import { PetGrid, PetCard, PetCardSkeleton } from '../components/PetGrid';
import { PetDetailModal } from '../components/PetDetailModal';

import Footer from '../components/Footer';
import { usePets } from '../hooks/usePets';
import { useSelection } from '../context/SelectionContext';
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
  display: flex;
  flex-direction: column;
`;

const ErrorOverlay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: 80px;
  gap: 20px;
  color: ${props => props.theme.colors.primary};
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 120px 48px;
  text-align: center;
  gap: 16px;
  color: ${props => props.theme.colors.onSurfaceVariant};
`;

const StickyHeader = styled.div`
  position: sticky;
  top: 80px;
  z-index: 90;
  background-color: ${props => props.theme.colors.lowest};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
`;

const SortResetSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 64px 24px;
  background-color: ${props => props.theme.colors.surface};
  border-top: 1px solid ${props => props.theme.colors.container};
  text-align: center;
`;

const ResetButton = styled.button`
  padding: 12px 24px;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${props => props.theme.radius.md};
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${props => props.theme.colors.primaryContainer};
    transform: translateY(-2px);
  }
`;

const SortMessage = styled.p`
  color: ${props => props.theme.colors.onSurfaceVariant};
  font-size: 15px;
  max-width: 400px;
  line-height: 1.5;
`;

const Home: React.FC = () => {
    const { pets, setPets, loading, isFetchingMore, error, loadMore, hasMore } = usePets();
    const { selectedUrls, selectAll, clearAll } = useSelection();
    
    const { index } = useParams();
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('none');
    const [isDownloading, setIsDownloading] = useState(false);

    // Auto-scroll to top when sorting changes to help user see new results
    useEffect(() => {
        if (sortOrder !== 'none') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [sortOrder]);

    const { showToast } = useToast();

    // The core architectural switch: Infinite vs Sorted
    const isSortedMode = sortOrder !== 'none';

    // Sentinel for infinite scroll
    const sentinelRef = useRef<HTMLDivElement>(null);

    // Infinite scroll observer: Only active in non-sorted mode
    useEffect(() => {
        if (!sentinelRef.current || !hasMore || loading || isFetchingMore || isSortedMode) return;

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                loadMore();
            }
        }, { threshold: 0.1 });

        observer.observe(sentinelRef.current);
        return () => observer.disconnect();
    }, [loadMore, hasMore, loading, isFetchingMore]);

    // Derive selectedPetIndex from URL param
    const selectedPetIndex = useMemo(() => {
        if (index === undefined) return null;
        const n = parseInt(index, 10);
        return isNaN(n) ? null : n;
    }, [index]);

    // Filtering & Sorting Logic
    const filteredAndSortedPets = useMemo(() => {
        let result = [...pets];

        // Filter
        if (searchTerm) {
            const lowerTerm = searchTerm.toLowerCase();
            result = result.filter(pet => 
                pet.title.toLowerCase().includes(lowerTerm) || 
                pet.description.toLowerCase().includes(lowerTerm)
            );
        }

        // Sort: Only apply if a specific order is selected
        if (sortOrder !== 'none') {
            result.sort((a, b) => {
                switch (sortOrder) {
                    case 'name-asc':
                        return (a.title || '').localeCompare(b.title || '', 'en', { sensitivity: 'base' });
                    case 'name-desc':
                        return (b.title || '').localeCompare(a.title || '', 'en', { sensitivity: 'base' });
                    case 'date-newest':
                        return new Date(b.created).getTime() - new Date(a.created).getTime();
                    case 'date-oldest':
                        return new Date(a.created).getTime() - new Date(b.created).getTime();
                    default:
                        return 0;
                }
            });
        }

        return result;
    }, [pets, searchTerm, sortOrder]);

    // Ensure the index remains valid if the list changes
    useEffect(() => {
        if (selectedPetIndex !== null && selectedPetIndex >= filteredAndSortedPets.length) {
            // Only redirect if we AREN'T loading more and the pets list isn't empty
            if (!loading && !isFetchingMore && filteredAndSortedPets.length > 0) {
               navigate('/', { replace: true });
            }
        }
    }, [filteredAndSortedPets, selectedPetIndex, navigate, loading, isFetchingMore]);

    const handleSelectAll = () => {
        selectAll(filteredAndSortedPets);
    };

    const handleDownload = async () => {
        try {
            setIsDownloading(true);
            const urls = Array.from(selectedUrls);
            await downloadSelectedImages(urls);
            showToast(`Successfully downloaded ${urls.length} images`, { type: 'success', duration: 3000 });
            clearAll(); // Clear selection after processing
        } catch (err) {
            console.error('Download failed:', err);
            showToast('Some images failed to download. Please check your browser settings.', { type: 'error', duration: 5000 });
        } finally {
            setIsDownloading(false);
        }
    };

    // Modal navigation
    const handleNextPet = () => {
        if (selectedPetIndex !== null && selectedPetIndex < filteredAndSortedPets.length - 1) {
            navigate(`/pet/${selectedPetIndex + 1}`);
        }
    };

    const handlePrevPet = () => {
        if (selectedPetIndex !== null && selectedPetIndex > 0) {
            navigate(`/pet/${selectedPetIndex - 1}`);
        }
    };

    const handleOpenPet = (idx: number) => {
        navigate(`/pet/${idx}`);
    };

    const handleClosePet = () => {
        navigate('/');
    };

    const handleResetSort = () => {
        // Handover current sorted order to state to prevent jumping
        setPets(filteredAndSortedPets);
        setSortOrder('none');
        // Initiate fetch immediately
        setTimeout(() => loadMore(), 0);
    };

    // Calculate mocked size (0.8MB per selected image)
    const totalSize = (selectedUrls.size * 0.8).toFixed(1) + ' MB';

    return (
        <PageWrapper>
            <Navbar />
            <MainContent>
                <StickyHeader>
                    <SearchBar 
                        searchTerm={searchTerm} 
                        onSearchChange={setSearchTerm}
                        sortOrder={sortOrder}
                        onSortChange={setSortOrder}
                    />
                    
                    {selectedUrls.size > 0 && (
                        <SelectionToolbar 
                            selectedCount={selectedUrls.size}
                            totalSize={totalSize}
                            onSelectAll={handleSelectAll}
                            onClearAll={clearAll}
                            onDownload={handleDownload}
                            isDownloading={isDownloading}
                        />
                    )}
                </StickyHeader>

                {loading && pets.length === 0 ? (
                    <PetGrid>
                        {[...Array(8)].map((_, i) => (
                            <PetCardSkeleton key={i} />
                        ))}
                    </PetGrid>
                ) : error ? (
                    <ErrorOverlay>
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="8" x2="12" y2="12" />
                            <line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                        <p>Failed to load pets: {error}</p>
                    </ErrorOverlay>
                ) : filteredAndSortedPets.length === 0 ? (
                    <EmptyState>
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}>
                            <path d="M10 13a5 5 0 0 0 7.54.54l3.92 3.92" />
                            <circle cx="7" cy="7" r="5" />
                            <path d="M5 11v8a2 2 0 0 0 2 2h8" />
                        </svg>
                        <h3>No pets found</h3>
                        <p>Try adjusting your search or filters to find what you're looking for.</p>
                    </EmptyState>
                ) : (
                    <>
                        <PetGrid>
                            {filteredAndSortedPets.map((pet, index) => (
                                <PetCard 
                                    key={`${pet.url}-${index}`} 
                                    pet={pet} 
                                    petIndex={index}
                                    onOpen={handleOpenPet}
                                    priority={index < 8}
                                    fetchPriority={index === 0 ? 'high' : index < 8 ? 'auto' : 'low'}
                                />
                            ))}
                        </PetGrid>

                        {/* Sentinel for infinite scroll: Reduced to 1px to avoid phantom whitespace */}
                        {!isSortedMode && (
                            <div ref={sentinelRef} style={{ height: '1px', visibility: 'hidden', margin: 0, padding: 0 }} aria-hidden="true" />
                        )}

                        {isSortedMode && (
                            <SortResetSection>
                                <SortMessage>
                                    Infinite scroll is paused while sorting. Clear sorting to discover more pets.
                                </SortMessage>
                                <ResetButton onClick={handleResetSort}>
                                    Disable Sort & See New Images
                                </ResetButton>
                            </SortResetSection>
                        )}
                        
                        {isFetchingMore && !isSortedMode && (
                             <PetGrid>
                                {[...Array(4)].map((_, i) => (
                                    <PetCardSkeleton key={`loading-${i}`} />
                                ))}
                            </PetGrid>
                        )}

                        {selectedPetIndex !== null && filteredAndSortedPets[selectedPetIndex] && (
                            <PetDetailModal 
                                pet={filteredAndSortedPets[selectedPetIndex]}
                                nextPet={selectedPetIndex < filteredAndSortedPets.length - 1 ? filteredAndSortedPets[selectedPetIndex + 1] : undefined}
                                prevPet={selectedPetIndex > 0 ? filteredAndSortedPets[selectedPetIndex - 1] : undefined}
                                currentIndex={selectedPetIndex}
                                totalCount={filteredAndSortedPets.length}
                                onClose={handleClosePet}
                                onNext={handleNextPet}
                                onPrev={handlePrevPet}
                            />
                        )}
                    </>
                )}
            </MainContent>
            {isSortedMode && <Footer />}
        </PageWrapper>
    );
};

export default Home;
