import { proxy } from 'valtio';

interface Store {
  sidebarOpen: boolean;
}

export const commonState = proxy<Store>({
  sidebarOpen: true,
});
