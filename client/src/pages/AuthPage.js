import React, { useState, useRef } from 'react'
import Alert from '../components/Alert'
import { useHttp } from '../hooks/http.hook'
import { useAuth } from '../hooks/auth.hook'


export default function AuthPage() {
  const [regForm, setRegForm] = useState({
    username: '', email: '', password: '', re_password: ''
  })
  const [loginForm, setLoginForm] = useState({
    login: '', password: ''
  })
  const [alert, setAlert] = useState(null)
  const [alertStatus, setAlertStatus] = useState('success')

  const {request} = useHttp()
  const auth = useAuth()

  const usernameRegRef = useRef(null)
  const emailRegRef = useRef(null)
  const passwordRegRef = useRef(null)
  const rePasswordRegRef = useRef(null)
  const usernameLabelRegRef = useRef(null)
  const emailLabelRegRef = useRef(null)
  const passwordLabelRegRef = useRef(null)
  const rePasswordLabelRegRef = useRef(null)

  const usernameLoginRef = useRef(null)
  const usernameLabelLoginRef = useRef(null)
  const passwordLoginRef = useRef(null)
  const passwordLabelLoginRef = useRef(null)


  const registerHandler = async () => {
    const {username, email, password, re_password} = regForm

    const errors = []

    if (!username.trim()) {
      usernameRegRef.current.classList.add('has-error')
      usernameLabelRegRef.current.classList.add('has-error')
      usernameLabelRegRef.current.innerText = 'This field is required'
      errors.push(false)
    } else {
      usernameRegRef.current.classList.remove('has-error')
      usernameLabelRegRef.current.classList.remove('has-error')
      usernameLabelRegRef.current.innerText = 'Username'
    }
    if (!email.trim()) {
      emailRegRef.current.classList.add('has-error')
      emailLabelRegRef.current.classList.add('has-error')
      emailLabelRegRef.current.innerText = 'This field is required'
      errors.push(false)
    }  else {
      emailRegRef.current.classList.remove('has-error')
      emailLabelRegRef.current.classList.remove('has-error')
      emailLabelRegRef.current.innerText = 'Email'
    }
    if (!password.trim()) {
      passwordRegRef.current.classList.add('has-error')
      passwordLabelRegRef.current.classList.add('has-error')
      passwordLabelRegRef.current.innerText = 'This field is required'
      errors.push(false)
    } if (!re_password.trim()) {
      rePasswordRegRef.current.classList.add('has-error')
      rePasswordLabelRegRef.current.classList.add('has-error')
      rePasswordLabelRegRef.current.innerText = 'This field is required'
      errors.push(false)
   } if (re_password !== password) {
      passwordLabelRegRef.current.innerText = 'Password must be same'
      rePasswordLabelRegRef.current.innerText = 'Password must be same'

      passwordRegRef.current.classList.add('has-error')
      passwordLabelRegRef.current.classList.add('has-error')
      rePasswordRegRef.current.classList.add('has-error')
      rePasswordLabelRegRef.current.classList.add('has-error')
      errors.push(false)
    }

    if (password.trim() && password === re_password) {
      passwordLabelRegRef.current.innerText = 'Password'
      rePasswordLabelRegRef.current.innerText = 'Confirm password'

      passwordRegRef.current.classList.remove('has-error')
      passwordLabelRegRef.current.classList.remove('has-error')
      rePasswordRegRef.current.classList.remove('has-error')
      rePasswordLabelRegRef.current.classList.remove('has-error')
    }

    if (!errors.length) {
      const resp = await request('/auth/users/', 'post', {username, email, password, re_password})

      if (resp.success) {
        localStorage.setItem('userData', JSON.stringify({username, password}))
        setAlertStatus('success')
        setAlert([[`На ваш email - ${resp.email} было отправленно письмо с подтверждением регистрации`]])
      } else {
        const mess = Object.entries(resp)
        mess.pop()
        setAlertStatus('danger')
        setAlert(mess)
      }
    }
  }

  const loginHandler = async () => {
    const {login, password} = loginForm
    const errors = []

    if (!login.trim()) {
      usernameLoginRef.current.classList.add('has-error')
      usernameLabelLoginRef.current.classList.add('has-error')
      usernameLabelLoginRef.current.innerText = 'This field is required'
      errors.push(false)
    } else {
      usernameLoginRef.current.classList.remove('has-error')
      usernameLabelLoginRef.current.classList.remove('has-error')
      usernameLabelLoginRef.current.innerText = 'Username'
    }
    if (!password.trim()) {
      passwordLoginRef.current.classList.add('has-error')
      passwordLabelLoginRef.current.classList.add('has-error')
      passwordLabelLoginRef.current.innerText = 'This field is required'
      errors.push(false)
    } else {
      passwordLoginRef.current.classList.remove('has-error')
      passwordLabelLoginRef.current.classList.remove('has-error')
      passwordLabelLoginRef.current.innerText = 'Password'
    }

    if (!errors.length) {
      if (login.indexOf('@') > -1) {
        var resp = await request('/auth/token/login/', 'post', {email: login, password})
      } else {
        var resp = await request('/auth/token/login/', 'post', {username: login, password})
      }

      if (!resp.success) {
        const mess = Object.entries(resp)
        mess.pop()
        setAlertStatus('danger')
        setAlert(mess)
      } else {
        auth.login(resp.auth_token)
        window.location.reload()
      }
    }
  }


  return (
    <div className="container-fluid m-5">
      <h1 className="text-center">Todo App</h1>
      <div className="container position-relative">
        <div className="row mt-5">

          <div className="col-md-6 d-flex justify-content-start">
            <div className="card mycard text-center bg-success text-white" style={{width: '25rem'}}>
              <div className="card-header"><h2>Авторизация</h2></div>
              <div className="card-body position-relative">
                <form className="text-left">
                  <div className="form-group mt-3">
                    <input type="text" className="form-control" id="login" placeholder="Username or email" ref={usernameLoginRef} onChange={e => setLoginForm(prev => ({
                      ...prev,
                      login: e.target.value
                    }))}/>
                    <label htmlFor="login" ref={usernameLabelLoginRef}>Username <strong>or</strong> Email</label>
                  </div>
                  <div className="form-group">
                    <input type="password" className="form-control" id="lpassword" placeholder="password" ref={passwordLoginRef} onChange={e => setLoginForm(prev => ({
                      ...prev,
                      password: e.target.value
                    }))}/>
                    <label htmlFor="lpassword" ref={passwordLabelLoginRef}>Password</label>
                  </div>
                </form>
              </div>
              <div className="card-footer text-left">
                <button className="btn btn-primary btn-lg" onClick={loginHandler}>Submit</button>
              </div>
            </div>
          </div>

          <div className="col-md-6 d-flex justify-content-end">
            <div className="card mycard text-center bg-warning text-white" style={{width: '25rem'}}>
              <div className="card-header"><h2>Регистрация</h2></div>
              <div className="card-body">
                <form className="text-left">
                  <div className="form-group mt-3">
                    <input type="text" className="form-control" id="username" ref={usernameRegRef} placeholder="Username" onChange={e => setRegForm(prev => ({
                      ...prev,
                      username: e.target.value,
                    }))}/>
                    <label htmlFor="username" ref={usernameLabelRegRef}>Username</label>
                  </div>
                  <div className="form-group">
                    <input type="email" className="form-control" id="email" ref={emailRegRef} placeholder="Email" onChange={e => setRegForm(prev => ({
                      ...prev,
                      email: e.target.value,
                    }))}/>
                    <label htmlFor="email" ref={emailLabelRegRef}>Email</label>
                  </div>
                  <div className="form-group">
                    <input type="password" className="form-control" id="password" ref={passwordRegRef} placeholder="Password" onChange={e => setRegForm(prev => ({
                      ...prev,
                      password: e.target.value,
                    }))}/>
                    <label htmlFor="password" ref={passwordLabelRegRef}>Password</label>
                  </div>
                  <div className="form-group">
                    <input type="password" className="form-control" id="re_password" ref={rePasswordRegRef} placeholder="Confirm password" onChange={e => setRegForm(prev => ({
                      ...prev,
                      re_password: e.target.value,
                    }))}/>
                    <label htmlFor="re_password" ref={rePasswordLabelRegRef}>Confirm password</label>
                  </div>
                </form>
              </div>
              <div className="card-footer text-left">
                <button onClick={registerHandler} className="btn btn-primary btn-lg">Submit</button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {alert ? <Alert messages={alert} clearState={setAlert} status={alertStatus}/> : null}
    </div>
  )
}