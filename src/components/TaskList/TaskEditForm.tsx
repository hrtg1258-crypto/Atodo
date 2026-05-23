import { useState } from 'react';
import { Task, Priority } from '../../types';
import { useTaskContext } from '../../context/TaskContext';
import { PRIORITY_LABELS } from '../../constants';
import { Button } from '../common/Button';
import styles from './TaskEditForm.module.css';

interface TaskEditFormProps {
  task: Task;
  onCancel: () => void;
}

export function TaskEditForm({ task, onCancel }: TaskEditFormProps) {
  const { state, dispatch } = useTaskContext();
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [priority, setPriority] = useState<Priority>(task.priority);
  const [categoryId, setCategoryId] = useState(task.categoryId);
  const [dueDate, setDueDate] = useState(task.dueDate);
  const [startDate, setStartDate] = useState(task.startDate || '');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) {
      setError('请输入任务标题');
      return;
    }
    dispatch({
      type: 'UPDATE_TASK',
      payload: {
        id: task.id,
        updates: {
          title: trimmed,
          description: description.trim(),
          priority,
          categoryId,
          startDate,
          dueDate,
          completed: task.completed,
        },
      },
    });
    onCancel();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <input
          className={styles.input}
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (error) setError('');
          }}
          autoFocus
        />
      </div>
      {error && <span className={styles.error}>{error}</span>}

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
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          className={styles.dateInput}
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>

      <div className={styles.actions}>
        <Button type="button" variant="secondary" size="sm" onClick={onCancel}>
          取消
        </Button>
        <Button type="submit" size="sm">
          保存
        </Button>
      </div>
    </form>
  );
}
