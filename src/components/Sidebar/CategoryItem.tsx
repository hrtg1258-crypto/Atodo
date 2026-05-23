import { useState } from 'react';
import { Category } from '../../types';
import { useTaskContext } from '../../context/TaskContext';
import { ConfirmDialog } from '../common/ConfirmDialog';
import styles from './CategoryItem.module.css';

interface CategoryItemProps {
  category: Category;
  isActive: boolean;
  taskCount: number;
  onClick: () => void;
}

export function CategoryItem({ category, isActive, taskCount, onClick }: CategoryItemProps) {
  const { dispatch } = useTaskContext();
  const [showDelete, setShowDelete] = useState(false);

  return (
    <>
      <button
        className={`${styles.item} ${isActive ? styles.active : ''}`}
        onClick={onClick}
      >
        <span className={styles.dot} style={{ background: category.color }} />
        <span className={styles.name}>{category.name}</span>
        <span className={styles.count}>{taskCount}</span>
        <span
          className={styles.deleteIcon}
          onClick={(e) => {
            e.stopPropagation();
            setShowDelete(true);
          }}
          title="删除分类"
        >
          &times;
        </span>
      </button>

      {showDelete && (
        <ConfirmDialog
          title="删除分类"
          message={`确定要删除"${category.name}"吗？该分类下的任务将变为未分类。`}
          onConfirm={() => {
            dispatch({ type: 'DELETE_CATEGORY', payload: { id: category.id } });
            setShowDelete(false);
          }}
          onCancel={() => setShowDelete(false)}
        />
      )}
    </>
  );
}
