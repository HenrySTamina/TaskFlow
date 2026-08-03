# Stack tecnológico

## 1. Lenguajes y formatos

| Tecnología | Uso | Justificación |
|---|---|---|
| JavaScript | Logica de frontend y backend | Permite compartir lenguaje y modelos mentales en todo el sistema |
| JSX | Componentes de React | Integra estructura visual y comportamiento de componentes |
| CSS mediante Tailwind | Presentacion y temas | Facilita estilos consistentes, responsive y personalizables mediante variables |
| SQL | Persistencia | Permite consultas y restricciones relacionales |
| JSON | Comunicación | Formato nativo para solicitudes y respuestas REST |
| Markdown | Documentación | Se renderiza directamente en GitHub y admite diagramas Mermaid |

El proyecto usa módulos ES (`type: module`) tanto en frontend como backend.

## 2. Frontend

| Dependencia | Versión | Responsabilidad | Justificación |
|---|---:|---|---|
| React | 19.2.7 | Componentes, estado y efectos | Adecuado para una interfaz reactiva con vistas reutilizables |
| React DOM | 19.2.7 | Renderizado en navegador | Integración oficial de React con el DOM |
| Vite | 8.1.1 | Servidor y build | Inicio rápido, recarga en caliente y compilación optimizada |
| Tailwind CSS | 4.3.3 | Sistema visual y temas adaptativos | Clases utilitarias, variables CSS y variantes responsive coherentes |
| `@tailwindcss/vite` | 4.3.3 | Integración Tailwind-Vite | Configuración directa dentro del flujo de Vite |
| Lucide React | 1.27.0 | Iconos | Iconos accesibles, ligeros y visualmente consistentes |

## 3. Backend

| Dependencia | Versión | Responsabilidad | Justificación |
|---|---:|---|---|
| Express | 5.2.1 | API REST y middleware | Framework ligero con enrutamiento claro |
| better-sqlite3 | 13.0.2 | Acceso a SQLite | API sincrona simple y consultas preparadas para el alcance local |
| CORS | 2.8.6 | Politica entre origenes | Permite que Vite consuma la API desde otro puerto |
| Node.js | 24.18.0 | Entorno de ejecución | Compatible con módulos ES, `fetch`, UUID y Vite 8 |
| npm | 11.6.0 | Dependencias y scripts | Herramienta incluida con el entorno Node utilizado |

## 4. Base de datos

Se eligio SQLite porque:

- No requiere instalar un servidor de base de datos independiente.
- Genera un archivo portátil para el entorno de desarrollo.
- Soporta restricciones `CHECK`, llaves primarias y transacciones.
- Es suficiente para una aplicación individual de tareas.
- Se integra directamente con Node mediante better-sqlite3.

El archivo `taskflow.db` no se versiona. La tabla se crea automáticamente durante el arranque.

## 5. Herramientas de calidad

| Herramienta | Versión | Uso |
|---|---:|---|
| Oxlint | 1.71.0 | Detectar errores, variables sin uso y problemas de React |
| Vite build | 8.1.1 | Confirmar compilación de produccion |
| DevTools | Navegador | Revisar consola, red y comportamiento responsive |
| API health | Endpoint propio | Comprobar Express y conexión SQLite |

## 6. Control de versiones y colaboración

| Herramienta | Uso | Justificación |
|---|---|---|
| Git | Historial local, ramas y merges | Conserva cambios atomicos y recuperables |
| GitHub | Repositorio remoto | Proporciona Issues, Pull Requests, comparación y Releases |
| GitHub Issues | Backlog y criterios | Mantiene trazabilidad entre necesidad y solucion |
| Pull Requests | Revisión e integración | Muestra archivos, commits, conflictos y pruebas antes del merge |

## 7. Herramientas de desarrollo

- Visual Studio Code como editor.
- PowerShell como terminal principal en Windows 11.
- Chrome DevTools para consola, Network y emulación móvil.
- npm scripts para ejecución repetible.

## 8. Compatibilidad

Entorno utilizado:

- Windows 11.
- Node.js `v24.18.0`.
- npm `11.6.0`.
- Navegador Chromium moderno.

La aplicación utiliza APIs estándar de navegadores modernos: `fetch`, LocalStorage, `Intl.DateTimeFormat`, `window.matchMedia` y módulos ES. La apariencia combina `prefers-color-scheme`, atributos `data-*` y variables CSS para ofrecer modo automático, claro u oscuro y colores de acento sin agregar dependencias.

## 9. Scripts disponibles

Frontend:

| Script | Accion |
|---|---|
| `npm run dev` | Inicia Vite |
| `npm run lint` | Ejecuta Oxlint |
| `npm run build` | Genera `dist` |
| `npm run preview` | Sirve el build localmente |

Backend:

| Script | Accion |
|---|---|
| `npm run dev` | Ejecuta Express con reinicio al cambiar archivos |
| `npm start` | Ejecuta Express sin modo watch |

## 10. Criterios de selección

El stack se seleccionó considerando:

1. Compatibilidad entre tecnologías.
2. Facilidad de ejecución local.
3. Separacion clara entre frontend y backend.
4. Soporte para diseño responsive.
5. Adaptación a la apariencia del dispositivo y personalización visual persistente.
6. Persistencia real sin infraestructura externa.
7. Evidencia fácil de reproducir durante la evaluación.
8. Adecuacion al tiempo y alcance académico.
