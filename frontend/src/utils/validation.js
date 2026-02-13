// Form validation utilities
export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

export const validatePassword = (password) => {
  return password && password.length >= 6
}

export const validateUsername = (username) => {
  return username && username.length >= 3
}

export const validateForm = (type, formData) => {
  const errors = {}

  if (type === 'register') {
    if (!formData.username) errors.username = 'Username is required'
    else if (!validateUsername(formData.username)) errors.username = 'Username must be at least 3 characters'

    if (!formData.email) errors.email = 'Email is required'
    else if (!validateEmail(formData.email)) errors.email = 'Invalid email format'

    if (!formData.password) errors.password = 'Password is required'
    else if (!validatePassword(formData.password)) errors.password = 'Password must be at least 6 characters'

    if (!formData.role) errors.role = 'Role is required'
    if (!formData.course) errors.course = 'Course is required'
  }

  if (type === 'login') {
    if (!formData.email) errors.email = 'Email is required'
    else if (!validateEmail(formData.email)) errors.email = 'Invalid email format'

    if (!formData.password) errors.password = 'Password is required'
  }

  return errors
}
