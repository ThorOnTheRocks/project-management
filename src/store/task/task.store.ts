import { devtools } from 'zustand/middleware';
import { create, StateCreator } from 'zustand';
import type { Task, TaskStatus } from './../../interfaces/task.interface';


interface TaskState {
  draggingTaskId?: string;
  tasks: Record<string, Task>;

  getTaskByStatus: (status: TaskStatus) => Task[];
  setDraggingTaskId: (taskId: string) => void;
  removeDraggingTaskId: () => void;
}

const storeApi: StateCreator<TaskState> = (set, get) => ({

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
  }
})

export const useTaskStore = create<TaskState>()(
  devtools(storeApi)
);