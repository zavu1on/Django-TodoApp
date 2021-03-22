import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { userRoutes } from './router'
import { useAuth } from './hooks/auth.hook'
import { TodoProvider } from './context/TodoContext'


export default function App() {
  const {token} = useAuth()
  const routes = userRoutes(!!token())

  return (
    <BrowserRouter>
      <TodoProvider>
        {routes}
      </TodoProvider>
    </BrowserRouter>
  )
}
