import { reactive } from "vue"

// const isAuthenticated = () => {
//   const token = localStorage.getItem('token')
//   return !!token // Если токен есть, возвращает true, иначе false
// }

const authState = reactive({
  isAuthenticated: !!localStorage.getItem('token')
})

const login = (token) => {
  localStorage.setItem('token', token);
  authState.isAuthenticated = true;
}

const logout = (router) => {
  localStorage.removeItem('token')
  authState.isAuthenticated = false;
  router.push('/auth')
}
export { authState, login, logout }
