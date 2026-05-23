import { useState, useEffect } from 'react';
import { useTaskContext } from '../../context/TaskContext';
import styles from './SearchBar.module.css';

export function SearchBar() {
  const { filter, setFilter } = useTaskContext();
  const [value, setValue] = useState(filter.searchQuery);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFilter((prev) => ({ ...prev, searchQuery: value }));
    }, 150);
    return () => clearTimeout(timer);
  }, [value, setFilter]);

  return (
    <div className={styles.searchWrap}>
      <svg className={styles.icon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
      <input
        className={styles.input}
        type="text"
        placeholder="搜索任务..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {value && (
        <button className={styles.clear} onClick={() => setValue('')}>
          &times;
        </button>
      )}
    </div>
  );
}
