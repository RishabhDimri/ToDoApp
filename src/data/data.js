// Initial tasks data
export const initialTasks = [
    {
      id: '1',
      name: 'Complete React Native Project',
      completed: false,
      important: true,
      dueDate: '2025-02-10',
      notes: '',
      steps: [],
      reminder: null,
      assignedTo: 'John Doe'
    },
    {
      id: '2',
      name: 'Team Meeting',
      completed: false,
      important: false,
      dueDate: '2025-02-08',
      notes: 'Discuss project progress',
      steps: [],
      reminder: '2025-02-08T10:00:00',
      assignedTo: 'John Doe'
    }
  ];
  
  // Filter functions for different task views
  export const filterTasks = {
    all: (tasks) => tasks,
    
    today: (tasks) => {
      const today = new Date().toISOString().split('T')[0];
      return tasks.filter(task => task.dueDate === today);
    },
    
    important: (tasks) => tasks.filter(task => task.important),
    
    planned: (tasks) => tasks.filter(task => task.dueDate !== null),
    
    assigned: (tasks) => tasks.filter(task => task.assignedTo !== null)
  };
  
  // Task management functions
  export const taskManager = {
    toggleComplete: (tasks, taskId) => {
      return tasks.map(task => 
        task.id === taskId ? { ...task, completed: !task.completed } : task
      );
    },
    
    toggleImportant: (tasks, taskId) => {
      return tasks.map(task =>
        task.id === taskId ? { ...task, important: !task.important } : task
      );
    },
    
    addTask: (tasks, newTask) => {
      return [...tasks, { 
        ...newTask, 
        id: Date.now().toString(),
        completed: false,
        steps: [],
      }];
    },
    
    updateTask: (tasks, taskId, updates) => {
      return tasks.map(task =>
        task.id === taskId ? { ...task, ...updates } : task
      );
    },
    
    deleteTask: (tasks, taskId) => {
      return tasks.filter(task => task.id !== taskId);
    }
  };