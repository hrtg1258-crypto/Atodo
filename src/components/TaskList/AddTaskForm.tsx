import { useState } from 'react';
import { useTaskContext } from '../../context/TaskContext';
import { Priority } from '../../types';
import { PRIORITY_LABELS } from '../../constants';
import { Button } from '../common/Button';
import styles from './AddTaskForm.module.css';

export function AddTaskForm() {
  const { state, dispatch } = useTaskContext();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [categoryId, setCategoryId] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) {
      setError('请输入任务标题');
      return;
    }
    dispatch({
      type: 'ADD_TASK',
      payload: {
        title: trimmed,
        description: description.trim(),
        completed: false,
        priority,
        categoryId,
        dueDate,
      },
    });
    setTitle('');
    setDescription('');
    setPriority('medium');
    setCategoryId('');
    setDueDate('');
    setError('');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <input
          className={`${styles.input} ${styles.titleInput}`}
          type="text"
          placeholder="添加新任务..."
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (error) setError('');
          }}
        />
        <Button type="submit" size="sm">
          添加
        </Button>
      </div>
      {error && <span className={styles.error}>{error}</span>}

      <div className={styles.details}>
        <input
          className={styles.input}
          type="text"
          placeholder="描述（可选）"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className={styles.fields}>
          <select
            className={styles.select}
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
          >
            {(Object.keys(PRIORITY_LABELS) as Priority[]).map((p) => (
              <option key={p} value={p}>
                {PRIORITY_LABELS[p]}优先级
              </option>
            ))}
          </select>

          <select
            className={styles.select}
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option value="">未分类</option>
            {state.categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <input
            className={styles.dateInput}
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
      </div>
    </form>
  );
}
