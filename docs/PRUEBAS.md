# Pruebas y evidencias

## 1. Estrategia

La versión actual utiliza cuatro niveles de validación:

1. **Analisis estático:** Oxlint revisa errores comunes y reglas de React.
2. **Compilacion:** Vite genera el paquete de produccion.
3. **Pruebas de API:** se verifican salud, CRUD, validaciones y códigos HTTP.
4. **Pruebas funcionales:** se recorren vistas, controles, persistencia y responsive.

La estrategia es manual y reproducible. No se afirma la existencia de pruebas unitarias automatizadas que el repositorio no contiene.

## 2. Validación del frontend

Comandos:

```bash
npm run lint
npm run build
```

Ultimo resultado registrado para HU-09:

- Oxlint: `0 warnings` y `0 errors` sobre 29 archivos.
- Vite: compilación correcta de 1801 módulos.
- Build generado correctamente en `dist`.

## 3. Validación del backend

Inicio:

```bash
cd backend
npm run dev
```

Salud:

```powershell
Invoke-RestMethod -Method Get `
  -Uri "http://localhost:3001/api/health"
```

Resultado esperado:

```json
{
  "status": "ok",
  "message": "TaskFlow API funcionando correctamente",
  "database": {
    "status": "connected",
    "engine": "SQLite",
    "file": "taskflow.db"
  }
}
```

## 4. Matriz CRUD de API

| Caso | Metodo y ruta | Resultado esperado | Estado |
|---|---|---|---|
| Listar tareas | `GET /api/tasks` | `200` y arreglo | Aprobado |
| Crear tarea válida | `POST /api/tasks` | `201` y UUID | Aprobado |
| Consultar por ID | `GET /api/tasks/:id` | `200` y objeto | Aprobado |
| Actualizar tarea | `PUT /api/tasks/:id` | `200` y datos nuevos | Aprobado |
| Eliminar tarea | `DELETE /api/tasks/:id` | `204` | Aprobado |
| Consultar eliminada | `GET /api/tasks/:id` | `404` | Aprobado |
| Titulo vacío | `POST /api/tasks` | `400` | Aprobado |
| Prioridad inválida | `POST /api/tasks` | `400` | Aprobado |
| Estado inválido | `POST /api/tasks` | `400` | Aprobado |
| Fecha inválida | `POST /api/tasks` | `400` | Aprobado |
| Ruta inexistente | Cualquier método | `404` y mensaje | Aprobado |

## 5. Matriz funcional

| Modulo | Caso | Resultado | Estado |
|---|---|---|---|
| Dashboard | Mostrar estadísticas reales | Coinciden con tareas de SQLite | Aprobado |
| Tareas | Crear tarea | Aparece y persiste después de recargar | Aprobado |
| Tareas | Editar campos | Cambios visibles y persistentes | Aprobado |
| Tareas | Cambiar estado | Estadisticas se actualizan | Aprobado |
| Tareas | Eliminar | Solicita confirmacion y no reaparece | Aprobado |
| Busqueda | Buscar título o descripción | Solo muestra coincidencias | Aprobado |
| Filtros | Estado y prioridad | Lista filtrada correctamente | Aprobado |
| Calendario | Mes anterior y siguiente | Cuadricula cambia correctamente | Aprobado |
| Calendario | Seleccionar mes y año | Navegacion directa funcional | Aprobado |
| Calendario | Abrir tarea | Formulario de edición disponible | Aprobado |
| Estadisticas | Modificar una tarea | Metricas se recalculan | Aprobado |
| Configuración | Guardar preferencias | Se conservan después de recargar | Aprobado |
| Apariencia | Modo predeterminado Sistema | Coincide con la preferencia clara u oscura del dispositivo | Aprobado |
| Apariencia | Cambiar entre Sistema, Claro y Oscuro | La interfaz completa cambia inmediatamente | Aprobado |
| Apariencia | Cambiar apariencia del dispositivo en modo Sistema | TaskFlow responde al cambio sin perder la selección | Aprobado |
| Apariencia | Elegir Índigo, Morado o Verde esmeralda | Controles, indicadores y gráficos usan el acento seleccionado | Aprobado |
| Apariencia | Recargar el navegador | Modo manual y color de acento permanecen | Aprobado |
| Apariencia | Restaurar configuración | Regresa a Sistema e Índigo | Aprobado |
| Perfil | Cambiar nombre | Saludo, nombre e iniciales cambian | Aprobado |
| Meta semanal | Cambiar objetivo | Numero y porcentaje cambian | Aprobado |
| Notificaciones | Tarea vencida o próxima | Aparece contador real | Aprobado |
| Notificaciones | Abrir tarea | Abre edición | Aprobado |
| Notificaciones | Desactivar | Oculta contador y muestra aviso | Aprobado |
| Conexion | Backend apagado | Muestra error y boton Reintentar | Aprobado |
| Conexion | Backend restaurado | Reintentar recupera las tareas | Aprobado |

## 6. Pruebas responsive

Resoluciones revisadas:

- Escritorio.
- Tableta mediante DevTools.
- Movil aproximado de `390 x 844`.

Casos:

| Caso | Resultado | Estado |
|---|---|---|
| Abrir menu móvil | Sidebar visible | Aprobado |
| Seleccionar una vista | Sidebar se cierra | Aprobado |
| Formularios | Campos y acciones utilizables | Aprobado |
| Calendario | Navegacion y desplazamiento disponibles | Aprobado |
| Estadisticas | Tarjetas se reorganizan | Aprobado |
| Configuración | Formulario cabe y puede recorrerse | Aprobado |
| Temas | Vistas, modales y notificaciones conservan contraste | Aprobado |
| Notificaciones | Panel permanece dentro de la pantalla | Aprobado después de correccion `03e9129` |

## 7. Persistencia

Procedimiento:

1. Crear una tarea desde el frontend.
2. Consultar `GET /api/tasks`.
3. Recargar el navegador.
4. Reiniciar frontend y backend.
5. Consultar nuevamente la tarea.

Resultado:

- La tarea permanece en SQLite.
- LocalStorage no contiene la lista principal de tareas.
- Las preferencias visuales, incluido modo y color de acento, si permanecen en LocalStorage.

## 8. Trazabilidad

Cada Pull Request incluye sus propias pruebas. Evidencias destacadas:

- [PR #12](https://github.com/HenrySTamina/TaskFlow/pull/12): servidor y SQLite.
- [PR #14](https://github.com/HenrySTamina/TaskFlow/pull/14): endpoints y validaciones CRUD.
- [PR #16](https://github.com/HenrySTamina/TaskFlow/pull/16): conexión frontend/API y persistencia.
- [PR #18](https://github.com/HenrySTamina/TaskFlow/pull/18): navegación, calendario, estadísticas, preferencias y notificaciones.
- [Issue #25](https://github.com/HenrySTamina/TaskFlow/issues/25): temas adaptativos y colores de acento.

## 9. Criterio de aceptación final

La entrega se considera válida cuando:

- Frontend y backend arrancan con las instrucciones del README.
- `/api/health` informa API y SQLite conectadas.
- CRUD funciona desde la interfaz.
- Los datos permanecen después de reiniciar.
- Todas las vistas y controles tienen una función real.
- El tema sigue al dispositivo por defecto y permite selección manual persistente.
- El modo móvil es utilizable.
- Lint y build terminan correctamente.
- El árbol de Git está limpio.
- La documentación coincide con el código integrado.
