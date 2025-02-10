import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useGlobalTasks } from '../context/TaskContext'; // Import task context

const CustomDrawer = (props) => {
  const { tasks } = useGlobalTasks(); // Fetch tasks from context

  // Calculate completed and pending tasks dynamically
  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const pendingTasks = totalTasks - completedTasks;

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerHeader}>
        <Image
          source={require('../assets/avatar.png')} // Default avatar image
          style={styles.userImage}
        />
        <Text style={styles.userName}>John Doe</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statsLegend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#4CAF50' }]} />
            <Text>Completed ({completedTasks})</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#E0E0E0' }]} />
            <Text>Pending ({pendingTasks})</Text>
          </View>
        </View>
      </View>

      {/* Drawer Navigation Items */}
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerHeader: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f4f4f4',
    alignItems: 'center',
  },
  userImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statsContainer: {
    padding: 20,
    alignItems: 'center',
  },
  statsLegend: {
    marginTop: 15,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  legendColor: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 8,
  },
});

export default CustomDrawer;
