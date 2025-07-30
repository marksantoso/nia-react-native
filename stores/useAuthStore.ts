import {
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  signInWithEmailAndPassword
} from 'firebase/auth';
import { create } from 'zustand';
import { auth } from '../firebase';
 
interface RegisterData {
  email: string;
  password: string;
}

interface AuthStore {
  user: any;
  loading: boolean;
  error: { message: string; code?: string } | null;
  isAuthenticated: boolean;
  init: () => void;
  setError: (message: string) => void;
  clearError: () => void;
  signUp: (data: RegisterData) => Promise<any>;
  signIn: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<void>;
  checkAuth: () => Promise<boolean>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  loading: true,
  error: null,
  isAuthenticated: false,

  setError: (message: string) => set({ error: { message } }),

  clearError: () => set({ error: null }),

  init: () => {
    set({ loading: true });
    return onAuthStateChanged(auth, (user) => {
      set({
        user,
        isAuthenticated: !!user,
        loading: false
      });
    });
  },

  signUp: async (data: RegisterData) => {
    try {
      set({ loading: true, error: null });

      if (!data.email || !data.password) {
        throw { code: 'validation/missing-fields', message: 'All fields are required' };
      }

      if (data.password.length < 8) {
        throw { code: 'validation/weak-password', message: 'Password must be at least 8 characters long' };
      }

      const result = await createUserWithEmailAndPassword(auth, data.email, data.password);
      set({ user: result.user, loading: false });
      return result.user;
    } catch (err: any) {
      let error = {
        code: err.code,
        message: 'An error occurred during registration'
      };

      switch (err.code) {
        case 'auth/email-already-in-use':
          error.message = 'Email address is already in use';
          break;
        case 'auth/invalid-email':
          error.message = 'Invalid email address';
          break;
        case 'auth/weak-password':
          error.message = 'Password is too weak';
          break;
        case 'validation/missing-fields':
          error.message = 'All fields are required';
          break;
      }

      set({ error, loading: false });
      throw error;
    }
  },

  signIn: async (email: string, password: string) => {
    try {
      set({ loading: true });
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      await user.getIdToken();
      set({ user, isAuthenticated: true, loading: false });
      return user;
    } catch (error) {
      set({ error: { code: 'auth/wrong-password', message: 'Invalid email or password' }, loading: false });
    }
  },

  signOut: async () => {
    await firebaseSignOut(auth);
    set({ user: null, isAuthenticated: false });
  },

  checkAuth: async () => {
    try {
      set({ loading: true });
      const currentUser = auth.currentUser;
      set({
        user: currentUser,
        isAuthenticated: !!currentUser,
        loading: false
      });

      return !!currentUser;
    } catch (error) {
      set({ user: null, isAuthenticated: false, loading: false });
      return false;
    }
  },
}));
