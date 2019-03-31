const formatYupError = err => {
  console.log('formatYupError', err)
  let errors = []

  errors = err.inner.map(e => {
    return {
      path: e.path,
      message: e.message
    }
  })

  return errors
}

module.exports = formatYupError
