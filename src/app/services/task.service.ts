import { Injectable } from '@angular/core';
import {AbstractService} from './abstract.service';
import {Observable} from 'rxjs';
import {Task} from '../models/Task.model';
import {delay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService extends AbstractService {

  getTasks(): Observable<Task[]> {
    return this.get().pipe(delay(1000));
  }

  saveTask(task: Task): Observable<boolean> {
    return this.post(task);
  }

  updateTask(task: Task): Observable<boolean> {
    return this.put(task);
  }

  deleteTask(id: number): Observable<boolean> {
    return this.delete(id);
  }

  changePosition(tasks: Task[]): Observable<boolean> {
    return this.postAll(tasks);
  }
}
