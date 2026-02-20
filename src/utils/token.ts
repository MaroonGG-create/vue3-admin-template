export const GET_TOKEN = () => localStorage.getItem('TOKEN')
export const SET_TOKEN = (token: string) => {
  localStorage.setItem('TOKEN', token)
}
export const REMOVE_TOKEN = () => {
  localStorage.removeItem('TOKEN')
}
