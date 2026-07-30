import { useEffect, useState } from 'react'

import Navbar from './components/layout/Navbar'
import Sidebar from './components/layout/Sidebar'
import TaskModal from './components/tasks/TaskModal'
import Dashboard from './pages/Dashboard'

const TASKS_STORAGE_KEY = 'taskflow_tasks'

function getStoredTasks() {
  try {
    const storedTasks = localStorage.getItem(TASKS_STORAGE_KEY)
    const parsedTasks = storedTasks ? JSON.parse(storedTasks) : []

    return Array.isArray(parsedTasks) ? parsedTasks : []
  } catch {
    return []
  }
}

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false)
  const [tasks, setTasks] = useState(getStoredTasks)

  useEffect(() => {
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  function openSidebar() {
    setIsSidebarOpen(true)
  }

  function closeSidebar() {
    setIsSidebarOpen(false)
  }

  function openTaskModal() {
    setIsTaskModalOpen(true)
  }

  function closeTaskModal() {
    setIsTaskModalOpen(false)
  }

  function createTask(taskData) {
    const newTask = {
      ...taskData,
      id: globalThis.crypto?.randomUUID?.() ?? `${Date.now()}`,
      project: 'TaskFlow',
      createdAt: new Date().toISOString(),
    }

    setTasks((currentTasks) => [newTask, ...currentTasks])
    closeTaskModal()
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={closeSidebar}
      />

      <div className="lg:pl-72">
        <Navbar onOpenMenu={openSidebar} />
        <Dashboard
          tasks={tasks}
          onCreateTask={openTaskModal}
        />
      </div>

      {isTaskModalOpen && (
        <TaskModal
          onClose={closeTaskModal}
          onSubmit={createTask}
        />
      )}
    </div>
  )
}

export default App
