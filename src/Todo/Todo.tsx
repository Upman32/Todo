import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import { Button, ButtonGroup } from 'react-bootstrap'
import todo from './todoClass'
import './Todo.scss';

const Todolist:React.FC = observer(() => {
  const [filteredtodos, setarrayTodos] = useState(todo.todos)
  let text = React.useRef<HTMLTextAreaElement>(null)

  let refreshprocess = () => {
    setarrayTodos(todo.todos)
    filterHandler(todo.filter)
  }

  let addHandler = () => {
    //@ts-ignore
    let newText = text.current.value
    todo.addTodo(newText)
    //@ts-ignore
    text.current.value = ''
    refreshprocess()
  }

  let filterHandler = (status: string | boolean) => {
    setarrayTodos(todo.sortTodo(status))
  }
  let completeHandler = (id: number) => {
    todo.completeTodo(id)
    refreshprocess()
  }
  let removeHandler = (id: number) => {
    todo.removeTodo(id)
    refreshprocess()
  }
  let filtered = filteredtodos.map(t =>
    <div className='todo_element' key={t.id}>
      <input type='checkbox' checked={t.completed} onChange={() => completeHandler(t.id)} />
      <div className='todo_text'>
        {t.title}
      </div>
      <div>
        <span className='delete_mark' onClick={() => removeHandler(t.id)}>X</span>
      </div>
    </div>)
    
  return (<div className='Todo'>
    <div className='todo_text'></div>
    <div className='adder'>
      <textarea className='input' ref={text} />
      <button className='adder_button' onClick={addHandler}>Add</button>
      <div className='filters'>
        <ButtonGroup>
          <Button className='filter' variant='secondary' onClick={() => filterHandler('ALL')}>All</Button>
          <Button className='filter_completed' variant='secondary' onClick={() => filterHandler(true)}>Completed</Button>
          <Button className='filter_notcompleted' variant='secondary' onClick={() => filterHandler(false)}>Not completed</Button>
        </ButtonGroup>
      </div>
    </div>
    <div className='todo_list'>
      {filtered}
    </div>
  </div>)
})
export default Todolist