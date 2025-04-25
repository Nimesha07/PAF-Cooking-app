import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { auth } from '../config/firebase';

// Test user for development
const testUser = {
  email: "test@example.com",
  password: "password123"
};

const googleProvider = new GoogleAuthProvider();

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser({
          id: user.uid,
          name: user.displayName || "Test User",
          email: user.email,
          avatar: user.photoURL || "https://i.pravatar.cc/150?img=1",
          role: 'USER'
        });
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    try {
      // Check if it's the test user
      if (email === testUser.email && password === testUser.password) {
        setCurrentUser({
          id: "test-user-id",
          name: "Test User",
          email: testUser.email,
          avatar: "https://i.pravatar.cc/150?img=1",
          role: 'USER'
        });
        return true;
      }
      
      // Otherwise try Firebase authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return true;
    } catch (error) {
      setError(error.message);
      return false;
    }
  };

  const googleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return true;
    } catch (error) {
      setError(error.message);
      return false;
    }
  };

  const logout = async () => {
    try {
      if (currentUser?.id === "test-user-id") {
        setCurrentUser(null);
        setError(null);
        return;
      }
      await signOut(auth);
      setCurrentUser(null);
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  const isOwner = (userId) => {
    return currentUser?.id === userId;
  };

  const value = {
    currentUser,
    login,
    googleLogin,
    logout,
    isOwner,
    loading,
    error
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
