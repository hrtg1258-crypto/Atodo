import { useTaskContext } from '../../context/TaskContext';
import { useFilteredTasks } from '../../hooks/useFilteredTasks';
import { TaskItem } from './TaskItem';
import { EmptyState } from './EmptyState';
import styles from './TaskList.module.css';

export function TaskList() {
  const { state, filter } = useTaskContext();
  const filteredTasks = useFilteredTasks(state, filter);

  if (filteredTasks.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className={styles.list}>
      {filteredTasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
}
