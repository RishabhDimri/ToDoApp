import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppProvider } from './src/context/AppContext';
import AppNavigator from './src/navigation/AppNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'react-native';
import { useApp } from './src/context/AppContext';

const MainApp = () => {
  const { isDarkMode } = useApp();

  return (
    <>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppNavigator />
    </>
  );
};

export default function App() {
  
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppProvider>
        <NavigationContainer>
          <MainApp />
        </NavigationContainer>
      </AppProvider>
    </GestureHandlerRootView>
  );
}