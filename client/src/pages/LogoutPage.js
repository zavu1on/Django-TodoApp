import React, { useEffect } from 'react'
import { useAuth } from '../hooks/auth.hook'
import { useHttp } from '../hooks/http.hook'
import '../css/loader.css'


export default function LogoutPage() {
  const {request} = useHttp()
  const {token, logout} = useAuth()


  useEffect(async () => {
    await request('/auth/token/logout/', 'post', null, {authorization: `Token ${token()}`})
    logout()
    window.location.reload()
  }, [])


  return (
    <div className="w-100 h-75 d-flex align-items-center justify-content-center">
      <div className="lds-ring">
        <div/>
        <div/>
        <div/>
        <div/>
      </div>
    </div>
  )
}