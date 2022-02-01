import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebaseConfig";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  console.log(user);

  // Register user with email and password
  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // signIn with email and password
  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // accountSignOut
  const accountSignOut = () => signOut(auth);

  // Login with google
  const signInWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoadingUser(false);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loadingUser,
        signUp,
        signIn,
        accountSignOut,
        signInWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
