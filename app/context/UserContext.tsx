// context/UserContext.tsx
"use client"
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@prisma/client';
import { getCurrentUser } from '../actions/getCurrentUser';

interface UserContextType {
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
        const fetchUser = async () => {
            const user = await getCurrentUser();
            if (user) {
                const { createdAt, updatedAt, emailVerified, ...rest } = user;
                setCurrentUser({
                    ...rest,
                    createdAt: new Date(createdAt),
                    updatedAt: new Date(updatedAt),
                    emailVerified: emailVerified ? new Date(emailVerified) : null,
                });
            } else {
                setCurrentUser(null);
            }
        };
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
