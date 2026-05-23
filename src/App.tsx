import { TaskProvider } from './context/TaskProvider';
import { Header } from './components/Header/Header';
import { Sidebar } from './components/Sidebar/Sidebar';
import { FilterBar } from './components/FilterBar/FilterBar';
import { TaskStats } from './components/TaskList/TaskStats';
import { AddTaskForm } from './components/TaskList/AddTaskForm';
import { TaskList } from './components/TaskList/TaskList';
import { GanttChart } from './components/Gantt/GanttChart';
import { useTaskContext } from './context/TaskContext';
import styles from './App.module.css';

function MainContent() {
  const { viewMode } = useTaskContext();

  return (
    <main className={styles.mainContent}>
      <Header />
      <FilterBar />
      {viewMode === 'list' ? (
        <>
          <TaskStats />
          <AddTaskForm />
          <TaskList />
        </>
      ) : (
        <GanttChart />
      )}
    </main>
  );
}

function App() {
  return (
    <TaskProvider>
      <div className={styles.appLayout}>
        <Sidebar />
        <MainContent />
      </div>
    </TaskProvider>
  );
}

export default App;
