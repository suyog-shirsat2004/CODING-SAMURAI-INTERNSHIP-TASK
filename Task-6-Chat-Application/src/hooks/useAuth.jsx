import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { auth } from '../config/firebase';
import {
  signInAnonymously,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

const USE_DEMO = true;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (USE_DEMO) {
      const savedUser = localStorage.getItem('chatUser');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const loginWithGoogle = async () => {
    if (USE_DEMO) {
      const demoUser = {
        uid: 'demo-' + Date.now(),
        displayName: 'Demo User',
        email: 'demo@chatapp.com',
        photoURL: null,
        isDemo: true
      };
      localStorage.setItem('chatUser', JSON.stringify(demoUser));
      setUser(demoUser);
      return;
    }

    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const loginAnonymous = async () => {
    if (USE_DEMO) {
      const demoUser = {
        uid: 'guest-' + Date.now(),
        displayName: 'Guest' + Math.floor(Math.random() * 1000),
        email: null,
        photoURL: null,
        isDemo: true
      };
      localStorage.setItem('chatUser', JSON.stringify(demoUser));
      setUser(demoUser);
      return;
    }

    return signInAnonymously(auth);
  };

  const logout = async () => {
    if (USE_DEMO) {
      localStorage.removeItem('chatUser');
      setUser(null);
      return;
    }

    return signOut(auth);
  };

  const value = {
    user,
    loading,
    loginWithGoogle,
    loginAnonymous,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
