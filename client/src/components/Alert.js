import React, { useEffect, useRef } from 'react'


export default function Alert({messages, clearState, status='success', delay=4000}) {
  const alertRef = useRef(null)

  useEffect(() => {
    setTimeout(() => {
      try {
        alertRef.current.classList.remove('slide-in')
        alertRef.current.classList.add('slide-out')
      } catch (e) {}
    }, delay)

    setTimeout(() => {
      clearState(null)
    }, delay + 500)
  })

  return (
    <div className={"alert " + (status === 'success' ? "alert-success" : "alert-danger") + " slide-in"} role="alert" ref={alertRef}>
      <ul style={{margin: 0}}>
        {messages.map((m, idx) => <li key={idx}>{m[0]} {m[1] ? `- ${m[1]}` : null}</li>)}
      </ul>
    </div>
  )
}