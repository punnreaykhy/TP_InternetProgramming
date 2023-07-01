
const joiValidation =  (schema) => {
  return async (req, res, next) => {
    try {
      const body = req.body;
      await schema.validateAsync(body);
    } catch (err) {
      return res.json({ success: false, error: err.details[0].message })
    }
    next();
  }
}


module.exports = joiValidation;