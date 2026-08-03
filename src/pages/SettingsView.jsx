import {
  BellRing,
  CheckCircle2,
  Database,
  RotateCcw,
  Save,
  Server,
  Settings,
  User,
} from 'lucide-react'
import { useState } from 'react'

import { DEFAULT_PREFERENCES } from '../services/preferences'

function SettingsView({
  preferences,
  onSave,
}) {
  const [formData, setFormData] = useState(
    () => ({ ...preferences }),
  )
  const [wasSaved, setWasSaved] = useState(false)

  function handleChange(event) {
    const {
      name,
      type,
      value,
      checked,
    } = event.target

    setFormData((currentData) => ({
      ...currentData,
      [name]: type === 'checkbox' ? checked : value,
    }))

    setWasSaved(false)
  }

  function handleSubmit(event) {
    event.preventDefault()

    const savedPreferences = onSave({
      ...formData,
      weeklyGoal: Number(formData.weeklyGoal),
    })

    setFormData(savedPreferences)
    setWasSaved(true)
  }

  function restoreDefaults() {
    const savedPreferences = onSave(DEFAULT_PREFERENCES)

    setFormData(savedPreferences)
    setWasSaved(true)
  }

  return (
    <main className="p-4 sm:p-6 lg:p-8">
      <section className="mb-8">
        <p className="text-sm font-medium text-indigo-600">
          Preferencias
        </p>

        <h2 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
          Configuración
        </h2>

        <p className="mt-2 text-slate-500">
          Personaliza la información y el comportamiento de TaskFlow.
        </p>
      </section>

      <form
        onSubmit={handleSubmit}
        className="grid gap-6 xl:grid-cols-[1fr_360px]"
      >
        <div className="space-y-6">
          {wasSaved && (
            <div
              role="status"
              className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700"
            >
              <CheckCircle2 size={20} />
              <span>Preferencias guardadas correctamente.</span>
            </div>
          )}

          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <User size={21} />
              </div>

              <div>
                <h3 className="font-bold text-slate-900">
                  Perfil
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Nombre que se mostrará dentro de la aplicación.
                </p>
              </div>
            </div>

            <label className="mt-6 block">
              <span className="text-sm font-semibold text-slate-700">
                Nombre visible
              </span>

              <input
                type="text"
                name="displayName"
                value={formData.displayName}
                onChange={handleChange}
                required
                maxLength="60"
                placeholder="Escribe tu nombre"
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
              />
            </label>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                <Settings size={21} />
              </div>

              <div>
                <h3 className="font-bold text-slate-900">
                  Productividad
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Define el objetivo que deseas completar cada semana.
                </p>
              </div>
            </div>

            <label className="mt-6 block">
              <span className="text-sm font-semibold text-slate-700">
                Meta semanal de tareas
              </span>

              <input
                type="number"
                name="weeklyGoal"
                value={formData.weeklyGoal}
                onChange={handleChange}
                min="1"
                max="100"
                required
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
              />

              <span className="mt-2 block text-xs text-slate-500">
                Puedes establecer una meta entre 1 y 100 tareas.
              </span>
            </label>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <BellRing size={21} />
              </div>

              <div className="flex-1">
                <h3 className="font-bold text-slate-900">
                  Notificaciones
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Controla los avisos de tareas próximas o vencidas.
                </p>
              </div>

              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  name="notificationsEnabled"
                  checked={formData.notificationsEnabled}
                  onChange={handleChange}
                  className="peer sr-only"
                />

                <span className="h-6 w-11 rounded-full bg-slate-300 transition peer-checked:bg-indigo-600" />

                <span className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition peer-checked:translate-x-5" />
              </label>
            </div>
          </article>

          <footer className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={restoreDefaults}
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
            >
              <RotateCcw size={18} />
              <span>Restaurar valores</span>
            </button>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700"
            >
              <Save size={18} />
              <span>Guardar configuración</span>
            </button>
          </footer>
        </div>

        <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h3 className="font-bold text-slate-900">
            Información del sistema
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Tecnologías utilizadas por TaskFlow.
          </p>

          <div className="mt-6 space-y-4">
            <div className="flex items-start gap-3 rounded-xl bg-slate-50 p-4">
              <Database className="mt-0.5 text-indigo-600" size={20} />

              <div>
                <p className="text-sm font-semibold text-slate-800">
                  Tareas
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Almacenadas persistentemente en SQLite.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-xl bg-slate-50 p-4">
              <Server className="mt-0.5 text-emerald-600" size={20} />

              <div>
                <p className="text-sm font-semibold text-slate-800">
                  Comunicación
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Frontend conectado mediante una API REST.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-xl bg-slate-50 p-4">
              <Settings className="mt-0.5 text-amber-600" size={20} />

              <div>
                <p className="text-sm font-semibold text-slate-800">
                  Preferencias
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Guardadas localmente en este navegador.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 border-t border-slate-100 pt-5 text-center">
            <p className="text-sm font-semibold text-slate-700">
              TaskFlow v1.1
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Gestión de tareas full stack
            </p>
          </div>
        </aside>
      </form>
    </main>
  )
}

export default SettingsView