import { useState } from 'react'
import { X } from 'lucide-react'

function getInitialFormData(task) {
  return {
    title: task?.title ?? '',
    description: task?.description ?? '',
    priority: task?.priority ?? 'Media',
    status: task?.status ?? 'Pendiente',
    dueDate: task?.dueDate ?? '',
  }
}

function TaskModal({ task, onClose, onSubmit }) {
  const [formData, setFormData] = useState(() => getInitialFormData(task))
  const [titleError, setTitleError] = useState('')
  const isEditing = Boolean(task)

  function handleChange(event) {
    const { name, value } = event.target

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }))

    if (name === 'title' && value.trim()) {
      setTitleError('')
    }
  }

  function handleSubmit(event) {
    event.preventDefault()

    const title = formData.title.trim()

    if (!title) {
      setTitleError('Escribe un título para la tarea.')
      return
    }

    onSubmit({
      ...formData,
      title,
      description: formData.description.trim(),
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Cerrar formulario"
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm"
      />

      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="task-modal-title"
        className="relative max-h-[calc(100vh-2rem)] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
      >
        <header className="flex items-start justify-between border-b border-slate-100 p-5 sm:p-6">
          <div>
            <h2
              id="task-modal-title"
              className="text-xl font-bold text-slate-900"
            >
              {isEditing ? 'Editar tarea' : 'Crear nueva tarea'}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {isEditing
                ? 'Actualiza la información de tu actividad.'
                : 'Agrega la información necesaria para organizar tu actividad.'}
            </p>
          </div>

          <button
            type="button"
            aria-label="Cerrar"
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={21} />
          </button>
        </header>

        <form onSubmit={handleSubmit} className="space-y-5 p-5 sm:p-6">
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">
              Título *
            </span>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Ej. Preparar presentación del proyecto"
              autoFocus
              className={`mt-2 w-full rounded-xl border bg-white px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 ${
                titleError
                  ? 'border-red-400 ring-4 ring-red-50'
                  : 'border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50'
              }`}
            />

            {titleError && (
              <span className="mt-2 block text-sm font-medium text-red-600">
                {titleError}
              </span>
            )}
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-slate-700">
              Descripción
            </span>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe brevemente la actividad..."
              rows="4"
              className="mt-2 w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
            />
          </label>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-semibold text-slate-700">
                Prioridad
              </span>

              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
              >
                <option>Alta</option>
                <option>Media</option>
                <option>Baja</option>
              </select>
            </label>

            <label className="block">
              <span className="text-sm font-semibold text-slate-700">
                Estado inicial
              </span>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
              >
                <option>Pendiente</option>
                <option>En progreso</option>
                {isEditing && <option>Completada</option>}
              </select>
            </label>
          </div>

          <label className="block">
            <span className="text-sm font-semibold text-slate-700">
              Fecha límite
            </span>

            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
            />
          </label>

          <footer className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700"
            >
              {isEditing ? 'Guardar cambios' : 'Guardar tarea'}
            </button>
          </footer>
        </form>
      </section>
    </div>
  )
}

export default TaskModal
