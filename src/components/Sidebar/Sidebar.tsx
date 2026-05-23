import { useTaskContext } from '../../context/TaskContext';
import { CategoryList } from './CategoryList';
import { AddCategoryForm } from './AddCategoryForm';
import styles from './Sidebar.module.css';

export function Sidebar() {
  const { filter, setFilter, state } = useTaskContext();

  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
        <button
          className={`${styles.navItem} ${filter.categoryId === '' ? styles.active : ''}`}
          onClick={() => setFilter((prev) => ({ ...prev, categoryId: '' }))}
        >
          <span className={styles.dot} style={{ background: 'var(--color-text-muted)' }} />
          全部任务
          <span className={styles.count}>{state.tasks.length}</span>
        </button>

        <CategoryList />
      </nav>

      <div className={styles.footer}>
        <AddCategoryForm />
      </div>
    </aside>
  );
}
