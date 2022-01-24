import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import { Button, ButtonGroup } from 'react-bootstrap'
import todo from './components/TodoClass'
const Todoest = observer(() => {
  const [filteredtodos, setarrayTodos] = useState(todo.todos)
  let text = React.createRef()

  let addHandler = () => {
    let newText = text.current.value
    todo.addTodo(newText)
    text.current.value = ''
    setarrayTodos(todo.todos)
    filterHandler(todo.filter)
  }

  let filterHandler = (status) => {
    setarrayTodos(todo.sortTodo(status))
  }
  let completeHandler = (id) => {
    todo.completeTodo(id)
    setarrayTodos(todo.todos)
    filterHandler(todo.filter)
  }
  let removeHandler = (id) => {
    todo.removeTodo(id)
    setarrayTodos(todo.todos)
    filterHandler(todo.filter)
  }
let filtered = filteredtodos.map(t =><div key={t.id}>
  <input type="checkbox" checked={t.completed} onChange={() => completeHandler(t.id)} />
  {t.title}
  <button onClick={() => removeHandler(t.id)}>X</button>
</div>)
  return (<div>
    <div>
      <input type='text' ref={text} />
      <button onClick={addHandler}>Add</button>
      <div>
        <ButtonGroup>
          <Button variant='secondary' onClick={() => filterHandler('ALL')}>All</Button>
          <Button variant='secondary' onClick={() => filterHandler(true)}>Completed</Button>
          <Button variant='secondary' onClick={() => filterHandler(false)}>Not completed</Button>
        </ButtonGroup>
      </div>
    </div>
    {filtered}
  </div>)
})
export default Todoest