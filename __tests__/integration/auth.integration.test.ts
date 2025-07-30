import { useAuthStore } from '@/stores/useAuthStore';
import type { User } from 'firebase/auth';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth';
import { auth } from '../../firebase';

// --- Mock Firebase Auth ---
jest.mock('firebase/auth', () => ({
  createUserWithEmailAndPassword: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(),
  onAuthStateChanged: jest.fn(),
}));

const mockCreateUser = createUserWithEmailAndPassword as jest.MockedFunction<typeof createUserWithEmailAndPassword>;
const mockSignIn = signInWithEmailAndPassword as jest.MockedFunction<typeof signInWithEmailAndPassword>;
const mockSignOut = signOut as jest.MockedFunction<typeof signOut>;

// --- Mock Firebase Config ---
jest.mock('../../firebase', () => ({
  auth: { currentUser: null },
}));

// --- Helper to create a mock user ---
const createMockUser = (overrides: Partial<User> = {}): User => ({
  uid: '123',
  email: 'test@example.com',
  emailVerified: true,
  displayName: null,
  photoURL: null,
  getIdToken: jest.fn().mockResolvedValue('mock-token'),
  ...overrides,
} as unknown as User);

// --- Helper to create a mock UserCredential ---
const createMockUserCredential = (user: User) => ({
  user,
  providerId: 'password',
  operationType: 'signIn' as const,
});

describe('Auth Integration', () => {
  const testEmail = 'integration-test@example.com';
  const testPassword = 'TestPassword123!';
  
  beforeEach(() => {
    jest.clearAllMocks();
    useAuthStore.setState({
      user: null,
      loading: false,
      error: null,
      isAuthenticated: false,
    });
  });

  it('should complete full authentication lifecycle', async () => {
    const store = useAuthStore.getState();
    const mockUser = createMockUser({ email: testEmail });

    // Step 1: Sign Up
    mockCreateUser.mockResolvedValue(createMockUserCredential(mockUser));
    let user = await store.signUp({
      email: testEmail,
      password: testPassword,
    });

    // Verify signup success
    expect(mockCreateUser).toHaveBeenCalledWith(auth, testEmail, testPassword);
    expect(user).toEqual(mockUser);
    expect(useAuthStore.getState().isAuthenticated).toBe(true);
    expect(useAuthStore.getState().error).toBeNull();

    // Step 2: Sign Out
    mockSignOut.mockResolvedValue(undefined);
    await store.signOut();
    
    // Verify signout success
    expect(mockSignOut).toHaveBeenCalledWith(auth);
    expect(useAuthStore.getState().user).toBeNull();
    expect(useAuthStore.getState().isAuthenticated).toBe(false);

    // Step 3: Sign In
    mockSignIn.mockResolvedValue(createMockUserCredential(mockUser));
    user = await store.signIn(testEmail, testPassword);

    // Verify signin success
    expect(mockSignIn).toHaveBeenCalledWith(auth, testEmail, testPassword);
    expect(user).toEqual(mockUser);
    expect(useAuthStore.getState().isAuthenticated).toBe(true);
    expect(useAuthStore.getState().error).toBeNull();
    expect(user.getIdToken).toHaveBeenCalled();
  });

  it('should handle invalid credentials during sign in', async () => {
    const store = useAuthStore.getState();
    mockSignIn.mockRejectedValue({ code: 'auth/wrong-password' });

    await expect(store.signIn(testEmail, 'wrongpassword'))
      .rejects
      .toEqual({
        code: 'auth/wrong-password',
        message: 'Invalid email or password',
      });

    expect(useAuthStore.getState().error).toEqual({
      code: 'auth/wrong-password',
      message: 'Invalid email or password',
    });
    expect(useAuthStore.getState().isAuthenticated).toBe(false);
    expect(useAuthStore.getState().user).toBeNull();
  });

  it('should handle network errors during sign in', async () => {
    const store = useAuthStore.getState();
    mockSignIn.mockRejectedValue(new Error('Network Error'));

    await expect(store.signIn(testEmail, testPassword))
      .rejects
      .toThrow('Network Error');

    expect(useAuthStore.getState().isAuthenticated).toBe(false);
    expect(useAuthStore.getState().user).toBeNull();
  });
}); 