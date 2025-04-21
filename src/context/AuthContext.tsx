
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AuthContextType, User } from '@/types/types';
import { users, fireStations } from '@/data/mockData';

// Create auth context with default values
const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  isFireStation: false,
  login: () => {},
  logout: () => {},
});

// Auth provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isFireStation, setIsFireStation] = useState<boolean>(false);

  // Login function
  const login = (userId: string, isStation: boolean) => {
    if (isStation) {
      // Find fire station by ID
      setIsFireStation(true);
      setCurrentUser(null);
    } else {
      // Find user by ID
      const user = users.find(u => u.id === userId);
      if (user) {
        setCurrentUser(user);
        setIsFireStation(false);
      }
    }
  };

  // Logout function
  const logout = () => {
    setCurrentUser(null);
    setIsFireStation(false);
  };

  return (
    <AuthContext.Provider value={{ currentUser, isFireStation, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook for using auth context
export const useAuth = () => useContext(AuthContext);

// For demo purposes: Auto-login function
export const useAutoLogin = () => {
  const { login } = useAuth();
  
  const loginAsUser = () => {
    login('1', false); // Login as John Doe
  };
  
  const loginAsFireStation = () => {
    login('fs1', true); // Login as Central Fire Station
  };
  
  return { loginAsUser, loginAsFireStation };
};
