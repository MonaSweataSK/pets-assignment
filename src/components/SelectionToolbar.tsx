import React from 'react';
import styled from 'styled-components';

interface SelectionToolbarProps {
  selectedCount: number;
  totalSize: string; // e.g. "2.4 MB"
  onSelectAll: () => void;
  onClearAll: () => void;
  onDownload: () => void;
  isDownloading?: boolean;
}

const ToolbarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 48px;
  background-color: ${props => props.theme.colors.surface};
  border-bottom: 1px solid ${props => props.theme.colors.container};

  @media (max-width: 640px) {
    flex-direction: column;
    gap: 16px;
    padding: 16px 24px;
    align-items: flex-start;
  }
`;

const InfoGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
`;

const SelectionCount = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: ${props => props.theme.colors.onSurface};
`;

const ActionLink = styled.button`
  font-size: 14px;
  font-weight: 500;
  color: ${props => props.theme.colors.onSurfaceVariant};
  text-decoration: none;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  transition: color 0.15s ease;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const DownloadButton = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  padding: 10px 20px;
  border-radius: ${props => props.theme.radius.md};
  font-size: 14px;
  font-weight: 700;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(164, 55, 0, 0.2);

  &:hover {
    background-color: ${props => props.theme.colors.primaryContainer};
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(164, 55, 0, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background-color: ${props => props.theme.colors.outline};
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const DownloadIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
);

const SelectionToolbar: React.FC<SelectionToolbarProps> = ({
  selectedCount,
  totalSize,
  onSelectAll,
  onClearAll,
  onDownload,
  isDownloading = false
}) => {
    return (
        <ToolbarContainer>
            <InfoGroup>
                <SelectionCount>
                  {selectedCount} item{selectedCount !== 1 ? 's' : ''} selected
                  {selectedCount > 0 && ` • ${totalSize}`}
                </SelectionCount>
                <ActionLink onClick={onSelectAll}>Select All</ActionLink>
                <ActionLink onClick={onClearAll} disabled={selectedCount === 0}>Clear</ActionLink>
            </InfoGroup>
            <DownloadButton 
              onClick={onDownload} 
              disabled={selectedCount === 0 || isDownloading}
            >
                <DownloadIcon />
                {isDownloading ? 'Downloading...' : 'Download Selected'}
            </DownloadButton>
        </ToolbarContainer>
    );
};

export default SelectionToolbar;
