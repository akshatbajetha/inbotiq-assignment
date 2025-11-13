import { create } from 'zustand';
import Cookies from 'js-cookie';
import { authApi, type User, type SignupData, type LoginData } from '../api';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  checkAuth: () => Promise<void>;
  login: (credentials: LoginData) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  isAuthenticated: false,

  // Check authentication status
  checkAuth: async () => {
    try {
      set({ isLoading: true });
      const response = await authApi.getCurrentUser();
      set({
        user: response.user,
        isAuthenticated: true,
        isLoading: false,
      });
      Cookies.set('user', JSON.stringify(response.user), { expires: 7 });
    } catch (error) {
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
      Cookies.remove('user');
    }
  },

  // Login
  login: async (credentials: LoginData) => {
    try {
      set({ isLoading: true });
      const response = await authApi.login(credentials);
      set({
        user: response.user,
        isAuthenticated: true,
        isLoading: false,
      });
      Cookies.set('user', JSON.stringify(response.user), { expires: 7 });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  // Signup
  signup: async (data: SignupData) => {
    try {
      set({ isLoading: true });
      const response = await authApi.signup(data);
      set({
        user: response.user,
        isAuthenticated: true,
        isLoading: false,
      });
      Cookies.set('user', JSON.stringify(response.user), { expires: 7 });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  // Logout
  logout: async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
      Cookies.remove('user');
    }
  },

  setUser: (user: User | null) => {
    set({
      user,
      isAuthenticated: !!user,
    });
  },
}));

if (typeof window !== 'undefined') {
  const userCookie = Cookies.get('user');
  if (userCookie) {
    try {
      const user = JSON.parse(userCookie) as User;
      useAuthStore.getState().setUser(user);
    } catch (error) {
      Cookies.remove('user');
    }
  }
  useAuthStore.getState().checkAuth();
}

