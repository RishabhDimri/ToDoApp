import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Image } from 'react-native';

import AllTasks from '../screens/AllTasks';
import TodayTasks from '../screens/TodayTasks';
import ImportantTasks from '../screens/ImportantTasks';
import PlannedTasks from '../screens/PlannedTasks';
import AssignedTasks from '../screens/AssignedTasks';
import CustomDrawer from '../components/CustomDrawer';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerStyle: {
          backgroundColor: '#007AFF',
        },
        headerTintColor: '#fff',
        drawerActiveBackgroundColor: '#007AFF',
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#333',
      }}
    >
      <Drawer.Screen
        name="AllTasks"
        component={AllTasks}
        options={{
          title: 'All Tasks',
          drawerIcon: ({ color }) => (
            <Image
              source={require('../assets/task-list.png')} // Update path as necessary
              style={{ width: 22, height: 22, tintColor: color }}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="TodayTasks"
        component={TodayTasks}
        options={{
          title: "Today's Tasks",
          drawerIcon: ({ color }) => (
            <Image
              source={require('../assets/calendar.png')} // Update path as necessary
              style={{ width: 22, height: 22, tintColor: color }}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="ImportantTasks"
        component={ImportantTasks}
        options={{
          title: 'Important Tasks',
          drawerIcon: ({ color }) => (
            <Image
              source={require('../assets/star.png')} // Update path as necessary
              style={{ width: 22, height: 22, tintColor: color }}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="PlannedTasks"
        component={PlannedTasks}
        options={{
          title: 'Planned Tasks',
          drawerIcon: ({ color }) => (
            <Image
              source={require('../assets/map.png')} // Update path as necessary
              style={{ width: 22, height: 22, tintColor: color }}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="AssignedTasks"
        component={AssignedTasks}
        options={{
          title: 'Assigned Tasks',
          drawerIcon: ({ color }) => (
            <Image
              source={require('../assets/assign.png')} // Update path as necessary
              style={{ width: 22, height: 22, tintColor: color }}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
