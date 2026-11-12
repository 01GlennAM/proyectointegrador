import { createContext, useContext, useState } from "react";
import { DEMO_ACCOUNT } from "../services/demoAuth.js";

const DemoAuthContext = createContext(null);

export function DemoAuthProvider({ children }) {
  const [user, setUser] = useState(null);

  function signIn(email, password) {
    if (
      email.trim().toLowerCase() !== DEMO_ACCOUNT.email ||
      password !== DEMO_ACCOUNT.password
    ) {
      return false;
    }
    setUser({ email: DEMO_ACCOUNT.email });
    return true;
  }

  function register(email) {
    setUser({ email: email.trim().toLowerCase() });
  }

  function signOut() {
    setUser(null);
  }

  return (
    <DemoAuthContext.Provider value={{ user, signIn, register, signOut }}>
      {children}
    </DemoAuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useDemoAuth() {
  const context = useContext(DemoAuthContext);
  if (!context) {
    throw new Error("useDemoAuth debe utilizarse dentro de DemoAuthProvider.");
  }
  return context;
}
