import { useMemo } from 'react';
import { Task, TaskStats } from '../types';
import { isOverdue } from '../utils/date';

export function useTaskStats(tasks: Task[]): TaskStats {
  return useMemo(() => {
    const total = tasks.length;
    const active = tasks.filter((t) => !t.completed).length;
    const completed = tasks.filter((t) => t.completed).length;
    const overdue = tasks.filter((t) => !t.completed && isOverdue(t.dueDate)).length;
    return { total, active, completed, overdue };
  }, [tasks]);
}
