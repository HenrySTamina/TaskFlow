import { AlertTriangle } from 'lucide-react'

function DeleteTaskModal({ task, onClose, onConfirm }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Cancelar eliminación"
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm"
      />

      <section
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-task-title"
        aria-describedby="delete-task-description"
        className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
          <AlertTriangle size={27} />
        </div>

        <h2
          id="delete-task-title"
          className="mt-5 text-xl font-bold text-slate-900"
        >
          ¿Eliminar esta tarea?
        </h2>

        <p
          id="delete-task-description"
          className="mt-2 text-sm leading-6 text-slate-500"
        >
          La tarea “{task.title}” será eliminada permanentemente. Esta acción
          no se puede deshacer.
        </p>

        <footer className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-red-200 transition hover:bg-red-700"
          >
            Sí, eliminar
          </button>
        </footer>
      </section>
    </div>
  )
}

export default DeleteTaskModal
