import { useEffect, useState } from 'react'

import Navbar from './components/layout/Navbar'
import Sidebar from './components/layout/Sidebar'
import DeleteTaskModal from './components/tasks/DeleteTaskModal'
import TaskModal from './components/tasks/TaskModal'
import Dashboard from './pages/Dashboard'
import { createTask, updateTask } from './services/taskApi'
import {
  getStoredTasks,
  loadInitialTasks,
  TASKS_STORAGE_KEY,
} from './services/taskMigration'

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [taskToDelete, setTaskToDelete] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [tasks, setTasks] = useState(getStoredTasks)

  useEffect(() => {
    let isActive = true

    async function synchronizeTasks() {
      try {
        const initialTasks = await loadInitialTasks()

        if (isActive) {
          setTasks(initialTasks)
        }
      } catch (error) {
        console.error('No se pudieron sincronizar las tareas.', error)
      }
    }

    synchronizeTasks()

    return () => {
      isActive = false
    }
  }, [])

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
      console.error('No se pudo guardar la tarea en la API.', error)
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
      console.error('No se pudo actualizar el estado de la tarea.', error)
    }
  }

  function requestDeleteTask(task) {
    setTaskToDelete(task)
  }

  function cancelDeleteTask() {
    setTaskToDelete(null)
  }

  function confirmDeleteTask() {
    setTasks((currentTasks) => currentTasks.filter(
      (task) => task.id !== taskToDelete.id,
    ))
    setTaskToDelete(null)
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={closeSidebar}
      />

      <div className="lg:pl-72">
        <Navbar
          searchTerm={searchTerm}
          onOpenMenu={openSidebar}
          onSearchChange={setSearchTerm}
        />

        <Dashboard
          tasks={tasks}
          searchTerm={searchTerm}
          onCreateTask={openTaskModal}
          onEditTask={openEditTask}
          onDeleteTask={requestDeleteTask}
          onToggleTask={toggleTaskStatus}
          onSearchChange={setSearchTerm}
        />
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