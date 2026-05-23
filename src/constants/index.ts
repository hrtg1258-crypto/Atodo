import { Category, Priority, SortField } from '../types';

export const DEFAULT_CATEGORIES: Category[] = [
  { id: 'cat-work', name: '工作', color: '#4f46e5' },
  { id: 'cat-personal', name: '个人', color: '#06b6d4' },
  { id: 'cat-shopping', name: '购物', color: '#f59e0b' },
  { id: 'cat-health', name: '健康', color: '#22c55e' },
];

export const PRIORITY_ORDER: Record<Priority, number> = {
  high: 0,
  medium: 1,
  low: 2,
};

export const PRIORITY_LABELS: Record<Priority, string> = {
  high: '高',
  medium: '中',
  low: '低',
};

export const PRIORITY_COLORS: Record<Priority, { bg: string; text: string; border: string }> = {
  high: { bg: '#fef2f2', text: '#ef4444', border: '#ef4444' },
  medium: { bg: '#fffbeb', text: '#f59e0b', border: '#f59e0b' },
  low: { bg: '#eff6ff', text: '#3b82f6', border: '#3b82f6' },
};

export const SORT_OPTIONS: { value: SortField; label: string }[] = [
  { value: 'dueDate', label: '截止日期' },
  { value: 'priority', label: '优先级' },
  { value: 'createdAt', label: '创建时间' },
  { value: 'alphabetical', label: '字母排序' },
];

export const CATEGORY_COLORS = [
  '#4f46e5', '#06b6d4', '#f59e0b', '#22c55e',
  '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6',
];
