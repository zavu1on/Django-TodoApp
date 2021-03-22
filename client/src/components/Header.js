import React from 'react'
import { Link } from 'react-router-dom'


export default function Header({page='todos'}) {
  return (
    <header>
      <nav className="navbar navbar-expand-md navbar-dark w-100 bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" style={{fontSize: '1.8rem'}} to="/">Todo List</Link>
          <button className="navbar-toggler collapsed" type="button" data-bs-toggle="collapse"
                  data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false"
                  aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"/>
          </button>
          <div className="navbar-collapse collapse " id="navbarCollapse">
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
              <li className="nav-item" style={{fontSize: '1.2rem', marginTop: 4}}>
                <Link className={`nav-link ${page === 'todos' ? 'active' : ''}`} to="/todos/">Todos</Link>
              </li>
              <li className="nav-item" style={{fontSize: '1.2rem', marginTop: 4}}>
                <Link className={`nav-link ${page === 'add' ? 'active' : ''}`} to="/addtodo/">Add Todo</Link>
              </li>
            </ul>
            <a href="/logout" className="btn btn-outline-danger" style={{fontSize: '1.2rem'}}>Logout</a>
          </div>
        </div>
      </nav>
    </header>
  )
}