import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useHttp } from '../hooks/http.hook'
import { useAuth } from '../hooks/auth.hook'
import '../css/loader.css'


export default function ConfrimRegPage() {
  const {request} = useHttp()
  const {login} = useAuth()
  const {uid, token} = useParams()


  useEffect(async () => {
    const resp = await request('/auth/users/activation/', 'post', {uid, token})

    if (resp.success) {
      const {username, password} = JSON.parse(localStorage.getItem('userData'))
      localStorage.removeItem('userData')

      const resp = await request('/auth/token/login/', 'post', {username, password})

      if (resp.success) {
        login(resp.auth_token)
      }

      window.location.reload()
    }

  }, [uid, token])

  return (
    <div className="w-100 h-75 d-flex align-items-center justify-content-center">
      <div className="lds-ring">
        <div/>
        <div/>
        <div/>
        <div/>
      </div>
    </div>
  );
};

