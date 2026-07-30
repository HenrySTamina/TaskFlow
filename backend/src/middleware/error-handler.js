import ApiError from '../errors/api-error.js'

function errorHandler(error, _request, response, _next) {
  const isExpectedError = error instanceof ApiError
  const statusCode = isExpectedError ? error.statusCode : 500
  const message = isExpectedError
    ? error.message
    : 'Ocurrió un error interno en el servidor.'

  if (!isExpectedError) {
    console.error(error)
  }

  response.status(statusCode).json({
    message,
  })
}

export default errorHandler