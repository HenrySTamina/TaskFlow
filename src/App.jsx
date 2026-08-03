import { useEffect, useState } from 'react'

import Navbar from './components/layout/Navbar'
import Sidebar from './components/layout/Sidebar'
import DeleteTaskModal from './components/tasks/DeleteTaskModal'
import TaskModal from './components/tasks/TaskModal'
import ApiStatus from './components/ui/ApiStatus'
import CalendarView from './pages/CalendarView'
import Dashboard from './pages/Dashboard'
import StatisticsView from './pages/StatisticsView'
import {
  createTask,
  deleteTask,
  updateTask,
} from './services/taskApi'
import { loadInitialTasks } from './services/taskMigration'

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [taskToDelete, setTaskToDelete] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [activeView, setActiveView] = useState('summary')
  const [tasks, setTasks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [apiError, setApiError] = useState('')

  useEffect(() => {
    let isActive = true

    async function synchronizeTasks() {
      try {
        const initialTasks = await loadInitialTasks()

        if (isActive) {
          setTasks(initialTasks)
          setApiError('')
        }
      } catch (error) {
        if (isActive) {
          setApiError(error.message)
        }
      } finally {
        if (isActive) {
          setIsLoading(false)
        }
      }
    }

    synchronizeTasks()

    return () => {
      isActive = false
    }
  }, [])

  async function retryLoadTasks() {
    setIsLoading(true)
    setApiError('')

    try {
      const refreshedTasks = await loadInitialTasks()
      setTasks(refreshedTasks)
    } catch (error) {
      setApiError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  function openSidebar() {
    setIsSidebarOpen(true)
  }

  function closeSidebar() {
    setIsSidebarOpen(false)
  }

  function openTaskModal() {
    setEditingTask(null)
    setIsTaskModalOpen(true)
  }

  function closeTaskModal() {
    setIsTaskModalOpen(false)
    setEditingTask(null)
  }

  function openEditTask(task) {
    setEditingTask(task)
    setIsTaskModalOpen(true)
  }

  async function saveTask(taskData) {
    setApiError('')

    try {
      if (editingTask) {
        const updatedTask = await updateTask(editingTask.id, taskData)

        setTasks((currentTasks) => currentTasks.map((task) => (
          task.id === editingTask.id
            ? {
                ...updatedTask,
                project: 'TaskFlow',
              }
            : task
        )))
      } else {
        const createdTask = await createTask(taskData)

        setTasks((currentTasks) => [
          {
            ...createdTask,
            project: 'TaskFlow',
          },
          ...currentTasks,
        ])
      }

      closeTaskModal()
    } catch (error) {
      setApiError(error.message)
    }
  }

  async function toggleTaskStatus(taskId) {
    const selectedTask = tasks.find((task) => task.id === taskId)

    if (!selectedTask) {
      return
    }

    const newStatus = selectedTask.status === 'Completada'
      ? 'Pendiente'
      : 'Completada'

    setApiError('')

    try {
      const updatedTask = await updateTask(taskId, {
        status: newStatus,
      })

      setTasks((currentTasks) => currentTasks.map((task) => (
        task.id === taskId
          ? {
              ...updatedTask,
              project: 'TaskFlow',
            }
          : task
      )))
    } catch (error) {
      setApiError(error.message)
    }
  }

  function requestDeleteTask(task) {
    setTaskToDelete(task)
  }

  function cancelDeleteTask() {
    setTaskToDelete(null)
  }

  async function confirmDeleteTask() {
    if (!taskToDelete) {
      return
    }

    setApiError('')

    try {
      await deleteTask(taskToDelete.id)

      setTasks((currentTasks) => currentTasks.filter(
        (task) => task.id !== taskToDelete.id,
      ))

      setTaskToDelete(null)
    } catch (error) {
      setApiError(error.message)
    }
  }
    
  async function confirmDeleteTask() {
    // Aquí permanece el código que ya tienes para eliminar tareas.
  }

  function renderActiveView() {
    switch (activeView) {
      case 'calendar':
        return (
          <CalendarView
            tasks={tasks}
            searchTerm={searchTerm}
            onCreateTask={openTaskModal}
            onEditTask={openEditTask}
            onToggleTask={toggleTaskStatus}
          />
        )

      case 'statistics':
        return (
          <StatisticsView
            tasks={tasks}
            onCreateTask={openTaskModal}
          />
        )

      default:
        return (
          <Dashboard
            viewMode={activeView}
            tasks={tasks}
            searchTerm={searchTerm}
            onCreateTask={openTaskModal}
            onEditTask={openEditTask}
            onDeleteTask={requestDeleteTask}
            onToggleTask={toggleTaskStatus}
            onSearchChange={setSearchTerm}
          />
        )
    }
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <Sidebar
  isOpen={isSidebarOpen}
  activeView={activeView}
  onClose={closeSidebar}
  onNavigate={setActiveView}
      />

      <div className="lg:pl-72">
        <Navbar
          searchTerm={searchTerm}
          onOpenMenu={openSidebar}
          onSearchChange={setSearchTerm}
        />

        <ApiStatus
          isLoading={isLoading}
          errorMessage={apiError}
          onRetry={retryLoadTasks}
        />

        {renderActiveView()}
      </div>

      {isTaskModalOpen && (
        <TaskModal
          task={editingTask}
          onClose={closeTaskModal}
          onSubmit={saveTask}
        />
      )}

      {taskToDelete && (
        <DeleteTaskModal
          task={taskToDelete}
          onClose={cancelDeleteTask}
          onConfirm={confirmDeleteTask}
        />
      )}
    </div>
  )
}

export default App