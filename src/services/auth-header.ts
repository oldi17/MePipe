export default function authHeader() {
  const accessToken = JSON.parse(localStorage.getItem('access') || '0')
  
  if (accessToken) {
    return { Authorization: 'Bearer ' + accessToken }
  } else {
    return {};
  }
}
