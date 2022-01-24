import { makeAutoObservable } from "mobx"

class Counter {
  count = 9
constructor() {
  makeAutoObservable(this)
}
increment() {
  this.count = this.count + 1
}
decrement() {
  this.count = this.count - 1
}
}
export default new Counter()