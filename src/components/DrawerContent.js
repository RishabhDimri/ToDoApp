import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import Svg, { Circle, Path } from 'react-native-svg';
import { useApp } from '../context/AppContext';

const DrawerContent = (props) => {
  // Destructure filterTasks along with other values from context
  const { categories, addCategory, isDarkMode, filterTasks } = useApp();
  const navigation = useNavigation();

  const currentRoute = props.state.routes[props.state.index].name;

  // Get today's tasks using the filterTasks function from context
  const todayTasks = filterTasks('Today');
  const completedTasks = todayTasks.filter(task => task.completed).length;
  const totalTasks = todayTasks.length;
  const pendingTasks = totalTasks - completedTasks;
  
  // Function to generate SVG arc path
  const generateArcPath = (percentage) => {
    // If no tasks, return empty path
    if (totalTasks === 0) return '';
    
    const radius = 45;
    const centerX = 50;
    const centerY = 50;
    
    // Calculate end point of arc
    const angle = (percentage * 2 * Math.PI) - (Math.PI / 2);
    const endX = centerX + radius * Math.cos(angle);
    const endY = centerY + radius * Math.sin(angle);
    
    // For 100%, we need a full circle
    const largeArcFlag = percentage > 0.5 ? 1 : 0;
    
    return `M50 5 A${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`;
  };

  const drawerItems = [
    { name: 'All Tasks', icon: require('../assets/alltasks.png'), route: 'Home', params: { category: 'All Tasks' } },
    { name: 'Today', icon: require('../assets/today.png'), route: 'Home', params: { category: 'Today' } },
    { name: 'Important', icon: require('../assets/important.png'), route: 'Home', params: { category: 'Important' } },
    { name: 'Planned', icon: require('../assets/planned.png'), route: 'Home', params: { category: 'Planned' } },
    { name: 'Assigned to me', icon: require('../assets/assigned.png'), route: 'Home', params: { category: 'Assigned to me' } }
  ];

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={[
        styles.container,
        { backgroundColor: isDarkMode ? '#000' : '#F0F4F0' }
      ]}
    >
      <View style={[styles.profileSection, { backgroundColor: isDarkMode ? '#111' : '#E6F2E6' }]}>
        <Image source={require('../assets/avatar.png')} style={styles.profileImage} />
        <Text style={[styles.profileName, { color: isDarkMode ? '#fff' : '#333' }]}>Hey, ABCD</Text>
      </View>

      <View style={[styles.drawerItems, { backgroundColor: isDarkMode ? '#111' : '#fff' }]}>
        {drawerItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.drawerItem,
              currentRoute === item.route && { backgroundColor: isDarkMode ? '#222' : '#fff' }
            ]}
            onPress={() => navigation.navigate(item.route, item.params)}
          >
            <Image
              source={item.icon}
              style={[styles.drawerIcon, { tintColor: isDarkMode ? '#fff' : '#000' }]}
            />
            <Text
              style={[
                styles.drawerLabel,
                { color: isDarkMode ? '#fff' : '#666' },
                currentRoute === item.route && {  fontFamily:"Outfit-Bold",color: isDarkMode ? '#4CAF50' : 'black' }
              ]}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.addListButton, { backgroundColor: isDarkMode ? '#222' : 'white' }]}
        onPress={() => addCategory('New Category')}
      >
        <Text style={[styles.addListText, { color: isDarkMode ? '#fff' : 'black' }]}>+ Add list</Text>
      </TouchableOpacity>

      <View style={[styles.todayTasksSection, { backgroundColor: isDarkMode ? '#111' : 'white' }]}>
        <View style={styles.todayTasksHeader}>
          <Text style={[styles.todayTasksText, { fontFamily:"Outfit-Regular", color: isDarkMode ? '#fff' : '#666' }]}>
            Today Tasks: 
          </Text>
          <Text style={[styles.todayTasksCount, { color: isDarkMode ? '#fff' : '#333' }]}>
            {totalTasks}
          </Text>
        </View>

        <View style={styles.progressContainer}>
        <Svg height="150" width="150" viewBox="0 0 100 100">
          {totalTasks === 0 ? (
            // If no tasks, show empty circle
            <Circle 
              cx="50" 
              cy="50" 
              r="45" 
              stroke="#e6e6e6" 
              strokeWidth="10" 
              fill="none" 
            />
          ) : (
            <>
              {/* Background circle */}
              <Circle 
                cx="50" 
                cy="50" 
                r="45" 
                stroke={completedTasks === totalTasks ? "#4CAF50" : "#1B5E20"} // Light green if all tasks are done
                strokeWidth="10" 
                fill="none" 
              />
              {/* Completion arc */}
              {completedTasks > 0 && (
                <Path
                  d={generateArcPath(completedTasks / totalTasks)}
                  fill="none"
                  stroke="#4CAF50" // Always light green for completed portion
                  strokeWidth="10"
                />
              )}
            </>
          )}
        </Svg>

          <View style={styles.legendContainer}>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: '#4CAF50' }]} /> {/* Dark green for pending */}
              <Text style={[styles.legendText, { color: isDarkMode ? '#fff' : '#666' }]}>Done</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: '#1B5E20' }]} /> {/* Light green for completed */}
              <Text style={[styles.legendText, { color: isDarkMode ? '#fff' : '#666' }]}>Pending</Text>
            </View>
          </View>
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 20,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 18,
    fontFamily: 'Outfit-Bold',
  },
  drawerItems: {
    marginBottom: 10,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  drawerIcon: {
      width: 26,  // Increased size from 24 to 28
      height: 26, // Increased size from 24 to 28
      marginRight: 12, // Slightly increased margin for better spacing
      opacity: 1,  // Set to full opacity for stronger visibility
      tintColor: 'black',  // Ensures high contrast (overrides conditional tint)
      shadowColor: '#000',  // Adds depth
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 3,
      elevation: 4, 
  },
  drawerLabel: {
    fontFamily: 'Outfit-Regular',
    fontSize: 16,
  },
  addListButton: {
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 10,
  },
  addListText: {
    fontSize: 16,
    fontFamily: 'Outfit-Bold',
  },
  todayTasksSection: {
    paddingVertical: 15,
  },
  todayTasksHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  todayTasksText: {
    fontSize: 16,
  },
  todayTasksCount: {
    fontSize: 18,
    fontFamily: 'Outfit-Bold',
  },
  progressContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 5,
  },
  legendText: {
    fontFamily: 'Outfit-Regular',
    fontSize: 12,
  },
});

export default DrawerContent;
