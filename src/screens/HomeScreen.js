// HomeScreen.js
import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import TaskInput from '../components/TaskInput';
import TaskItem from '../components/TaskItem';
import { useApp } from '../context/AppContext';

const HomeScreen = ({ route }) => {
  const { category = 'All Tasks' } = route.params || {};
  const { filterTasks, isDarkMode, searchVisible, searchQuery, setSearchQuery, setSearchVisible } = useApp();

  const filteredTasks = filterTasks(category);
  const incompleteTasks = filteredTasks.filter(task => !task.completed);
  const completedTasks = filteredTasks.filter(task => task.completed);
  const isEmpty = incompleteTasks.length === 0 && completedTasks.length === 0;

  const data = [
    ...incompleteTasks,
    ...(completedTasks.length > 0 ? [{ type: 'header', title: 'Completed' }] : []),
    ...completedTasks,
  ];

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#000' : '#fff' }]}>
      <TaskInput />
      
      {/* Show a search indicator when search is active */}
      {searchVisible && (
        <View style={styles.searchIndicator}>
          <Text style={{ color: isDarkMode ? '#fff' : '#000' }}>
            Searching for: "{searchQuery}"
          </Text>
          <TouchableOpacity onPress={() => { setSearchQuery(''); setSearchVisible(false); }}>
            <Text style={{ color: 'blue' }}>Clear</Text>
          </TouchableOpacity>
        </View>
      )}
      
      {isEmpty ? (
        <View style={styles.noTasksContainer}>
          <Text style={[styles.noTasksText, { color: isDarkMode ? '#fff' : '#000' }]}>
            No tasks found
          </Text>
        </View>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item, index) =>
            item.type === 'header' ? `header-${item.title}-${index}` : item.id
          }
          renderItem={({ item, index }) => {
            if (item.type === 'header') {
              return (
                <Text
                  style={[
                    styles.sectionHeader,
                    {
                      backgroundColor: isDarkMode ? '#000' : '#fff',
                      color: isDarkMode ? '#fff' : '#000',
                    },
                  ]}
                >
                  {item.title}
                </Text>
              );
            }
            // Determine if the next item is a header.
            const nextItem = data[index + 1];
            const hideDivider = nextItem && nextItem.type === 'header';
            return (
              <TaskItem
                task={item}
                isDarkMode={isDarkMode}
                isLast={index === data.length - 1}
                hideDivider={hideDivider}
              />
            );
          }}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10,
    marginTop: 10,
  },
  noTasksContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noTasksText: {
    fontSize: 16,
    fontStyle: 'italic',
  },
  searchIndicator: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
});

export default HomeScreen;
