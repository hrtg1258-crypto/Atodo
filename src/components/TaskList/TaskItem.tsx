import { useState } from 'react';
import { Task } from '../../types';
import { useTaskContext } from '../../context/TaskContext';
import { isOverdue } from '../../utils/date';
import { PriorityBadge } from '../common/PriorityBadge';
import { DueDateBadge } from '../common/DueDateBadge';
import { ConfirmDialog } from '../common/ConfirmDialog';
import { TaskEditForm } from './TaskEditForm';
import styles from './TaskItem.module.css';

interface TaskItemProps {
  task: Task;
}

export function TaskItem({ task }: TaskItemProps) {
  const { state, dispatch } = useTaskContext();
  const [editing, setEditing] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const category = state.categories.find((c) => c.id === task.categoryId);
  const overdue = !task.completed && task.dueDate && isOverdue(task.dueDate);

  if (editing) {
    return (
      <div className={`${styles.card} ${overdue ? styles.overdue : ''}`}>
        <TaskEditForm task={task} onCancel={() => setEditing(false)} />
      </div>
    );
  }

  return (
    <>
      <div className={`${styles.card} ${overdue ? styles.overdue : ''} ${task.completed ? styles.completedCard : ''}`}>
        <button
          className={`${styles.checkbox} ${task.completed ? styles.checked : ''}`}
          onClick={() => dispatch({ type: 'TOGGLE_TASK', payload: { id: task.id } })}
        >
          {task.completed && (
            <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
              <path d="M1 5L4.5 8.5L11 1.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </button>

        <div className={styles.content}>
          <div className={styles.titleRow}>
            <span className={`${styles.title} ${task.completed ? styles.titleDone : ''}`}>
              {task.title}
            </span>
          </div>

          {task.description && (
            <p className={styles.description}>{task.description}</p>
          )}

          <div className={styles.meta}>
            <PriorityBadge priority={task.priority} />
            <DueDateBadge dueDate={task.dueDate} completed={task.completed} />
            {category && (
              <span className={styles.category}>
                <span className={styles.catDot} style={{ background: category.color }} />
                {category.name}
              </span>
            )}
          </div>
        </div>

        <div className={styles.actions}>
          <button
            className={styles.actionBtn}
            title="编辑"
            onClick={() => setEditing(true)}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>
          <button
            className={styles.actionBtn}
            title="删除"
            onClick={() => setShowDelete(true)}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
          </button>
        </div>
      </div>

      {showDelete && (
        <ConfirmDialog
          title="删除任务"
          message={`确定要删除"${task.title}"吗？此操作不可撤销。`}
          onConfirm={() => {
            dispatch({ type: 'DELETE_TASK', payload: { id: task.id } });
            setShowDelete(false);
          }}
          onCancel={() => setShowDelete(false)}
        />
      )}
    </>
  );
}
