import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Alert,
  Image,
  Animated,
  ScrollView,
} from 'react-native';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import { useApp } from '../context/AppContext';

const TaskModal = ({ task, visible, onClose, isDarkMode }) => {
  const { updateTask, deleteTask } = useApp();
  const [taskName, setTaskName] = useState('');
  const [taskNotes, setTaskNotes] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [isImportant, setIsImportant] = useState(false);
  const [hasReminder, setHasReminder] = useState(false);
  const [hasRepeat, setHasRepeat] = useState(false);
  const [dueDate, setDueDate] = useState(dayjs());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [modalHeight] = useState(new Animated.Value(0));
  const [steps, setSteps] = useState([]);
  const [newStep, setNewStep] = useState('');
  const [showStepInput, setShowStepInput] = useState(false);

  // Define colors based on dark mode
  const containerBg = isDarkMode ? '#000000' : '#FFFFFF';
  const inputBg = isDarkMode ? '#1C1C1E' : '#f5f5f5';
  const textColor = isDarkMode ? '#FFFFFF' : '#000000';
  const borderColor = isDarkMode ? '#444' : '#ccc';
  const placeholderColor = isDarkMode ? '#ccc' : '#999';
  const accentColor = isDarkMode ? '#1e40af' : '#3b82f6';
  const savebuttonColor= isDarkMode ? '#2ECC71' : '#27AE60';
  const dividerColor = isDarkMode ? '#333333' : '#E5E5E5';
  const calendarBg = isDarkMode ? '#1C1C1E' : '#F5F5F5';
  const completedColor = '#34C759';
  const importantColor = '#FFD700';

  // Reset modal state function
  const resetModalState = () => {
    if (task) {
      setTaskName(task.name || '');
      setTaskNotes(task.notes || '');
      setIsCompleted(task.completed || false);
      setIsImportant(task.important || false);
      setHasReminder(task.hasReminder || false);
      setHasRepeat(task.hasRepeat || false);
      setDueDate(task.dueDate ? dayjs(task.dueDate) : dayjs());
      setSteps(task.steps || []);
      setShowDatePicker(false);
      setShowStepInput(false);
      setNewStep('');
    }
  };

  // Handle close without saving
  const handleClose = () => {
    resetModalState();
    onClose();
  };

  useEffect(() => {
    if (task && visible) {
      resetModalState();
    }
  }, [task, visible]);

  useEffect(() => {
    Animated.timing(modalHeight, {
      toValue: showDatePicker ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [showDatePicker]);

  const handleAddStep = () => {
    if (newStep.trim()) {
      const newStepItem = {
        id: Date.now().toString(),
        text: newStep.trim(),
        completed: false,
      };
      setSteps([...steps, newStepItem]);
      setNewStep('');
      setShowStepInput(false);
    }
  };

  const handleStepComplete = (stepId) => {
    setSteps(steps.map(step =>
      step.id === stepId ? { ...step, completed: !step.completed } : step
    ));
  };

  const handleStepDelete = (stepId) => {
    setSteps(steps.filter(step => step.id !== stepId));
  };

  const handleSave = () => {
    if (!taskName.trim()) {
      Alert.alert("Task Name Required", "Please enter a task name.");
      return;
    }

    const updatedTask = {
      ...task,
      name: taskName.trim(),
      notes: taskNotes.trim(),
      completed: isCompleted,
      important: isImportant,
      hasReminder: hasReminder,
      hasRepeat: hasRepeat,
      dueDate: dueDate ? dueDate.format('YYYY-MM-DD') : null,
      steps: steps,
      updatedAt: new Date().toISOString(),
    };

    updateTask(task.id, updatedTask);
    onClose();
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', onPress: () => { deleteTask(task.id); onClose(); }, style: 'destructive' },
      ]
    );
  };

  const formatDate = (date) => {
    return dayjs(date).format('MMM D, YYYY');
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={handleClose}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContainer, { backgroundColor: containerBg }]}>
          {/* Header */}
          <View style={[styles.header, { backgroundColor: containerBg }]}>
            <View style={styles.headerSide}>
              <TouchableOpacity 
                onPress={handleClose}
                style={styles.headerButton}
                activeOpacity={0.7}
              >
                <View style={[
                  styles.buttonWrapper, 
                  { 
                    backgroundColor: isDarkMode ? '#333333' : '#F2F2F2',
                    borderColor: isDarkMode ? '#444444' : '#E5E5E5'
                  }
                ]}>
                  <Text style={[
                    styles.buttonText,
                    styles.cancelButton, 
                    { color: isDarkMode ? '#FF453A' : '#FF3B30' }
                  ]}>Cancel</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.headerSide}>
              <TouchableOpacity 
                onPress={handleSave}
                style={styles.headerButton}
                activeOpacity={0.7}
              >
                <View style={[
                  styles.buttonWrapper,
                  styles.saveButtonWrapper,
                  { backgroundColor: savebuttonColor }
                ]}>
                  <Text style={[
                    styles.buttonText,
                    styles.saveButton,
                    { color: '#FFFFFF' }
                  ]}>Save</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* Scrollable Content */}
          <ScrollView 
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
            bounces={false}
          >
            <View style={styles.scrollContent}>
              {/* Task Name Input */}
              <TextInput
                style={[styles.nameInput, { backgroundColor: inputBg, color: textColor, borderColor }]}
                value={taskName}
                onChangeText={setTaskName}
                placeholder="Task name"
                placeholderTextColor={placeholderColor}
              />

              {/* Actions Row */}
              <View style={styles.actionsRow}>
                <TouchableOpacity 
                  onPress={() => setIsCompleted(!isCompleted)} 
                  style={[
                    styles.actionButton, 
                    { 
                      borderColor: isCompleted ? completedColor : dividerColor,
                      backgroundColor: isCompleted ? `${completedColor}20` : 'transparent'
                    }
                  ]}
                >
                  <Image 
                    source={isCompleted 
                      ? require('../assets/select.png') 
                      : require('../assets/square.png')} 
                    style={[styles.icon, { tintColor: isCompleted ? completedColor : (isDarkMode ? '#FFFFFF' : '#000000') }]} 
                  />
                  <Text style={[styles.iconText, { color: isCompleted ? completedColor : textColor }]}>Completed</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  onPress={() => setIsImportant(!isImportant)} 
                  style={[
                    styles.actionButton, 
                    { 
                      borderColor: isImportant ? importantColor : dividerColor,
                      backgroundColor: isImportant ? `${importantColor}20` : 'transparent'
                    }
                  ]}
                >
                  <Image 
                    source={isImportant 
                      ? require('../assets/starchecked.png') 
                      : require('../assets/star.png')} 
                    style={[styles.icon, { tintColor: isImportant ? importantColor : (isDarkMode ? '#FFFFFF' : '#000000') }]} 
                  />
                  <Text style={[styles.iconText, { color: isImportant ? importantColor : textColor }]}>Important</Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.divider, { backgroundColor: dividerColor }]} />

              {/* Add Step Section */}
              <View style={styles.section}>
                <TouchableOpacity 
                  style={styles.iconButton}
                  onPress={() => setShowStepInput(true)}
                >
                  <Image 
                    source={require('../assets/plus.png')}
                    style={[styles.icon, { tintColor: isDarkMode ? '#FFFFFF' : '#000000' }]}
                  />
                  <Text style={[styles.iconText, { color: textColor }]}>Add Step</Text>
                </TouchableOpacity>

                {/* Steps List */}
              {steps.length > 0 && (
                <View style={styles.stepsList}>
                  {steps.map((step, index) => (
                    <View key={step.id}>
                      {/* Top separator line for first item */}
                      {index === 0 && (
                        <View style={[styles.stepSeparator, { backgroundColor: dividerColor }]} />
                      )}
                      
                      <View style={styles.stepItem}>
                        <TouchableOpacity
                          style={styles.stepCheckbox}
                          onPress={() => handleStepComplete(step.id)}
                        >
                          <Image 
                            source={step.completed 
                              ? require('../assets/select.png')
                              : require('../assets/square.png')}
                            style={[
                              styles.stepIcon, 
                              { tintColor: step.completed ? completedColor : (isDarkMode ? '#FFFFFF' : '#000000') }
                            ]}
                          />
                        </TouchableOpacity>
                        
                        <Text style={[
                          styles.stepText,
                          { color: textColor },
                          step.completed && styles.completedStepText
                        ]}>
                          {step.text}
                        </Text>
                        
                        <TouchableOpacity
                          style={[
                            styles.deleteStepButton,
                            { backgroundColor: isDarkMode ? '#333' : '#F5F5F5' }
                          ]}
                          onPress={() => handleStepDelete(step.id)}
                        >
                          <Image 
                            source={require('../assets/trash.png')}
                            style={[
                              styles.deleteStepIcon, 
                              { tintColor: isDarkMode ? '#FF453A' : '#FF3B30' }
                            ]}
                          />
                        </TouchableOpacity>
                      </View>
                      
                      {/* Bottom separator line */}
                      {index === steps.length && (
                        <View style={[styles.stepSeparator, styles.lastStepSeparator, { backgroundColor: dividerColor }]} />
                      )}
                    </View>
                  ))}
                </View>
              )}

              {/* Step Input */}
              {showStepInput && (
                <View style={[
                  styles.stepInputContainer,
                  { backgroundColor: isDarkMode ? '#1C1C1E' : '#F5F5F5' }
                ]}>
                  <TextInput
                    style={[styles.stepInput, { 
                      backgroundColor: inputBg,
                      color: textColor,
                      borderColor
                    }]}
                    value={newStep}
                    onChangeText={setNewStep}
                    placeholder="Enter step..."
                    placeholderTextColor={placeholderColor}
                    onSubmitEditing={handleAddStep}
                  />
                  <View style={styles.stepInputButtons}>
                    <TouchableOpacity
                      style={[
                        styles.stepButton, 
                        { 
                          borderColor: dividerColor,
                          backgroundColor: isDarkMode ? '#333' : '#F5F5F5'
                        }
                      ]}
                      onPress={() => setShowStepInput(false)}
                    >
                      <Text style={[
                        styles.stepButtonText, 
                        { color: isDarkMode ? '#FF453A' : '#FF3B30' }
                      ]}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.stepButton,
                        {
                          backgroundColor: accentColor,
                          borderColor: accentColor
                        }
                      ]}
                      onPress={handleAddStep}
                    >
                      <Text style={[
                        styles.stepButtonText,
                        { color: '#FFFFFF' }
                      ]}>Add</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              </View>
              <View style={[styles.divider, { backgroundColor: dividerColor }]} />

              {/* Set Reminder Section */}
              <View style={styles.section}>
                <TouchableOpacity 
                  style={styles.iconButton}
                  onPress={() => setHasReminder(!hasReminder)}
                >
                  <Image 
                    source={require('../assets/bell.png')}
                    style={[styles.icon, { tintColor: hasReminder ? accentColor : (isDarkMode ? '#FFFFFF' : '#000000') }]}
                  />
                  <Text style={[styles.iconText, { color: hasReminder ? accentColor : textColor }]}>Set Reminder</Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.divider, { backgroundColor: dividerColor }]} />

              {/* Due Date Section */}
              <View style={styles.section}>
                <TouchableOpacity
                  style={styles.iconButton}
                  onPress={() => setShowDatePicker(!showDatePicker)}
                >
                  <Image
                    source={require('../assets/calendar.png')}
                    style={[styles.icon, { tintColor: isDarkMode ? '#FFFFFF' : '#000000' }]}
                  />
                  <View style={styles.dateContainer}>
                    <Text style={[styles.iconText, { color: textColor }]}>Due Date</Text>
                    {dueDate && (
                      <Text style={[styles.dateText, { color: accentColor }]}>
                        {formatDate(dueDate)}
                      </Text>
                    )}
                  </View>
                </TouchableOpacity>
              </View>

              {/* Calendar Section */}
              {showDatePicker && (
                <View style={[styles.calendarContainer, { backgroundColor: isDarkMode ? '#FFFFFF' : calendarBg }]}>
                  <DateTimePicker
                    mode="single"
                    date={dueDate || dayjs()}
                    onChange={(params) => {
                      if (params.date) {
                        setDueDate(params.date);
                        setShowDatePicker(false);
                      }
                    }}
                    minDate={dayjs()}
                    headerButtonColor={isDarkMode ? '#1e40af' : accentColor}
                    selectedItemColor={isDarkMode ? '#1e40af' : accentColor}
                    markColor={isDarkMode ? '#1e40af' : accentColor}
                    textColor={isDarkMode ? '#000000' : textColor}
                    style={{ backgroundColor: isDarkMode ? '#FFFFFF' : calendarBg }}
                  />
                </View>
              )}
              <View style={[styles.divider, { backgroundColor: dividerColor }]} />

              {/* Repeat Section */}
              <View style={styles.section}>
                <TouchableOpacity 
                    style={styles.iconButton}
                    onPress={() => setHasRepeat(!hasRepeat)}
                  >
                    <Image 
                      source={require('../assets/repeat.png')}
                      style={[styles.icon, { tintColor: hasRepeat ? accentColor : (isDarkMode ? '#FFFFFF' : '#000000') }]}
                    />
                    <Text style={[styles.iconText, { color: hasRepeat ? accentColor : textColor }]}>Repeat</Text>
                  </TouchableOpacity>
                </View>
              <View style={[styles.divider, { backgroundColor: dividerColor }]} />

              {/* Task Notes Input */}
              <TextInput
                style={[styles.notesInput, { backgroundColor: inputBg, color: textColor, borderColor }]}
                value={taskNotes}
                onChangeText={setTaskNotes}
                placeholder="Add notes..."
                placeholderTextColor={placeholderColor}
                multiline
                textAlignVertical="top"
              />

              {/* Delete Task Button */}
              <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
                <Text style={styles.deleteText}>Delete Task</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    height: '85%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 8,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 20,
  },
  nameInput: {
    fontSize: 16,
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    fontFamily: 'Outfit-Regular',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomWidth: 1,
  },
  headerSide: {
    paddingHorizontal: 16,
  },
  headerButton: {
    minWidth: 80,
  },
  lastStepSeparator: {
    marginBottom: -20, 
  },
  buttonWrapper: {
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  saveButtonWrapper: {
    borderWidth: 0,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    fontFamily: 'Outfit-Regular',
  },
  cancelButton: {
    fontWeight: '400',
  },
  saveButton: {
    fontWeight: '600',
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  section: {
    paddingVertical: 16,
  },
  iconButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  iconText: {
    fontSize: 16,
    fontFamily: 'Outfit-Regular',
  },
  dateContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 16,
    marginLeft: 8,
    fontFamily: 'Outfit-Regular',
  },
  calendarContainer: {
    borderRadius: 12,
    padding: 12,
    marginVertical: 8,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  divider: {
    height: 1,
    width: '100%',
  },
  notesInput: {
    fontSize: 14,
    fontFamily: 'Outfit-Regular',
    padding: 12,
    borderRadius: 8,
    height: 120,
    marginTop: 16,
    marginBottom: 20,
    borderWidth: 1,
  },
  deleteButton: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ff3b30',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 8,
  },
  deleteText: {
    color: '#ff3b30',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Outfit-Regular',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    flex: 0.48,
  },
  stepsList: {
    marginTop: 16,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 4,
    position: 'relative',
  },
  stepConnectorContainer: {
    position: 'absolute',
    top: 0,
    left: 12,
    bottom: 0,
    width: 2,
    alignItems: 'center',
  },
  stepConnector: {
    width: 0,
    height: '100%',
    position: 'absolute',
  },
  stepSeparator: {
    height: 2,
    width: '100%',
    opacity: 0.7,
  },
  stepCheckbox: {
    padding: 4,
    marginRight: 4,
    zIndex: 1,
  },
  stepIcon: {
    width: 22,
    height: 22,
  },
  stepText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 8,
    fontFamily: 'Outfit-Regular',
  },
  completedStepText: {
    textDecorationLine: 'line-through',
    opacity: 0.7,
  },
  deleteStepButton: {
    padding: 8,
    borderRadius: 8,
    marginLeft: 8,
  },
  deleteStepIcon: {
    width: 18,
    height: 18,
  },
  stepInputContainer: {
    marginTop: 16,
    padding: 16,
    borderRadius: 12,
  },
  stepInput: {
    fontSize: 16,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    fontFamily: 'Outfit-Regular',
  },
  stepInputButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 12,
    gap: 8,
  },
  stepButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
  stepButtonText: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Outfit-Regular',
  }
});

export default TaskModal;