import React, { useState, useRef } from 'react'
import Header from '../components/Header'
import Alert from '../components/Alert'
import { useHttp } from '../hooks/http.hook'
import { useAuth } from '../hooks/auth.hook'


export default function AddTodoPage() {
  const [form, setForm] = useState({title: '', description: ''})
  const [alertStatus, setAlertStatus] = useState('success')
  const [alert, setAlert] = useState(null)

  const titleRef = useRef(null)
  const titleLabelRef = useRef(null)

  const {request} = useHttp()
  const {token} = useAuth()


  const submitHandler = async () => {
    const {title, description} = form
    const errors = []

    if (!title.trim()) {
      titleRef.current.classList.add('has-error')
      titleLabelRef.current.classList.add('has-error')
      titleLabelRef.current.innerText = 'This field is required'
      errors.push(false)
    } else {
      titleRef.current.classList.remove('has-error')
      titleLabelRef.current.classList.remove('has-error')
      titleLabelRef.current.innerText = 'Username'
    }

    if (!errors.length) {
      const resp = await request('/api/todos/create', 'post', {title, description}, {authorization: `Token ${token()}`})
      if (resp.success) {
        const mess = Object.entries(resp)
        mess.pop()
        console.log(mess)
        setAlert(mess)
        setAlertStatus('success')
      } else {
        const mess = Object.entries(resp)
        mess.pop()
        setAlert(mess)
        setAlertStatus('danger')
      }
    }
  }


  return (
    <div className="w-100">
      <Header page="add" />
      <div className="container p-4 d-flex justify-content-center position-relative">
        <div className="card mycard text-center bg-dark text-white mt-4" style={{width: '25rem'}}>
          <div className="card-header"><h2>Add Todo</h2></div>
          <div className="card-body position-relative">
            <form className="text-left">

              <div className="form-group mt-3">
                <input type="text" ref={titleRef} className="form-control" id="title" placeholder="Title" maxLength={30} onChange={e => setForm(prev => ({
                  ...prev,
                  title: e.target.value
                }))}/>
                <label htmlFor="title" ref={titleLabelRef}>Title</label>
              </div>

              <div className="form-group">
                <textarea id="desc" cols="30" rows="3" className="form-control" placeholder="Description" maxLength={100} onChange={e => setForm(prev => ({
                  ...prev,
                  description: e.target.value
                }))}/>
                <label htmlFor="desc">Description</label>
              </div>

            </form>
          </div>
          <div className="card-footer text-left">
            <button className="btn btn-primary btn-lg" onClick={submitHandler}>Submit</button>
          </div>
        </div>
      </div>
      {alert ? <Alert messages={alert} clearState={setAlert} status={alertStatus} /> : null}
    </div>
  )
}