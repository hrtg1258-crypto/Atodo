import { useTaskContext } from '../../context/TaskContext';
import { useTaskStats } from '../../hooks/useTaskStats';
import styles from './TaskStats.module.css';

export function TaskStats() {
  const { state } = useTaskContext();
  const stats = useTaskStats(state.tasks);

  if (stats.total === 0) return null;

  return (
    <div className={styles.stats}>
      <span>共 <strong>{stats.total}</strong> 项</span>
      <span className={styles.sep}>|</span>
      <span><strong>{stats.active}</strong> 进行中</span>
      <span className={styles.sep}>|</span>
      <span><strong>{stats.completed}</strong> 已完成</span>
      {stats.overdue > 0 && (
        <>
          <span className={styles.sep}>|</span>
          <span className={styles.overdue}><strong>{stats.overdue}</strong> 已过期</span>
        </>
      )}
    </div>
  );
}
