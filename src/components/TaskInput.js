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
        hasReminder,
        hasRepeat,
        createdAt: new Date().toISOString(),
      });
      setTaskName('');
      setDueDate(null);
      setHasReminder(false);
      setHasRepeat(false);
    }
  };

  return (
    <View style={[styles.wrapper, { backgroundColor: isDarkMode ? '#004d00' : '#f8f9fa' }]}>      
      <View style={[styles.container, { backgroundColor: isDarkMode ? '#004d00' : '#ccffcc' }]}>        
        <TextInput
          style={[styles.input, { color: isDarkMode ? '#fff' : '#000' }]}
          value={taskName}
          onChangeText={setTaskName}
          placeholder="Add a task"
          placeholderTextColor={isDarkMode ? '#bbb' : '#999'}
        />
        <View style={styles.iconContainer}>
          <TouchableOpacity style={styles.icon} onPress={() => setHasReminder(!hasReminder)}>
            <Image source={require('../assets/bell.png')} style={[styles.iconImage, { tintColor: hasReminder ? '#007AFF' : (isDarkMode ? '#fff' : '#888') }]} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon} onPress={() => setHasRepeat(!hasRepeat)}>
            <Image source={require('../assets/repeat.png')} style={[styles.iconImage, { tintColor: hasRepeat ? '#007AFF' : (isDarkMode ? '#fff' : '#888') }]} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon} onPress={() => setShowDatePicker(true)}>
            <Image source={require('../assets/calendar.png')} style={[styles.iconImage, { tintColor: isDarkMode ? '#fff' : '#888' }]} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
          <Text style={styles.addButtonText}>ADD TASK</Text>
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
    marginHorizontal: 20,
    marginVertical: 15,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  container: {
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000',
  },
  input: {
    fontSize: 16,
    fontFamily: 'Outfit-Regular',
    padding: 10,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  icon: {
    padding: 8,
  },
  iconImage: {
    width: 28,
    height: 28,
  },
  addButton: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    backgroundColor: '#008000',
  },
  addButtonText: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'Outfit-Bold',
  },
});

export default TaskInput;
