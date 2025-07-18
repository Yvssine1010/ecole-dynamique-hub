import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'admin' | 'student' | 'teacher' | 'accountant';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const mockUsers: (User & { password: string })[] = [
  {
    id: '1',
    name: 'Administrateur Principal',
    email: 'admin@school.com',
    password: 'admin123',
    role: 'admin',
    avatar: '/api/placeholder/40/40'
  },
  {
    id: '2',
    name: 'Prof. Marie Dubois',
    email: 'marie.dubois@school.com',
    password: 'teacher123',
    role: 'teacher',
    avatar: '/api/placeholder/40/40'
  },
  {
    id: '3',
    name: 'Jean Étudiant',
    email: 'jean.etudiant@school.com',
    password: 'student123',
    role: 'student',
    avatar: '/api/placeholder/40/40'
  },
  {
    id: '4',
    name: 'Claire Comptable',
    email: 'claire.comptable@school.com',
    password: 'accountant123',
    role: 'accountant',
    avatar: '/api/placeholder/40/40'
  }
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = mockUsers.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}