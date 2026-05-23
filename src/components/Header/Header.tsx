import { SearchBar } from '../FilterBar/SearchBar';
import styles from './Header.module.css';

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.titleRow}>
        <h1 className={styles.title}>待办事项</h1>
        <span className={styles.subtitle}>TaskFlow</span>
      </div>
      <SearchBar />
    </header>
  );
}
