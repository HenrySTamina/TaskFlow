function StatCard({
  title,
  value,
  description,
  icon: Icon,
  iconClassName,
}) {
  return (
    <article className="taskflow-stat-card rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <p className="mt-2 text-3xl font-bold text-slate-900">
            {value}
          </p>
        </div>

        <div
          className={`taskflow-stat-icon flex h-12 w-12 items-center justify-center rounded-xl ${iconClassName}`}
        >
          <Icon className="taskflow-icon" size={23} />
        </div>
      </div>

      <p className="mt-4 text-sm text-slate-500">
        {description}
      </p>
    </article>
  )
}

export default StatCard
