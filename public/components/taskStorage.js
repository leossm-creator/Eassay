export default class TaskStorage {
  constructor() {
    // if item by key `tasks` is not defined, is empty array
    this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  }

  // Creates a task and update the local storage
  create(item, name) {
    item.name = name;
    let index = this.getIndexByName(name);

    if (index === -1) {
      this.tasks.push(item);
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    } else {
      console.log("Task already exist in the list")
    }
  }

  getIndexByName(name) {
    for (let i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i].name == name) {
        return i;
      }
    }
    return -1;
  }

  update(name) {
    let index = this.getIndexByName(name);

    if (index !== -1) {
      this.tasks[index] = item;
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    } else {
      console.log("Task doesn't exist in the list")
    }
  }

  delete(name) {
    let index = this.getIndexByName(name);

    if (index !== -1) {
      this.tasks.splice(index, 1);
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    } else {
      console.log("Task doesn't exist in the list")
    }
  }
}