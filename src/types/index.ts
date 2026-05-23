export type Priority = 'high' | 'medium' | 'low';
export type TaskStatus = 'all' | 'active' | 'completed';
export type SortField = 'dueDate' | 'priority' | 'createdAt' | 'alphabetical';
export type SortDirection = 'asc' | 'desc';

export interface Category {
  id: string;
  name: string;
  color: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: Priority;
  categoryId: string;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface FilterOptions {
  status: TaskStatus;
  priority: Priority | 'all';
  categoryId: string;
  sortBy: SortField;
  sortDirection: SortDirection;
  searchQuery: string;
}

export interface AppState {
  tasks: Task[];
  categories: Category[];
}

export type TaskAction =
  | { type: 'ADD_TASK'; payload: Omit<Task, 'id' | 'createdAt' | 'updatedAt'> }
  | { type: 'UPDATE_TASK'; payload: { id: string; updates: Partial<Omit<Task, 'id' | 'createdAt'>> } }
  | { type: 'DELETE_TASK'; payload: { id: string } }
  | { type: 'TOGGLE_TASK'; payload: { id: string } }
  | { type: 'ADD_CATEGORY'; payload: Omit<Category, 'id'> }
  | { type: 'DELETE_CATEGORY'; payload: { id: string } };

export interface TaskStats {
  total: number;
  active: number;
  completed: number;
  overdue: number;
}
