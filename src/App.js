import React from 'react';
import './App.css';
import MainNavigator from './navigation/MainNavigator';
import { AuthContext } from 'Context';
import { useAuth } from 'Hooks';
import { Toast } from '@laazyry/sobrus-design-system';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader

const App = () => {
  const {
    user: { user, isAuthenticated },
    loading,
    logout,
    login,
    register,
  } = useAuth();

  return (
    <AuthContext.Provider value={{ loading, user, logout, login, register ,isAuthenticated }}>
      <Toast />
      <MainNavigator />
    </AuthContext.Provider>
  );
};

export default App;
