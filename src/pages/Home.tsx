import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import SelectionToolbar from '../components/SelectionToolbar';
import { PetGrid, PetCard } from '../components/PetGrid';

import Footer from '../components/Footer';
import { usePets } from '../hooks/usePets';
import { useSelection } from '../context/SelectionContext';
import { downloadSelectedImages } from '../utils/downloadImages';

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

const LoadingOverlay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: 80px;
  gap: 20px;
  color: ${props => props.theme.colors.onSurfaceVariant};
`;

const ErrorOverlay = styled(LoadingOverlay)`
  color: ${props => props.theme.colors.primary};
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

const Home: React.FC = () => {
    const { pets, loading, error } = usePets();
    const { selectedUrls, select, clear, selectAll, clearAll, isSelected } = useSelection();
    
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('name-asc');
    const [isDownloading, setIsDownloading] = useState(false);

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

        // Sort
        result.sort((a, b) => {
            switch (sortOrder) {
                case 'name-asc':
                    return a.title.localeCompare(b.title);
                case 'name-desc':
                    return b.title.localeCompare(a.title);
                case 'date-newest':
                    return new Date(b.created).getTime() - new Date(a.created).getTime();
                case 'date-oldest':
                    return new Date(a.created).getTime() - new Date(b.created).getTime();
                default:
                    return 0;
            }
        });

        return result;
    }, [pets, searchTerm, sortOrder]);

    const handleToggleSelection = (url: string) => {
        if (isSelected(url)) {
            clear(url);
        } else {
            select(url);
        }
    };

    const handleSelectAll = () => {
        selectAll(filteredAndSortedPets);
    };

    const handleDownload = async () => {
        try {
            setIsDownloading(true);
            const urls = Array.from(selectedUrls);
            await downloadSelectedImages(urls);
        } catch (err) {
            console.error('Download failed:', err);
            alert('Some images failed to download. Please check your browser settings.');
        } finally {
            setIsDownloading(false);
        }
    };

    // Calculate mocked size (0.8MB per selected image)
    const totalSize = (selectedUrls.size * 0.8).toFixed(1) + ' MB';

    return (
        <PageWrapper>
            <Navbar />
            <MainContent>
                <SearchBar 
                    searchTerm={searchTerm} 
                    onSearchChange={setSearchTerm}
                    sortOrder={sortOrder}
                    onSortChange={setSortOrder}
                />
                
                <SelectionToolbar 
                    selectedCount={selectedUrls.size}
                    totalSize={totalSize}
                    onSelectAll={handleSelectAll}
                    onClearAll={clearAll}
                    onDownload={handleDownload}
                    isDownloading={isDownloading}
                />

                {loading ? (
                    <LoadingOverlay>
                        <Spinner />
                        <p>Curating your gallery...</p>
                    </LoadingOverlay>
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
                            {filteredAndSortedPets.map(pet => (
                                <PetCard 
                                    key={pet.url} 
                                    pet={pet} 
                                    isSelected={isSelected(pet.url)}
                                    onToggle={handleToggleSelection}
                                />
                            ))}
                        </PetGrid>

                    </>
                )}
            </MainContent>
            <Footer />
        </PageWrapper>
    );
};

export default Home;
