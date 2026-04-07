import { useContext } from 'react';
import { SelectionContext } from '../context/SelectionContext';

export const useSelection = () => {
  const ctx = useContext(SelectionContext);
  if (!ctx) {
    throw new Error('useSelection must be used within a <SelectionProvider>');
  }
  return ctx;
};
