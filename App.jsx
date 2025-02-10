import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { TaskProvider } from './src/context/TaskContext';
import DrawerNavigator from './src/navigation/DrawerNavigator';
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'ViewPropTypes will be removed',
  'ColorPropType will be removed',
]);

const App = () => {
  return (
    <NavigationContainer>
      <TaskProvider>
        <DrawerNavigator />
      </TaskProvider>
    </NavigationContainer>
  );
};

export default App;