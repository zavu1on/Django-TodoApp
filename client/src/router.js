import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import AuthPage from './pages/AuthPage'
import TodoListPage from './pages/TodoListPage';
import ConfrimRegPage from "./pages/ConfrimRegPage"
import LogoutPage from "./pages/LogoutPage"
import DetailTodoPage from "./pages/DetailTodoPage"
import AddTodoPage from "./pages/AddTodoPage"


export const userRoutes = isAuthenticated => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/todos/" exact>
          <TodoListPage />
        </Route>
        <Route path="/todos/:id">
          <DetailTodoPage />
        </Route>
        <Route path="/addtodo" exact>
          <AddTodoPage />
        </Route>
        <Route path="/logout">
          <LogoutPage />
        </Route>
        <Redirect to="/todos/" />
      </Switch>
    )
  }

  return (
    <Switch>
      <Route path="/" exact>
        <AuthPage />
      </Route>
      <Route path="/activate/:uid/:token">
        <ConfrimRegPage />
      </Route>
      <Redirect to="/"/>
    </Switch>
  )
}

