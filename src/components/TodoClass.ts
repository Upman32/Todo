import { makeAutoObservable } from "mobx"
type TodoProps = { 
  filter: string
}

class TodoClass {
  todos = [
    { id: 1, title: "yesterday", completed: false },
    { id: 2, title: "today", completed: false },
    { id: 3, title: "after", completed: false }
  ]
  index=3
  filter="ALL"

  constructor() {
    makeAutoObservable(this)
  }

  sortTodo(boolean) {
    this.filter=boolean
  	let filtered_t=[]
	if(boolean==="ALL")
	{filtered_t =this.todos} else 
	{filtered_t =this.todos.filter(t => t.completed===boolean)}
	return filtered_t
  }
  addTodo(todo) {
    this.index = this.index + 1
    let newtitle = {
      id: this.index, title: todo, completed: false
    }
    this.todos.push(newtitle)
  }
  removeTodo(id) {
    this.todos = this.todos.filter(todo => todo.id !== id)
  }
  completeTodo(id) {
    this.todos = this.todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo)
  }

}
export default new TodoClass()