import React, { useEffect } from 'react';
import './App.css';
import MainNavigator from './navigation/MainNavigator';
import { AuthContext } from 'Context';
import { useAuth } from 'Hooks';
import { Toast } from '@laazyry/sobrus-design-system';
import { StepsProvider } from 'react-step-builder';

const App = () => {
  const {
    user: { user, isAuthenticated },
    loading,
    logout,
    login,
    register,
  } = useAuth();
  return (
    <StepsProvider>
      <AuthContext.Provider value={{ loading, user, logout, login, register, isAuthenticated }}>
        <Toast />
        <MainNavigator />
      </AuthContext.Provider>
    </StepsProvider>
  );
};

export default App;
