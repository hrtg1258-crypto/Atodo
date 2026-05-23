import { createContext, useContext } from 'react';
import { AppState, FilterOptions, TaskAction } from '../types';

interface TaskContextValue {
  state: AppState;
  dispatch: React.Dispatch<TaskAction>;
  filter: FilterOptions;
  setFilter: React.Dispatch<React.SetStateAction<FilterOptions>>;
}

export const TaskContext = createContext<TaskContextValue | null>(null);

export function useTaskContext(): TaskContextValue {
  const ctx = useContext(TaskContext);
  if (!ctx) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return ctx;
}
