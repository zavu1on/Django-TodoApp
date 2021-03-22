import React from 'react'
import { Link } from 'react-router-dom'


export default function TodoList({todos, updateTodos, deleteTodos}) {

  return (
    <div className="card">
      <ul className="list-group list-group-flush">
        {todos.map((todo, idx) => {return (
          <li className={`list-group-item position-relative ${todo.checked ? 'checked' : ''}`} key={idx}>
            <label className="form-check" style={{fontSize: '1.4rem'}} htmlFor={idx}>{idx+1}: <Link to={`/todos/${todo.id}`}>{todo.title} ({todo.created_at})</Link> <input checked={!!todo.checked} className="form-check-input" type="checkbox" id={idx} onChange={() => updateTodos(todo.id)} style={{
              float: 'none',
              marginLeft: 8,
              marginTop: 9,
              position: 'unset',
            }}/>
            <button className="delete btn btn-danger float-right" onClick={() => deleteTodos(todo.id)}>X</button>
            </label>
          </li>
        )})}
      </ul>
    </div>
  )
}