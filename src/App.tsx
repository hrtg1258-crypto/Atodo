import { TaskProvider } from './context/TaskProvider';
import { Header } from './components/Header/Header';
import { Sidebar } from './components/Sidebar/Sidebar';
import { FilterBar } from './components/FilterBar/FilterBar';
import { TaskStats } from './components/TaskList/TaskStats';
import { AddTaskForm } from './components/TaskList/AddTaskForm';
import { TaskList } from './components/TaskList/TaskList';
import styles from './App.module.css';

function App() {
  return (
    <TaskProvider>
      <div className={styles.appLayout}>
        <Sidebar />
        <main className={styles.mainContent}>
          <Header />
          <FilterBar />
          <TaskStats />
          <AddTaskForm />
          <TaskList />
        </main>
      </div>
    </TaskProvider>
  );
}

export default App;
