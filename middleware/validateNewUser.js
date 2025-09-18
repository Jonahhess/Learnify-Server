function validateNewUser(req, res, next) {
  const { name, email, password } = req.body;
  const errors = [];

  if (!name || typeof name !== 'string') {
    errors.push({ field: 'name', message: 'Name is required and must be a string' });
  }

  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    errors.push({ field: 'email', message: 'Valid email is required' });
  }

  if (!password || password.length < 6) {
    errors.push({ field: 'password', message: 'Password must be at least 6 characters long' });
  }

  if (errors.length > 0) {
    throw new Error(JSON.stringify({ message: 'Validation errors', errors }));
  }

  next();
}

module.exports = validateNewUser;
