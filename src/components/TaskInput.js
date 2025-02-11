import React, { useState } from 'react';
import { 
  View, 
  TextInput, 
  TouchableOpacity, 
  Image, 
  StyleSheet, 
  Text 
} from 'react-native';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import { useApp } from '../context/AppContext';

const TaskInput = () => {
  const [taskName, setTaskName] = useState('');
  const [dueDate, setDueDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  // Use booleans for reminder and repeat state
  const [hasReminder, setHasReminder] = useState(false);
  const [hasRepeat, setHasRepeat] = useState(false);
  const { addTask, isDarkMode } = useApp();

  const handleAddTask = () => {
    if (taskName.trim()) {
      addTask({
        name: taskName,
        completed: false,
        important: false,
        dueDate: dueDate ? dueDate.format('YYYY-MM-DD') : null,
        hasReminder, // now set as boolean
        hasRepeat,   // now set as boolean
        createdAt: new Date().toISOString(),
      });
      // Reset the fields after adding the task
      setTaskName('');
      setDueDate(null);
      setHasReminder(false);
      setHasRepeat(false);
    }
  };

  return (
    <View style={[
      styles.wrapper, 
      { backgroundColor: isDarkMode ? '#004d00' : '#f8f9fa', borderColor: isDarkMode ? '#fff' : '#000' }
    ]}>
      <View style={[
        styles.container, 
        { backgroundColor: isDarkMode ? '#004d00' : '#ccffcc', borderColor: isDarkMode ? '#fff' : '#000', borderWidth: 1 }
      ]}>
        <TextInput
          style={[
            styles.input, 
            { color: isDarkMode ? '#fff' : '#000', borderBottomColor: isDarkMode ? '#fff' : '#ddd' }
          ]}
          value={taskName}
          onChangeText={setTaskName}
          placeholder="Add a task"
          placeholderTextColor={isDarkMode ? '#bbb' : '#999'}
        />
        <View style={styles.iconContainer}>
          {/* Toggle Reminder */}
          <TouchableOpacity 
            style={styles.icon} 
            onPress={() => setHasReminder(!hasReminder)}
          >
            <Image 
              source={require('../assets/bell.png')} 
              style={[
                styles.iconImage, 
                { tintColor: hasReminder ? '#007AFF' : (isDarkMode ? '#fff' : '#888') }
              ]} 
            />
          </TouchableOpacity>
          
          {/* Toggle Repeat */}
          <TouchableOpacity 
            style={styles.icon} 
            onPress={() => setHasRepeat(!hasRepeat)}
          >
            <Image 
              source={require('../assets/repeat.png')} 
              style={[
                styles.iconImage, 
                { tintColor: hasRepeat ? '#007AFF' : (isDarkMode ? '#fff' : '#888') }
              ]} 
            />
          </TouchableOpacity>
          
          {/* Open Due Date Picker */}
          <TouchableOpacity 
            style={styles.icon} 
            onPress={() => setShowDatePicker(true)}
          >
            <Image 
              source={require('../assets/calendar.png')} 
              style={[
                styles.iconImage, 
                { tintColor: isDarkMode ? '#fff' : '#888' }
              ]} 
            />
          </TouchableOpacity>
        </View>

        {/* Add Task Button */}
        <TouchableOpacity 
          style={[
            styles.addButton, 
            { backgroundColor: isDarkMode ? '#004d00' : '#ccffcc', borderColor: isDarkMode ? '#fff' : '#000', borderWidth: 1 }
          ]} 
          onPress={handleAddTask}
        >
          <Text style={[
            styles.addButtonText, 
            { color: isDarkMode ? '#fff' : '#006400' }
          ]}>
            ADD TASK
          </Text>
        </TouchableOpacity>
      </View>
      
      {showDatePicker && (
        <DateTimePicker
          mode="single"
          date={dueDate || dayjs()}
          onChange={(params) => {
            setDueDate(params.date);
            setShowDatePicker(false);
          }}
          minDate={dayjs()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    margin: 10,
    padding: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
  },
  container: {
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
  },
  input: {
    fontSize: 16,
    marginBottom: 10,
    padding: 8,
    borderBottomWidth: 1,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    marginRight: 15,
  },
  iconImage: {
    width: 24,
    height: 24,
  },
  addButton: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 1,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TaskInput;
