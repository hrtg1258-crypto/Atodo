import { useMemo } from 'react';
import { AppState, FilterOptions, Task } from '../types';
import { PRIORITY_ORDER } from '../constants';
import { isOverdue } from '../utils/date';

export function useFilteredTasks(state: AppState, filter: FilterOptions): Task[] {
  return useMemo(() => {
    let result = [...state.tasks];

    if (filter.status === 'active') {
      result = result.filter((t) => !t.completed);
    } else if (filter.status === 'completed') {
      result = result.filter((t) => t.completed);
    }

    if (filter.priority !== 'all') {
      result = result.filter((t) => t.priority === filter.priority);
    }

    if (filter.categoryId !== '') {
      result = result.filter((t) => t.categoryId === filter.categoryId);
    }

    if (filter.searchQuery.trim()) {
      const q = filter.searchQuery.toLowerCase();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q)
      );
    }

    const dir = filter.sortDirection === 'asc' ? 1 : -1;
    result.sort((a, b) => {
      switch (filter.sortBy) {
        case 'priority':
          return (PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]) * dir;
        case 'dueDate': {
          if (!a.dueDate && !b.dueDate) return 0;
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return a.dueDate.localeCompare(b.dueDate) * dir;
        }
        case 'createdAt':
          return a.createdAt.localeCompare(b.createdAt) * dir;
        case 'alphabetical':
          return a.title.toLowerCase().localeCompare(b.title.toLowerCase()) * dir;
        default:
          return 0;
      }
    });

    return result;
  }, [state, filter]);
}

export function hasActiveFilters(filter: FilterOptions): boolean {
  return (
    filter.status !== 'all' ||
    filter.priority !== 'all' ||
    filter.categoryId !== '' ||
    filter.searchQuery.trim() !== ''
  );
}
