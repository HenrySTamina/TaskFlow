# Metodología de desarrollo

## 1. Enfoque seleccionado

TaskFlow se desarrolló mediante una **metodología ágil incremental apoyada en Kanban**, utilizando GitHub Issues como lista visible de trabajo. El proyecto no intentó reproducir todas las ceremonias de Scrum; se eligió un flujo ligero y verificable que permitiera entregar una funcionalidad completa por incremento.

Cada historia de usuario pasó por planeación, implementación, validación e integración antes de comenzar la siguiente. Esto permitió conservar siempre una versión funcional en `develop` y versiones estables en `main`.

## 2. Justificación

El enfoque fue apropiado porque:

- El alcance podía dividirse en historias de usuario independientes.
- Las prioridades cambiaron conforme se revisó la rúbrica.
- Cada funcionalidad necesitaba evidencia en Git y GitHub.
- El desarrollo fue individual y requería un proceso simple, visible y disciplinado.
- Las entregas pequeñas reducían el riesgo de integrar cambios demasiado grandes.
- Las pruebas se realizaban inmediatamente después de cada incremento.

## 3. Gestión del trabajo

| Elemento Kanban | Implementación en TaskFlow |
|---|---|
| Pendiente | Issue abierto con historia y criterios de aceptación |
| En progreso | Rama `feature`, `fix` o `docs` creada desde `develop` |
| Validación | Pruebas manuales, API, responsive, lint y build |
| Revisión | Diff y descripción del Pull Request |
| Terminado | Merge, Issue cerrado y rama eliminada |

GitHub Issues funcionó como backlog. Los criterios de aceptación de cada Issue definieron el resultado esperado y evitaron implementar controles sin una función real.

## 4. Fases aplicadas

### Fase 1 - Planeación

Actividades:

- Identificar la necesidad del usuario.
- Redactar una historia de usuario.
- Definir criterios de aceptación.
- Dividir el trabajo en tareas técnicas.
- Crear el Issue correspondiente.

Entregable:

- Issue documentado y numerado.

Evidencia:

- Historial de Issues del repositorio.

### Fase 2 - Preparacion del incremento

Actividades:

- Sincronizar `develop` con el repositorio remoto.
- Crear una rama independiente desde `develop`.
- Verificar que el árbol de trabajo este limpio.

Entregable:

- Rama `feature/HU-xx-*`, `fix/*` o `docs/*`.

Evidencia:

- Historial de ramas y primer commit del incremento.

### Fase 3 - Implementación incremental

Actividades:

- Desarrollar una responsabilidad a la vez.
- Guardar cambios en commits pequenos y descriptivos.
- Publicar regularmente la rama remota.
- Mantener separadas interfaz, lógica, acceso a datos y documentación.

Entregables:

- Codigo fuente funcional.
- Commits independientes por responsabilidad.

Evidencia:

- Historial de commits de cada Pull Request.

### Fase 4 - Validación

Actividades:

- Probar criterios de aceptación en el navegador.
- Comprobar operaciones CRUD contra SQLite.
- Probar estados de error y reintento.
- Revisar el comportamiento responsive.
- Ejecutar `npm run lint`.
- Ejecutar `npm run build`.

Entregable:

- Incremento funcional sin errores detectados.

Evidencia:

- Lista de pruebas incluida en el Pull Request.
- Resultados de terminal y capturas de funcionamiento.

### Fase 5 - Integración

Actividades:

- Publicar la rama.
- Abrir un Pull Request hacia `develop`.
- Revisar archivos, commits, criterios y ausencia de conflictos.
- Fusionar el Pull Request.
- Cerrar automáticamente el Issue relacionado.
- Sincronizar `develop` local y eliminar la rama.

Entregables:

- Pull Request fusionado.
- Issue cerrado.
- Rama de integración actualizada.

Evidencia:

- Conversacion e historial de cada Pull Request.

### Fase 6 - Liberación

Actividades:

- Validar la versión integrada en `develop`.
- Abrir Pull Request de `develop` hacia `main`.
- Fusionar solo si las validaciones son correctas.
- Crear etiqueta y GitHub Release.

Entregables:

- Versión estable en `main`.
- Etiqueta semántica y notas de versión.

Evidencia:

- Pull Request de liberación y seccion Releases.

## 5. Artefactos y entregables

| Artefacto | Proposito |
|---|---|
| Historia de usuario | Expresar una necesidad desde la perspectiva del usuario |
| Criterios de aceptación | Establecer condiciones verificables |
| Issue | Registrar y dar seguimiento al trabajo |
| Rama independiente | Aislar el incremento |
| Commit | Registrar un cambio lógico |
| Pull Request | Revisar e integrar el incremento |
| Pruebas | Confirmar el comportamiento esperado |
| README y documentos | Explicar instalacion, arquitectura y proceso |
| Release | Identificar una versión estable entregable |

## 6. Definition of Ready

Un elemento estuvo listo para iniciar cuando:

- Tenia una historia de usuario clara.
- Incluía criterios de aceptación comprobables.
- Sus tareas técnicas estaban identificadas.
- La rama `develop` estaba actualizada y limpia.
- El alcance cabia en una rama independiente.

## 7. Definition of Done

Un incremento se considero terminado cuando:

- Cumplia todos los criterios del Issue.
- Funcionaba en computadora y dispositivo móvil cuando aplicaba.
- Conservaba el CRUD y la persistencia de SQLite.
- No agregaba botones o controles simulados.
- `npm run lint` terminaba sin errores ni advertencias.
- `npm run build` terminaba correctamente.
- Los cambios estaban organizados en commits descriptivos.
- La rama estaba publicada.
- El Pull Request describia cambios y pruebas.
- El Pull Request estaba fusionado en `develop`.
- El Issue estaba cerrado y la rama eliminada.

## 8. Seguimiento y evidencia

| Incremento | Issue | Pull Request | Resultado |
|---|---:|---:|---|
| Estructura visual del dashboard | [#2](https://github.com/HenrySTamina/TaskFlow/issues/2) | [#3](https://github.com/HenrySTamina/TaskFlow/pull/3) | Integrado |
| Crear y guardar tareas | [#4](https://github.com/HenrySTamina/TaskFlow/issues/4) | [#5](https://github.com/HenrySTamina/TaskFlow/pull/5) | Integrado |
| Editar, completar y eliminar | [#6](https://github.com/HenrySTamina/TaskFlow/issues/6) | [#7](https://github.com/HenrySTamina/TaskFlow/pull/7) | Integrado |
| Buscar y filtrar | [#8](https://github.com/HenrySTamina/TaskFlow/issues/8) | [#9](https://github.com/HenrySTamina/TaskFlow/pull/9) | Integrado |
| Backend y conexión SQLite | [#11](https://github.com/HenrySTamina/TaskFlow/issues/11) | [#12](https://github.com/HenrySTamina/TaskFlow/pull/12) | Integrado |
| API CRUD | [#13](https://github.com/HenrySTamina/TaskFlow/issues/13) | [#14](https://github.com/HenrySTamina/TaskFlow/pull/14) | Integrado |
| Conexion frontend y API | [#15](https://github.com/HenrySTamina/TaskFlow/issues/15) | [#16](https://github.com/HenrySTamina/TaskFlow/pull/16) | Integrado |
| Navegacion y controles | [#17](https://github.com/HenrySTamina/TaskFlow/issues/17) | [#18](https://github.com/HenrySTamina/TaskFlow/pull/18) | Integrado |
| Documentación final | [#19](https://github.com/HenrySTamina/TaskFlow/issues/19) | Pendiente | En progreso |

Adicionalmente, la [versión v1.0.0](https://github.com/HenrySTamina/TaskFlow/releases/tag/v1.0.0) demuestra la primera liberación estable del frontend.

## 9. Revisión en un proyecto individual

TaskFlow fue desarrollado por una sola persona. Por ello no se afirma una aprobación externa inexistente. La revisión previa al merge consistió en:

- Comparar la rama contra `develop`.
- Revisar la lista de archivos y commits.
- Confirmar la relación con el Issue.
- Ejecutar pruebas y documentarlas.
- Verificar que GitHub indicara ausencia de conflictos.
- Realizar el merge solo después de cumplir la Definition of Done.

Esta práctica mantiene la documentación coherente con la evidencia real del repositorio.

## 10. Gestión de cambios

Cuando la rúbrica amplió el alcance hacia backend, base de datos y arquitectura integral, el backlog se actualizó con nuevas historias. El cambio no se incorporó directamente al código existente: se agregaron primero la base del backend, después la API CRUD, luego la conexión del frontend y finalmente las vistas y controles.

Este orden redujo riesgos y permitió validar cada capa antes de continuar.

