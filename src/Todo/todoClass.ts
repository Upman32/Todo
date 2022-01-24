import { makeAutoObservable } from "mobx"

type Todotype = {
  id: number, title: string, completed: boolean
}

class TodoClass {
  todos = [
    { id: 1, title: "Dinner", completed: false },
    { id: 2, title: "Homework", completed: false },
    { id: 3, title: "Garden", completed: false }
  ] as Array<Todotype>
  index = 3 as number
  filter = "ALL" as string | boolean

  constructor() {
    makeAutoObservable(this)
  }

  sortTodo(filter: string | boolean) {
    this.filter = filter
    let filtered_todos = []
    if (filter === "ALL") 
    { filtered_todos = this.todos } 
    else
     { filtered_todos = this.todos.filter(t => t.completed === filter) }
    return filtered_todos
  }
  addTodo(todo: string) {
    this.index = this.index + 1
    let newtitle = {
      id: this.index, title: todo, completed: false
    }
    this.todos.push(newtitle)
  }
  removeTodo(id: number) {
    this.todos = this.todos.filter(todo => todo.id !== id)
  }
  completeTodo(id: number) {
    this.todos = this.todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo)
  }

}
export default new TodoClass()