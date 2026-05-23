import { Priority } from '../types';

export function priorityWeight(p: Priority): number {
  return { high: 0, medium: 1, low: 2 }[p];
}

export function getPriorityColor(priority: Priority): string {
  return {
    high: 'var(--priority-high)',
    medium: 'var(--priority-medium)',
    low: 'var(--priority-low)',
  }[priority];
}
