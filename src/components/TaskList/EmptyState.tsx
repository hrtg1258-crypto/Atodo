import { useTaskContext } from '../../context/TaskContext';
import { hasActiveFilters } from '../../hooks/useFilteredTasks';
import { Button } from '../common/Button';
import styles from './EmptyState.module.css';

export function EmptyState() {
  const { filter, setFilter } = useTaskContext();
  const filtered = hasActiveFilters(filter);

  const clearFilters = () => {
    setFilter({
      status: 'all',
      priority: 'all',
      categoryId: '',
      sortBy: 'createdAt',
      sortDirection: 'desc',
      searchQuery: '',
    });
  };

  return (
    <div className={styles.empty}>
      <div className={styles.icon}>{filtered ? '🔍' : '📋'}</div>
      <h3 className={styles.title}>
        {filtered ? '没有匹配的任务' : '还没有任务'}
      </h3>
      <p className={styles.desc}>
        {filtered
          ? '尝试调整筛选条件或搜索关键词'
          : '在上方添加你的第一个任务吧'}
      </p>
      {filtered && (
        <Button variant="secondary" size="sm" onClick={clearFilters}>
          清除筛选
        </Button>
      )}
    </div>
  );
}
