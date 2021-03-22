import React, { useState, useEffect, useContext } from 'react';
import Header from '../components/Header'
import Alert from '../components/Alert'
import TodoList from '../components/TodoList'
import TodoContext from '../context/TodoContext'
import { useAuth } from '../hooks/auth.hook'
import { useHttp } from '../hooks/http.hook'


export default function TodoListPage() {
  const [alert, setAlert] = useState(null)

  const {todos, setTodos, updateTodo, deleteTodo} = useContext(TodoContext)
  const {token} = useAuth()
  const {request} = useHttp()


  useEffect(async () => {
    await request('/api/todos/', 'get', null, {authorization: `Token ${token()}`})
      .then(res => {
        if (res.success) {
          delete res.success
          setTodos(res)
        }
      })
  }, [])


  const update = async id => {
    updateTodo(id)
    await request(`/api/todos/updatechecked/${id}`, 'post', null, {authorization: `Token ${token()}`})
  }

  const _delete = async id => {
    deleteTodo(id)
    await request(`/api/todos/delete/${id}`, 'post', null, {authorization: `Token ${token()}`})
    const {title} = todos.find(t => t.id === id)
    setAlert([[`Задание ${title} было удалено`]])
  }


  return (
    <div className="w-100">
      <Header />
      <div className="container p-4 position-relative">
        {todos.length ? <TodoList
          todos={todos}
          updateTodos={update}
          deleteTodos={_delete}
        /> : <h1>No todos</h1>}
      </div>
      {alert ? <Alert messages={alert} clearState={setAlert} status="danger" delay={1000} /> : null}
    </div>
  )
}
