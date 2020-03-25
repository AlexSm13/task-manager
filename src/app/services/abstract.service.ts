import { Injectable } from '@angular/core';
import {of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AbstractService {

  constructor() {
  }

  private key = 'tasks';

  getElements() {
    return JSON.parse(localStorage.getItem(this.key)) || [];
  }

  saveElements(tasks) {
    localStorage.setItem(this.key, JSON.stringify(tasks));
  }

  protected get() {
    return of(this.getElements());
  }

  protected post(newTask) {

    const tasks = this.getElements();
    newTask.id = tasks.length ? tasks.reduce((task, current) => task.id > current.id ? task : current).id + 1 : 1;
    tasks.push(newTask);
    this.saveElements(tasks);

    return of(true);
  }

  protected postAll(tasks) {

    this.saveElements(tasks);

    return of(true);
  }

  protected put(updateTask) {

    let tasks = this.getElements();

    tasks = tasks.map(task => {
      if (task.id === updateTask.id) {
        task = updateTask;
      }

      return task;
    });

    this.saveElements(tasks);

    return of(true);
  }

  protected delete(id) {

    let tasks = this.getElements();

    tasks = tasks.filter(task => {
      return task.id !== id;
    });

    this.saveElements(tasks);

    return of(true);
  }

  public removeAll() {
    localStorage.removeItem(this.key);
  }
}
