import { useAuthStore } from "@/stores/useAuthStore";
import type { User } from "firebase/auth";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase";

// --- Mock Firebase Auth ---
jest.mock("firebase/auth", () => ({
  createUserWithEmailAndPassword: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(),
  onAuthStateChanged: jest.fn(),
}));

const mockCreateUser = createUserWithEmailAndPassword as jest.MockedFunction<
  typeof createUserWithEmailAndPassword
>;
const mockSignIn = signInWithEmailAndPassword as jest.MockedFunction<
  typeof signInWithEmailAndPassword
>;
const mockSignOut = signOut as jest.MockedFunction<typeof signOut>;

// --- Mock Firebase Config ---
jest.mock("../../firebase", () => ({
  auth: { currentUser: null },
}));

// --- Helper to create a mock user ---
const createMockUser = (overrides: Partial<User> = {}): User =>
  ({
    uid: "123",
    email: "test@example.com",
    emailVerified: true,
    displayName: null,
    photoURL: null,
    getIdToken: jest.fn().mockResolvedValue("mock-token"),
    ...overrides,
  }) as unknown as User;

// --- Helper to create a mock UserCredential ---
const createMockUserCredential = (user: User) => ({
  user,
  providerId: "password",
  operationType: "signIn" as const,
});

describe("useAuthStore", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useAuthStore.setState({
      user: null,
      loading: false,
      error: null,
      isAuthenticated: false,
    });
  });

  describe("signUp", () => {
    it("should successfully register a user with valid data", async () => {
      const mockUser = createMockUser();
      mockCreateUser.mockResolvedValue(createMockUserCredential(mockUser));
      const store = useAuthStore.getState();
      const result = await store.signUp({
        email: "test@example.com",
        password: "password123",
      });

      expect(mockCreateUser).toHaveBeenCalledWith(
        auth,
        "test@example.com",
        "password123",
      );
      expect(result).toEqual(mockUser);
      expect(useAuthStore.getState().user).toEqual(mockUser);
      expect(useAuthStore.getState().loading).toBe(false);
      expect(useAuthStore.getState().error).toBeNull();
    });

    it("should handle validation errors for missing fields", async () => {
      const store = useAuthStore.getState();

      await expect(
        store.signUp({ email: "", password: "password123" }),
      ).rejects.toEqual({
        code: "validation/missing-fields",
        message: "All fields are required",
      });

      expect(useAuthStore.getState().error).toEqual({
        code: "validation/missing-fields",
        message: "All fields are required",
      });
    });

    it("should handle Firebase auth errors", async () => {
      mockCreateUser.mockRejectedValue({
        code: "auth/email-already-in-use",
        message: "Firebase error",
      });

      const store = useAuthStore.getState();

      await expect(
        store.signUp({ email: "test@example.com", password: "password123" }),
      ).rejects.toEqual({
        code: "auth/email-already-in-use",
        message: "Email address is already in use",
      });

      expect(useAuthStore.getState().error).toEqual({
        code: "auth/email-already-in-use",
        message: "Email address is already in use",
      });
    });
  });

  describe("signIn", () => {
    it("should successfully sign in a user", async () => {
      const mockUser = createMockUser();
      mockSignIn.mockResolvedValue(createMockUserCredential(mockUser));

      const store = useAuthStore.getState();
      const result = await store.signIn("test@example.com", "password123");

      expect(mockSignIn).toHaveBeenCalledWith(
        auth,
        "test@example.com",
        "password123",
      );
      expect(mockUser.getIdToken).toHaveBeenCalled();
      expect(result).toEqual(mockUser);
      expect(useAuthStore.getState().user).toEqual(mockUser);
      expect(useAuthStore.getState().isAuthenticated).toBe(true);
      expect(useAuthStore.getState().loading).toBe(false);
    });

    it("should handle sign in errors", async () => {
      mockSignIn.mockRejectedValue({ code: "auth/wrong-password" });
      const store = useAuthStore.getState();

      await expect(
        store.signIn("test@example.com", "wrongpassword"),
      ).rejects.toEqual({
        code: "auth/wrong-password",
        message: "Invalid email or password",
      });

      expect(useAuthStore.getState().error).toEqual({
        code: "auth/wrong-password",
        message: "Invalid email or password",
      });
      expect(useAuthStore.getState().loading).toBe(false);
    });
  });

  describe("signOut", () => {
    it("should successfully sign out a user", async () => {
      useAuthStore.setState({
        user: createMockUser(),
        isAuthenticated: true,
      });

      mockSignOut.mockResolvedValue(undefined);

      const store = useAuthStore.getState();
      await store.signOut();

      expect(mockSignOut).toHaveBeenCalledWith(auth);
      expect(useAuthStore.getState().user).toBeNull();
      expect(useAuthStore.getState().user).toBe(null);
      expect(useAuthStore.getState().isAuthenticated).toBe(false);
    });
  });
});
