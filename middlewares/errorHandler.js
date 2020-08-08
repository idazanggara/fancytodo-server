function errorHandler(err, req, res, next) {
  if (err.name == 'SequelizeValidationError')
  {
      const errors = err.errors.map(el => ({
          message: el.message
      }))
      res.status(400).json({
          code: 400,
          name: 'BadRequest',
          errors: errors
      })
  } else if (err.name == 'BadRequest')
  {
      res.status(400).json({
          code: 400,
          name: err.name,
          errors: err.errors
      })
  } else if (err.name == 'InternalServerError')
  {
      res.status(500).json({
          code: 500,
          name: err.name,
          errors: err.errors
      })
  } else if (err.name == 'JsonWebTokenError')
  {
      res.status(500).json({
          code: 500,
          name: err.name,
          errors: [{ msg: err.msg }]
      })
  } else if (err.name == 'NotFound')
  {
      res.status(404).json({
          code: 404,
          name: err.name,
          errors: err.errors
      })
  } else if (err.name == 'Unauthenticated')
  {
      res.status(401).json({
          code: 401,
          name: err.name,
          errors: 'User is Unauthenticated.'
      })
  } else if (err.name == 'Unauthorized')
  {
      res.status(401).json({
          code: 401,
          name: err.name,
          errors: 'User is Unauthorized.'
      })
  } else {
      res.status(500).json({
          code: 500,
          name: err.name,
          errors: err.errors
      })
  }
}

module.exports = errorHandler