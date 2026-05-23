import { isOverdue, isToday, getRelativeDateLabel, formatDate } from '../../utils/date';
import styles from './DueDateBadge.module.css';

interface DueDateBadgeProps {
  dueDate: string;
  completed: boolean;
}

export function DueDateBadge({ dueDate, completed }: DueDateBadgeProps) {
  if (!dueDate) return null;

  const overdue = !completed && isOverdue(dueDate);
  const today = !completed && isToday(dueDate);
  const label = getRelativeDateLabel(dueDate);

  const cls = [styles.badge, overdue ? styles.overdue : today ? styles.today : '']
    .filter(Boolean)
    .join(' ');

  return <span className={cls}>{label}</span>;
}
