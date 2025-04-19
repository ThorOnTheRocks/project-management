import { persist } from 'zustand/middleware';
import { devtools } from 'zustand/middleware';
import { create, StateCreator } from 'zustand';
import type { Task, TaskStatus } from './../../interfaces/task.interface';
import { v4 as uuidv4 } from 'uuid';
import { immer } from 'zustand/middleware/immer';

interface TaskState {
  draggingTaskId?: string;
  tasks: Record<string, Task>;

  getTaskByStatus: (status: TaskStatus) => Task[];
  setDraggingTaskId: (taskId: string) => void;
  removeDraggingTaskId: () => void;
  changeTaskStatus: (taskId: string, status: TaskStatus) => void;

  onTaskDrop: (status: TaskStatus) => void;
  addTask: (name: string, status: TaskStatus) => void;
}

const storeApi: StateCreator<TaskState, [["zustand/devtools", never], ["zustand/immer", never]]> = (set, get) => ({

  draggingTaskId: undefined,

  tasks: {
    'ABC-1': { id: 'ABC-1', name: 'Task 1', status: 'open' },
    'ABC-2': { id: 'ABC-2', name: 'Task 2', status: 'in-progress' },
    'ABC-3': { id: 'ABC-3', name: 'Task 3', status: 'done' },
    'ABC-4': { id: 'ABC-4', name: 'Task 4', status: 'open' },
  },

  getTaskByStatus: (status: TaskStatus) => {
    const tasks = get().tasks;
    return Object.values( tasks ).filter( task => task.status === status );
  },

  setDraggingTaskId: (taskId: string) => {
    set({ draggingTaskId: taskId })
  },

  removeDraggingTaskId: () => {
    set({draggingTaskId: undefined});
  },

  changeTaskStatus: (taskId: string, status: TaskStatus) => {
    const task = {...get().tasks[taskId]}
    task.status = status;

    set((state) => {
      state.tasks[taskId] = { ...task } 
    })
  },

  onTaskDrop: (status: TaskStatus) => {
    const taskId = get().draggingTaskId;
    if(!taskId) return 

    get().changeTaskStatus(taskId, status);
    get().removeDraggingTaskId();
  },

  addTask: (name: string, status: TaskStatus) => {
    const newTask = {id: uuidv4(), name, status};

    set((state: TaskState) => {
      state.tasks[newTask.id] = newTask
    })
  }
})

export const useTaskStore = create<TaskState>()(
  persist(
    devtools(
      immer(storeApi)
    ), { name: 'task-storage' }

  )
);