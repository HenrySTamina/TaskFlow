const API_BASE_URL =
  import.meta.env.VITE_API_URL ?? 'http://localhost:3001/api'

async function request(path, options = {}) {
  let response

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })
  } catch {
    throw new Error(
      'No se pudo conectar con el servidor. Verifica que el backend esté encendido.',
    )
  }

  if (!response.ok) {
    let message = 'No fue posible completar la solicitud.'

    try {
      const errorData = await response.json()
      message = errorData.message ?? message
    } catch {
      // Se conserva el mensaje general.
    }

    throw new Error(message)
  }

  if (response.status === 204) {
    return null
  }

  return response.json()
}

export async function getTasks() {
  const response = await request('/tasks')
  return response.data
}

export async function createTask(taskData) {
  const response = await request('/tasks', {
    method: 'POST',
    body: JSON.stringify(taskData),
  })

  return response.data
}

export async function updateTask(taskId, taskData) {
  const response = await request(`/tasks/${taskId}`, {
    method: 'PUT',
    body: JSON.stringify(taskData),
  })

  return response.data
}

export async function deleteTask(taskId) {
  return request(`/tasks/${taskId}`, {
    method: 'DELETE',
  })
}