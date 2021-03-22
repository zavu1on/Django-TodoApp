import { createContext, useReducer } from 'react'


const TodoContext = createContext()

const todoReducer = (state, action) => {
  switch (action.type) {
    case 'setTodos': return {...state, todos: action.todos}
    case 'updateTodo': return {
      ...state,
      todos: state.todos.map(t => {
        if (t.id === action.id) t.checked = ! t.checked
        return t
      })
    }
    case 'deleteTodo': return {
      ...state,
      todos: state.todos.filter(t => t.id !== action.id)
    }
    default: return state
  }
}

export const TodoProvider = ({children}) => {
  const [state, dispatch] = useReducer(todoReducer, {
    todos: []
  })

  const setTodos = todos => dispatch({type: 'setTodos', todos})
  const updateTodo = id => dispatch({type: 'updateTodo', id})
  const deleteTodo = id => dispatch({type: 'deleteTodo', id})

  return <TodoContext.Provider value={{
    todos: state.todos,
    setTodos,
    updateTodo,
    deleteTodo
  }}>{children}</TodoContext.Provider>
}

export default TodoContext

