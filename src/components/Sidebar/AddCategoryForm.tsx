import { useState } from 'react';
import { useTaskContext } from '../../context/TaskContext';
import { CATEGORY_COLORS } from '../../constants';
import styles from './AddCategoryForm.module.css';

export function AddCategoryForm() {
  const { state, dispatch } = useTaskContext();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [color, setColor] = useState(CATEGORY_COLORS[0]);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      setError('请输入分类名称');
      return;
    }
    if (state.categories.some((c) => c.name.toLowerCase() === trimmed.toLowerCase())) {
      setError('分类名已存在');
      return;
    }
    dispatch({ type: 'ADD_CATEGORY', payload: { name: trimmed, color } });
    setName('');
    setColor(CATEGORY_COLORS[0]);
    setError('');
    setOpen(false);
  };

  if (!open) {
    return (
      <button className={styles.addBtn} onClick={() => setOpen(true)}>
        + 新建分类
      </button>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        type="text"
        placeholder="分类名称"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          if (error) setError('');
        }}
        autoFocus
      />
      <div className={styles.colors}>
        {CATEGORY_COLORS.map((c) => (
          <button
            key={c}
            type="button"
            className={`${styles.colorBtn} ${c === color ? styles.colorActive : ''}`}
            style={{ background: c }}
            onClick={() => setColor(c)}
          />
        ))}
      </div>
      {error && <span className={styles.error}>{error}</span>}
      <div className={styles.actions}>
        <button type="button" className={styles.cancelBtn} onClick={() => setOpen(false)}>
          取消
        </button>
        <button type="submit" className={styles.submitBtn}>
          添加
        </button>
      </div>
    </form>
  );
}
