import * as zustand from "zustand";
import { devtools, persist } from "zustand/middleware";
import { jwtDecode } from "jwt-decode";
import { setCookie } from "../../../utils/setStorageHelper";

const create = zustand.create;

interface AuthenticationState {
  token: string;
  role: string;
  id: string;
  loading: boolean;
  error: string | null;
  setToken: (token: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

interface DecodedToken {
  role?: string;
  [key: string]: any; // To allow for additional properties in the decoded token
}

const useAuthenticationStore = create<AuthenticationState>()(
  devtools(
    persist(
      (set, get) => ({
        token: "",
        role: "",
        id: "",
        setToken: (token: string) => {
          setCookie("token", token, 30);
          set({ token });

          // Decode the token and set the role state
          try {
            const decoded: DecodedToken = jwtDecode(token);

            const role = decoded.role || ""; // Assuming 'role' is part of the decoded payload
            const id = decoded.role || ""; // Assuming 'role' is part of the decoded payload
            set({ role, id });
          } catch (error) {
            console.error("Failed to decode token:", error);
          }
        },
        loading: false,
        setLoading: (loading: boolean) => set({ loading }),
        error: null,
        setError: (error: string | null) => set({ error }),
      }),
      {
        name: "authentication-storage",
        storage: {
          getItem: (name) => {
            const item = localStorage.getItem(name);
            return item ? JSON.parse(item) : null;
          },
          setItem: (name, value) => {
            localStorage.setItem(name, JSON.stringify(value));
          },
          removeItem: (name) => {
            localStorage.removeItem(name);
          },
        },
        partialize: (state) => ({
          token: state.token,
          role: state.role,
          id: state.id,
          loading: state.loading,
          error: state.error,
          setToken: state.setToken,
          setLoading: state.setLoading,
          setError: state.setError,
        }),
      }
    )
  )
);

export default useAuthenticationStore;
