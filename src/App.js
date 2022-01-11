import React, { useEffect } from 'react';
import './App.css';
import MainNavigator from './navigation/MainNavigator';
import { AuthContext } from 'Context';
import { useAuth } from 'Hooks';
import { Toast } from '@laazyry/sobrus-design-system';

function App() {
  const { user, loading, ifAuth } = useAuth();
  useEffect(() => {
    ifAuth();
  }, [ifAuth]);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      <Toast/>
      <MainNavigator />
    </AuthContext.Provider>
  );
}

export default App;
