import { AppState } from '../types';
import { DEFAULT_CATEGORIES } from '../constants';

const STORAGE_KEY = 'todo-app-state';

export function getDefaultState(): AppState {
  return {
    tasks: [],
    categories: DEFAULT_CATEGORIES,
  };
}

export function loadState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultState();
    const parsed = JSON.parse(raw);
    if (!parsed.tasks || !Array.isArray(parsed.tasks)) return getDefaultState();
    if (!parsed.categories || !Array.isArray(parsed.categories)) return getDefaultState();
    return parsed as AppState;
  } catch {
    return getDefaultState();
  }
}

export function saveState(state: AppState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // localStorage 满或不可用，静默失败
  }
}
