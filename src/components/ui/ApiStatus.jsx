import {
  LoaderCircle,
  RefreshCw,
  WifiOff,
} from 'lucide-react'

function ApiStatus({
  isLoading,
  errorMessage,
  onRetry,
}) {
  if (isLoading) {
    return (
      <div
        role="status"
        className="taskflow-status-enter mx-4 mt-4 flex items-center gap-3 rounded-xl border border-indigo-100 bg-indigo-50 px-4 py-3 text-sm font-medium text-indigo-700 sm:mx-6 lg:mx-8"
      >
        <LoaderCircle className="animate-spin" size={19} />
        <span>Cargando tareas desde el servidor...</span>
      </div>
    )
  }

  if (!errorMessage) {
    return null
  }

  return (
    <div
      role="alert"
      className="taskflow-status-enter mx-4 mt-4 flex flex-col gap-4 rounded-xl border border-red-200 bg-red-50 px-4 py-4 sm:mx-6 sm:flex-row sm:items-center sm:justify-between lg:mx-8"
    >
      <div className="flex items-start gap-3">
        <WifiOff
          className="taskflow-danger-icon mt-0.5 shrink-0 text-red-600"
          size={20}
        />

        <div>
          <p className="text-sm font-bold text-red-800">
            No se pudo conectar con TaskFlow
          </p>

          <p className="mt-1 text-sm text-red-700">
            {errorMessage}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onRetry}
        className="taskflow-interactive flex items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
      >
        <RefreshCw className="taskflow-icon" size={17} />
        <span>Reintentar</span>
      </button>
    </div>
  )
}

export default ApiStatus
