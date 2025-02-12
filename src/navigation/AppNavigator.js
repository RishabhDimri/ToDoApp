// AppNavigator.js
import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet, TextInput } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '../context/AppContext';
import HomeScreen from '../screens/HomeScreen';
import DrawerContent from '../components/DrawerContent';

const Drawer = createDrawerNavigator();

const NavigationHeader = ({ canGoBack }) => {
  const navigation = useNavigation();
  const { 
    isDarkMode, 
    toggleDarkMode, 
    isGridView, 
    setIsGridView, 
    searchVisible, 
    setSearchVisible,
    searchQuery,
    setSearchQuery 
  } = useApp();

  return (
    <View style={[styles.headerContainer, { backgroundColor: isDarkMode ? '#000' : '#E6F2E6' }]}>
      <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={styles.hamburgerButton}>
        <Image 
          source={require('../assets/hamburger.png')} 
          style={[styles.headerIcon, { tintColor: isDarkMode ? '#fff' : '#000' }]} 
        />
      </TouchableOpacity>

      {searchVisible ? (
        <TextInput
          style={[styles.searchInput, { color: isDarkMode ? '#fff' : '#000' }]}
          placeholder="Search tasks..."
          placeholderTextColor={isDarkMode ? '#ccc' : '#555'}
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoFocus
        />
      ) : (
        <Image source={require('../assets/logo.png')} style={styles.logo} />
      )}

      <View style={styles.headerButtons}>
        {!searchVisible && (
          <TouchableOpacity onPress={() => setSearchVisible(true)}>
            <Image 
              source={require('../assets/search.png')} 
              style={[styles.headerIcon, { tintColor: isDarkMode ? '#fff' : '#000' }]} 
            />
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => setIsGridView(!isGridView)}>
          <Image 
            source={isGridView ? require('../assets/list.png') : require('../assets/grid.png')}
            style={[styles.headerIcon, { tintColor: isDarkMode ? '#fff' : '#000' }]} 
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleDarkMode}>
          <Image  
            source={isDarkMode ? require('../assets/sunny.png') : require('../assets/darkmode.png')}
            style={[styles.headerIcon, { tintColor: isDarkMode ? '#fff' : '#000' }]} 
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const AppNavigator = () => {
  const { isDarkMode } = useApp();

  return (
    <Drawer.Navigator
      screenOptions={({ navigation }) => ({
        header: () => <NavigationHeader canGoBack={navigation.canGoBack()} />,
        headerStyle: { backgroundColor: isDarkMode ? '#000' : '#fff' },
        headerTintColor: isDarkMode ? '#fff' : '#000',
        drawerStyle: { backgroundColor: isDarkMode ? '#000' : '#fff' },
        drawerLabelStyle: { color: isDarkMode ? '#fff' : '#000' },
      })}
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  hamburgerButton: {
    marginRight: 5,
  },
  logo: {
    width: 100,
    height: 30,
  },
  headerButtons: {
    flexDirection: 'row',
    gap: 10,
    marginLeft: 'auto',
  },
  headerIcon: {
    width: 24,
    height: 24,
  },
  searchInput: {
    fontFamily: 'Outfit-Regular',
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    fontSize: 16,
  },
});

export default AppNavigator;
