import { createContext, useReducer, useContext } from 'react';
import type { ReactNode } from 'react';
import type { Pet } from '../types/Pet';

interface SelectionState {
  selectedUrls: Set<string>;
}

const initialState: SelectionState = {
  selectedUrls: new Set(),
};


type SelectionAction =
  | { type: 'SELECT'; url: string }
  | { type: 'CLEAR'; url: string }
  | { type: 'SELECT_ALL'; urls: string[] }
  | { type: 'CLEAR_ALL' };


const selectionReducer = (
  state: SelectionState,
  action: SelectionAction
): SelectionState => {
  switch (action.type) {
    case 'SELECT':
      return {
        selectedUrls: new Set([...state.selectedUrls, action.url]),
      };

    case 'CLEAR': {
      const next = new Set(state.selectedUrls);
      next.delete(action.url);
      return { selectedUrls: next };
    }

    case 'SELECT_ALL':
      return {
        selectedUrls: new Set(action.urls),
      };

    case 'CLEAR_ALL':
      return { selectedUrls: new Set() };

    default:
      return state;
  }
};


interface SelectionContextValue {
  selectedUrls: Set<string>;
  select: (url: string) => void;
  clear: (url: string) => void;
  selectAll: (pets: Pet[]) => void;
  clearAll: () => void;
  isSelected: (url: string) => boolean;
}

export const SelectionContext = createContext<SelectionContextValue | null>(null);


export const SelectionProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(selectionReducer, initialState);

  const select = (url: string) => dispatch({ type: 'SELECT', url });
  const clear = (url: string) => dispatch({ type: 'CLEAR', url });
  const selectAll = (pets: Pet[]) =>
    dispatch({ type: 'SELECT_ALL', urls: pets.map((p) => p.url) });
  const clearAll = () => dispatch({ type: 'CLEAR_ALL' });
  const isSelected = (url: string) => state.selectedUrls.has(url);

  return (
    <SelectionContext.Provider
      value={{ selectedUrls: state.selectedUrls, select, clear, selectAll, clearAll, isSelected }}
    >
      {children}
    </SelectionContext.Provider>
  );
};

export const useSelection = () => {
  const context = useContext(SelectionContext);
  if (!context) {
    throw new Error('useSelection must be used within a SelectionProvider');
  }
  return context;
};
