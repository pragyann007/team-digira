import { useSelector } from "react-redux";

export const useAuth = () => {
  const mockAuth = {
    token: "mock-token",
    user: { id: 1, role: "admin", name: "Divya" },
    authReady: true,
  };

  try {
    const auth = useSelector((state) => state.auth);
    return auth && auth.user ? auth : mockAuth;
  } catch {
    return mockAuth;
  }
};
