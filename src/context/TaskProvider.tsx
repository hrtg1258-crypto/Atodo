import { useReducer, useEffect, useState, useCallback, type ReactNode } from 'react';
import { TaskContext } from './TaskContext';
import { AppState, FilterOptions, TaskAction, ViewMode } from '../types';
import { generateId } from '../utils/id';
import { loadState, saveState, getDefaultState } from '../utils/storage';

const initialFilter: FilterOptions = {
  status: 'all',
  priority: 'all',
  categoryId: '',
  sortBy: 'createdAt',
  sortDirection: 'desc',
  searchQuery: '',
};

function taskReducer(state: AppState, action: TaskAction): AppState {
  switch (action.type) {
    case 'ADD_TASK': {
      const now = new Date().toISOString();
      const task = {
        ...action.payload,
        id: generateId(),
        createdAt: now,
        updatedAt: now,
      };
      return { ...state, tasks: [task, ...state.tasks] };
    }

    case 'UPDATE_TASK': {
      const tasks = state.tasks.map((t) =>
        t.id === action.payload.id
          ? { ...t, ...action.payload.updates, updatedAt: new Date().toISOString() }
          : t
      );
      return { ...state, tasks };
    }

    case 'DELETE_TASK': {
      const tasks = state.tasks.filter((t) => t.id !== action.payload.id);
      return { ...state, tasks };
    }

    case 'TOGGLE_TASK': {
      const tasks = state.tasks.map((t) =>
        t.id === action.payload.id
          ? { ...t, completed: !t.completed, updatedAt: new Date().toISOString() }
          : t
      );
      return { ...state, tasks };
    }

    case 'ADD_CATEGORY': {
      const cat = { ...action.payload, id: generateId() };
      return { ...state, categories: [...state.categories, cat] };
    }

    case 'DELETE_CATEGORY': {
      const categories = state.categories.filter((c) => c.id !== action.payload.id);
      const tasks = state.tasks.map((t) =>
        t.categoryId === action.payload.id ? { ...t, categoryId: '' } : t
      );
      return { ...state, categories, tasks };
    }

    default:
      return state;
  }
}

export function TaskProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(taskReducer, null, () => loadState() || getDefaultState());
  const [filter, setFilter] = useState<FilterOptions>(initialFilter);
  const [viewMode, setViewMode] = useState<ViewMode>('list');

  const handleSetViewMode = useCallback((mode: ViewMode) => setViewMode(mode), []);

  useEffect(() => {
    saveState(state);
  }, [state]);

  return (
    <TaskContext.Provider value={{ state, dispatch, filter, setFilter, viewMode, setViewMode: handleSetViewMode }}>
      {children}
    </TaskContext.Provider>
  );
}
