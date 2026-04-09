import React from 'react';
import styled from 'styled-components';
import { Toolbar, ToolbarGroup } from '../ui/Toolbar/Toolbar';
import { Button } from '../ui/Button/Button';

interface SelectionToolbarProps {
  selectedCount: number;
  totalSize: string; // e.g. "2.4 MB"
  onSelectAll: () => void;
  onClearAll: () => void;
  onDownload: () => void;
  isDownloading?: boolean;
}

const SelectionCount = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: ${props => props.theme.colors.onSurface};
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
        <Toolbar>
            <ToolbarGroup style={{ gap: '24px' }}>
                <SelectionCount>
                  {selectedCount} item{selectedCount !== 1 ? 's' : ''} selected
                  {selectedCount > 0 && ` • ${totalSize}`}
                </SelectionCount>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <Button variant="ghost" size="sm" onClick={onSelectAll}>Select All</Button>
                  <Button variant="ghost" size="sm" onClick={onClearAll} disabled={selectedCount === 0}>Clear</Button>
                </div>
            </ToolbarGroup>
            <Button 
              variant="primary"
              onClick={onDownload} 
              disabled={selectedCount === 0 || isDownloading}
              isLoading={isDownloading}
              leftIcon={!isDownloading ? <DownloadIcon /> : undefined}
            >
                {isDownloading ? 'Downloading...' : 'Download Selected'}
            </Button>
        </Toolbar>
    );
};

export default SelectionToolbar;
