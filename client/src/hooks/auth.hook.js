import { useCallback } from 'react'

const storageName = 'userToken'
export const useAuth = () => {

  const token = () => {
    try {
      return JSON.parse(localStorage.getItem(storageName)).token
    } catch (e) {
      return null
    }
  }

  const login = useCallback(token => {
    localStorage.setItem(storageName, JSON.stringify({token}))
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(storageName)
  }, [])

  return {token, login, logout}
}