import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase.config";
import { useRouter } from "next/router";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const router = useRouter();

  const errorMessages = [
    {
      code: "Firebase: Error (auth/invalid-email).",
      message: "Invalid email address.",
    },
    {
      code: "Firebase: Error (auth/email-already-in-use).",
      message: "Email address already in use.",
    },
    {
      code: "Firebase: Password should be at least 6 characters (auth/weak-password).",
      message: "Password should be at least 6 characters.",
    },
    {
      code: "Firebase: Error (auth/user-not-found).",
      message: "User not found, check the data entered",
    },
    {
      code: "Firebase: Error (auth/wrong-password).",
      message: "Wrong password.",
    },
    {
      code: "Firebase: Error (auth/user-disabled).",
      message:
        "Your account has been disabled. Contact technical service for more information.",
    },
    {
      code: "Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).",
      message:
        "Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.",
    },
    {
      code: "Firebase: Error (auth/account-exists-with-different-credential).",
      message:
        "An account with the same email address already exists. Please try logging in with another provider associated with this email address.",
    },
  ];

  // Register user with email and password
  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // signIn with email and password
  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Login with google
  const signInWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider);
  };

  // Login with github
  const signInWithGithub = () => {
    const githubProvider = new GithubAuthProvider();
    return signInWithPopup(auth, githubProvider);
  };

  // accountSignOut
  const accountSignOut = () => signOut(auth);

  // send password reset email
  const resetPassword = (email) => sendPasswordResetEmail(auth, email);

  // Transform error message to user friendly message
  const findErrorMessage = (msg) => {
    let errorMessage = errorMessages.find((error) => error.code === msg);

    if (!errorMessage)
      errorMessage = {
        message: "Oops... an error occurred",
      };

    return errorMessage.message;
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoadingUser(false);
    });
  }, []);

  useEffect(() => {
    if (!loadingUser) {
      if (user && router.pathname === "/login") router.push("/");
      if (!user) router.push("/login");
    }
  }, [user]);

  if (loadingUser)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-14 h-14 border-[5px] rounded-full border-slate-50 animate-spin border-t-blue-500" />
      </div>
    );

  return (
    <AuthContext.Provider
      value={{
        user,
        loadingUser,
        signUp,
        signIn,
        signInWithGoogle,
        signInWithGithub,
        accountSignOut,
        resetPassword,
        findErrorMessage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
