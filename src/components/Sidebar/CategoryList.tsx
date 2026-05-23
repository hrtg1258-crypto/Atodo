import { useTaskContext } from '../../context/TaskContext';
import { CategoryItem } from './CategoryItem';

export function CategoryList() {
  const { state, filter, setFilter } = useTaskContext();

  return (
    <>
      {state.categories.map((cat) => (
        <CategoryItem
          key={cat.id}
          category={cat}
          isActive={filter.categoryId === cat.id}
          taskCount={state.tasks.filter((t) => t.categoryId === cat.id).length}
          onClick={() =>
            setFilter((prev) => ({
              ...prev,
              categoryId: prev.categoryId === cat.id ? '' : cat.id,
            }))
          }
        />
      ))}
    </>
  );
}
