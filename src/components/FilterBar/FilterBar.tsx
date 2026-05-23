import { useTaskContext } from '../../context/TaskContext';
import { TaskStatus, Priority, SortDirection } from '../../types';
import { PRIORITY_LABELS, SORT_OPTIONS } from '../../constants';
import styles from './FilterBar.module.css';

const STATUS_OPTIONS: { value: TaskStatus; label: string }[] = [
  { value: 'all', label: '全部' },
  { value: 'active', label: '进行中' },
  { value: 'completed', label: '已完成' },
];

export function FilterBar() {
  const { filter, setFilter } = useTaskContext();

  return (
    <div className={styles.bar}>
      <div className={styles.tabs}>
        {STATUS_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            className={`${styles.tab} ${filter.status === opt.value ? styles.tabActive : ''}`}
            onClick={() => setFilter((prev) => ({ ...prev, status: opt.value }))}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <div className={styles.controls}>
        <select
          className={styles.select}
          value={filter.priority}
          onChange={(e) =>
            setFilter((prev) => ({ ...prev, priority: e.target.value as Priority | 'all' }))
          }
        >
          <option value="all">全部优先级</option>
          {(['high', 'medium', 'low'] as Priority[]).map((p) => (
            <option key={p} value={p}>
              {PRIORITY_LABELS[p]}优先级
            </option>
          ))}
        </select>

        <select
          className={styles.select}
          value={filter.sortBy}
          onChange={(e) =>
            setFilter((prev) => ({ ...prev, sortBy: e.target.value as typeof filter.sortBy }))
          }
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <button
          className={styles.sortDirBtn}
          onClick={() =>
            setFilter((prev) => ({
              ...prev,
              sortDirection: (prev.sortDirection === 'asc' ? 'desc' : 'asc') as SortDirection,
            }))
          }
          title={filter.sortDirection === 'asc' ? '升序' : '降序'}
        >
          {filter.sortDirection === 'asc' ? '↑' : '↓'}
        </button>
      </div>
    </div>
  );
}
