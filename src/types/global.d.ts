import 'global-use-state';
import type { ToastMessage } from '../ui/Toast/Toast';

declare module 'global-use-state' {
  interface GlobalState {
    selectedUrls: Set<string>;
    toasts: ToastMessage[];
  }
}
