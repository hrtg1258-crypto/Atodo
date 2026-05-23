import { Priority } from '../../types';
import { PRIORITY_LABELS, PRIORITY_COLORS } from '../../constants';
import styles from './PriorityBadge.module.css';

interface PriorityBadgeProps {
  priority: Priority;
}

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  const colors = PRIORITY_COLORS[priority];
  return (
    <span
      className={styles.badge}
      style={{ backgroundColor: colors.bg, color: colors.text, borderColor: colors.border }}
    >
      {PRIORITY_LABELS[priority]}
    </span>
  );
}
