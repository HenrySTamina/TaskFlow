# Flujo de trabajo con Git y GitHub

## 1. Modelo utilizado

TaskFlow utiliza un **Feature Branch Workflow inspirado en Git Flow**. Existen dos ramas permanentes y ramas temporales para cada cambio.

| Rama | Responsabilidad |
|---|---|
| `main` | Versiones estables y liberadas |
| `develop` | Integración de funcionalidades terminadas |
| `feature/HU-xx-*` | Nueva funcionalidad relacionada con una historia |
| `fix/*` | Correccion aislada |
| `docs/*` | Documentación |

## 2. Diagrama

```mermaid
gitGraph
    commit id: "Base estable"
    branch develop
    checkout develop
    commit id: "Preparacion"
    branch feature/HU-xx
    checkout feature/HU-xx
    commit id: "Incremento 1"
    commit id: "Incremento 2"
    checkout develop
    merge feature/HU-xx id: "PR a develop"
    branch docs/documentación
    checkout docs/documentación
    commit id: "Documentación"
    checkout develop
    merge docs/documentación id: "PR documental"
    checkout main
    merge develop id: "Release"
```

## 3. Procedimiento para una funcionalidad

```bash
git switch develop
git pull origin develop
git switch -c feature/HU-xx-nombre
```

Durante el desarrollo:

```bash
git status
git add ruta/del/archivo
git commit -m "feat(alcance): descripción"
git push -u origin feature/HU-xx-nombre
```

Validación:

```bash
npm run lint
npm run build
git status
```

Integración:

1. Abrir Pull Request con base `develop`.
2. Relacionar el Issue mediante `Closes #número`.
3. Describir cambios y pruebas.
4. Revisar commits, archivos y conflictos.
5. Fusionar el Pull Request.
6. Sincronizar `develop`.
7. Eliminar la rama local y remota.

```bash
git switch develop
git pull origin develop
git branch -d feature/HU-xx-nombre
```

## 4. Estrategia de integración

- Las ramas temporales se fusionan hacia `develop` mediante Pull Request.
- Se utiliza merge no destructivo para conservar la trazabilidad de commits.
- `main` recibe cambios solamente mediante un Pull Request de liberación desde `develop`.
- No se utiliza `git push --force` sobre ramas compartidas.
- Una rama se elimina después de comprobar que su Pull Request fue fusionado.
- Un Pull Request no se fusiona si GitHub informa conflictos o las validaciones fallan.

## 5. Convencion de ramas

```text
feature/HU-08-navegación-controles
fix/notificaciones-responsive
docs/documentación-final
```

Los nombres usan minusculas, guiones y una descripción concreta.

## 6. Convencion de commits

Formato:

```text
tipo(alcance): descripción en infinitivo
```

| Tipo | Uso |
|---|---|
| `feat` | Nueva funcionalidad |
| `fix` | Correccion de un defecto |
| `docs` | Documentación |
| `refactor` | Cambio interno sin alterar el comportamiento |
| `test` | Pruebas |
| `chore` | Configuración o mantenimiento |

Ejemplos del historial:

```text
feat(api): crear repositorio de tareas
feat(frontend): cargar tareas desde la API
feat(calendar): agregar calendario mensual y agenda
feat(settings): aplicar preferencias en la interfaz
fix(notifications): ajustar panel en dispositivos móviles
```

## 7. Contenido obligatorio de un Pull Request

- Titulo basado en la convención de commits.
- Resumen del objetivo.
- Lista de cambios.
- Lista de pruebas realizadas.
- Referencia al Issue.
- Rama base y rama compare correctas.
- Confirmacion de ausencia de conflictos.

## 8. Revisión

Como el proyecto es individual, la revisión se realiza mediante un checklist reproducible:

- El diff contiene solo archivos relacionados.
- Los commits son pequenos y descriptivos.
- Los criterios del Issue están cubiertos.
- El frontend mantiene el acceso a la API.
- Las tareas se conservan en SQLite.
- No existen controles simulados.
- El modo móvil fue verificado.
- Lint y build terminan correctamente.
- GitHub permite fusionar automáticamente.

No se registra falsamente una aprobación de otro integrante.

## 9. Evidencia del flujo

| Elemento | Evidencia |
|---|---|
| Backlog | [Issues](https://github.com/HenrySTamina/TaskFlow/issues) |
| Integraciones | [Pull Requests cerrados](https://github.com/HenrySTamina/TaskFlow/pulls?q=is%3Apr+is%3Aclosed) |
| Historial | [Commits](https://github.com/HenrySTamina/TaskFlow/commits/develop/) |
| Versión estable | [Releases](https://github.com/HenrySTamina/TaskFlow/releases) |

Pull Requests representativos:

- [#12 - Backend y SQLite](https://github.com/HenrySTamina/TaskFlow/pull/12)
- [#14 - API CRUD](https://github.com/HenrySTamina/TaskFlow/pull/14)
- [#16 - Conexion frontend/API](https://github.com/HenrySTamina/TaskFlow/pull/16)
- [#18 - Navegacion y controles](https://github.com/HenrySTamina/TaskFlow/pull/18)

## 10. Consistencia entre documentación e historial

El flujo documentado coincide con la práctica observada:

- Las historias se registraron como Issues.
- Las ramas se crearon desde `develop`.
- Los cambios se dividieron en commits.
- Las ramas se publicaron antes del Pull Request.
- Las funcionalidades se fusionaron hacia `develop`.
- Las ramas locales se eliminaron después del merge.
- La primera liberación se integró desde `develop` hacia `main` y se etiqueto como `v1.0.0`.

