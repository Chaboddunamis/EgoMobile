import React, { createContext, useContext, useState, useEffect } from 'react';
import { Alert } from 'react-native';
import dummyData from '../data/dummyData';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading user session from storage
    const loadUser = async () => {
      try {
        // In a real app, you'd load from AsyncStorage or similar
        // For now, simulate a delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Example: setUser({ id: '123', email: 'test@example.com', firstName: 'Test' });
      } catch (error) {
        console.error('Failed to load user:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadUser();
  }, []);

  const login = async (email, password, accountType) => {
    setIsLoading(true);
    try {
      // Simulate API call for login
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Demo accounts for testing
      const demoAccounts = {
        'viewer@demo.com': {
          id: 'v1',
          firstName: 'John',
          lastName: 'Doe',
          email: 'viewer@demo.com',
          accountType: 'viewer',
          country: 'Nigeria',
          nationality: 'Nigerian',
        },
        'creator@demo.com': {
          id: 'c1',
          firstName: 'Amara',
          lastName: 'Okafor',
          email: 'creator@demo.com',
          accountType: 'creator',
          country: 'Nigeria',
          nationality: 'Nigerian',
          approvalStatus: 'approved',
        }
      };

      // Check demo accounts first
      if (demoAccounts[email] && password === 'password') {
        const userData = demoAccounts[email];
        if (userData.accountType === accountType) {
          setUser(userData);
          return true;
        } else {
          Alert.alert('Login Failed', `This account is registered as a ${userData.accountType}, not a ${accountType}.`);
          return false;
        }
      }

      // Check existing users in dummy data
      const existingUser = dummyData.users.find(u => 
        u.email === email && u.accountType === accountType
      );

      if (existingUser && password === 'password') {
        setUser(existingUser);
        return true;
      } else {
        Alert.alert('Login Failed', 'Invalid credentials or account type mismatch.');
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'An error occurred during login.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData) => {
    setIsLoading(true);
    try {
      // Simulate API call for registration
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Check if email already exists
      const existingUser = dummyData.users.find(u => u.email === userData.email);
      if (existingUser) {
        Alert.alert('Registration Failed', 'An account with this email already exists.');
        return false;
      }

      // Create new user
      const newUser = {
        ...userData,
        isAuthenticated: true,
        completedBids: 0,
        totalSpent: 0,
        approvalStatus: userData.accountType === 'creator' ? 'pending' : 'approved',
      };

      // Add to dummy data
      dummyData.users.push(newUser);

      // If creator, also add to creators array
      if (userData.accountType === 'creator') {
        const newCreator = {
          id: userData.id,
          name: `${userData.firstName} ${userData.lastName}`,
          age: parseInt(userData.age),
          country: userData.country,
          bio: userData.bio,
          profilePic: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=400',
          bookmarkers: 0,
          views: 0,
          totalEarnings: 0,
          approvalStatus: 'pending',
          genderVerified: true,
          auctionItems: []
        };
        dummyData.creators.push(newCreator);
      }

      // Auto-login after successful registration
      setUser(newUser);
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      Alert.alert('Error', 'An error occurred during registration.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    Alert.alert('Logged Out', 'You have been logged out successfully.');
  };

  const updateUser = (updatedData) => {
    setUser(prev => ({
      ...prev,
      ...updatedData
    }));
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      register, 
      logout, 
      updateUser,
      isLoading 
    }}>
      {children}
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

