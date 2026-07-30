import { ListFilter, RotateCcw } from 'lucide-react'

function TaskFilters({
  status,
  priority,
  hasActiveFilters,
  onStatusChange,
  onPriorityChange,
  onClear,
}) {
  return (
    <div className="flex flex-col gap-3 border-b border-slate-100 bg-slate-50/60 p-4 sm:flex-row sm:flex-wrap sm:items-end">
      <div className="flex items-center gap-2 text-sm font-semibold text-slate-600 sm:mr-2 sm:self-center">
        <ListFilter size={18} className="text-indigo-600" />
        Filtros
      </div>

      <label className="flex-1 sm:min-w-44">
        <span className="mb-1.5 block text-xs font-semibold text-slate-500">
          Estado
        </span>

        <select
          value={status}
          onChange={(event) => onStatusChange(event.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
        >
          <option value="Todas">Todas</option>
          <option value="Pendiente">Pendientes</option>
          <option value="En progreso">En progreso</option>
          <option value="Completada">Completadas</option>
        </select>
      </label>

      <label className="flex-1 sm:min-w-44">
        <span className="mb-1.5 block text-xs font-semibold text-slate-500">
          Prioridad
        </span>

        <select
          value={priority}
          onChange={(event) => onPriorityChange(event.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
        >
          <option value="Todas">Todas</option>
          <option value="Alta">Alta</option>
          <option value="Media">Media</option>
          <option value="Baja">Baja</option>
        </select>
      </label>

      <button
        type="button"
        onClick={onClear}
        disabled={!hasActiveFilters}
        className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <RotateCcw size={16} />
        Limpiar
      </button>
    </div>
  )
}

export default TaskFilters
