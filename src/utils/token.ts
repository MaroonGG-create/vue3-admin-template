export const GET_TOKEN = () => localStorage.getItem('token')
export const SET_TOKEN = (token: string) => {
  localStorage.setItem('TOKEN', token)
}
