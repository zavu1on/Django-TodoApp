import React, { useState, useEffect, useRef } from 'react'
import Header from '../components/Header'
import Alert from '../components/Alert'
import { useParams, useHistory } from 'react-router-dom'
import { useHttp } from '../hooks/http.hook'
import { useAuth } from '../hooks/auth.hook'


export default function DetailTodoPage() {
  const [todo, setTodo] = useState({})
  const [alert, setAlert] = useState(null)
  const [alertStatus, setAlertStatus] = useState('success')

  const titleRef = useRef(null)
  const id = useParams().id
  const {push} = useHistory()
  const {request} = useHttp()
  const {token} = useAuth()

  
  useEffect(async () => {
    const todo = await request(`/api/todos/${id}`, 'get', null, {authorization: `Token ${token()}`})
    if (!todo.success) {
      push('/todos/')
    }
    setTodo(todo)
  }, [id])


  const _delete = async () => {
    await request(`/api/todos/delete/${todo.id}`, 'post', null, {authorization: `Token ${token()}`})
    push('/todos/')
  }

  const update = async () => {
    setTodo(prev => ({
      ...prev,
      checked: !prev.checked
    }))
    await request(`/api/todos/updatechecked/${id}`, 'post', null, {authorization: `Token ${token()}`})
  }

  const save = async () => {
    const {title, description} = todo
    if (!title.trim()) {
      titleRef.current.classList.add('has-error')
    } else {
      titleRef.current.classList.remove('has-error')
      const resp = await request(`/api/todos/update/${todo.id}`, 'post', {title, description}, {authorization: `Token ${token()}`})
      const success = resp.success
      const mess = Object.entries(resp)

      mess.pop()
      setAlert(mess)
      setAlertStatus(success ? 'success' : 'danger')
    }
  }
  

  return (
    <div className="w-100">
      <Header page="none" />
      <div className="container p-4 position-relative">
        <div className="card">
          <div className="card-header">
            <h5 className="card-title d-flex align-items-center">
              <input style={todo.checked ? {textDecoration: 'line-through'} : {}} placeholder="Title" type="text" value={todo.title} ref={titleRef} className="form-custom-control" onChange={e => setTodo(prev => ({
                ...prev,
                title: e.target.value
              }))}/>
              &nbsp;
              <input maxLength={30} onChange={() => update()} type="checkbox" checked={!!todo.checked} className="form-check-input" style={{
                float: 'none',
                marginLeft: 8,
                position: 'unset',
              }}/>
            </h5>
          </div>
          <div className="card-body">
            <p className="card-text" style={{fontSize: '1.1rem'}}>
              <textarea rows="3" className="form-control" placeholder="Description" value={todo.description} maxLength={100} onChange={e => setTodo(prev => ({
                ...prev,
                description: e.target.value
              }))}/>
            </p>
            <br/>
            <p className="card-text">{todo.created_at}</p>
          </div>
          <div className="card-footer">
            <button className="btn btn-success mr-4" onClick={save} style={{fontSize: '1.2rem'}}>Save</button>
            <button className="btn btn-danger" onClick={_delete} style={{fontSize: '1.2rem'}}>Delete</button>
          </div>
        </div>
      </div>
      {alert ? <Alert messages={alert} clearState={setAlert} status={alertStatus} /> : null}
    </div>
  )
}