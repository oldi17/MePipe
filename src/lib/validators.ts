export function validateEmail(email: string) {
  return email.match(/^[A-z0-9\-_]+@[A-z0-9\-_]+\.[A-z0-9\-_]+$/) !== null
}

export function validatePassword(password: string) {
  return password.length >= 8
}