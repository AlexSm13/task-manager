import { Component, OnInit } from '@angular/core';
import {TaskService} from '../services/task.service';
import {Task} from '../models/task.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.less']
})
export class TaskListComponent implements OnInit {

  tasks: Task[] = [];
  state: 'empty' | 'tasks' | 'load' = 'load';

  constructor(private taskService: TaskService) { }

  loadTask = (() => {
    this.state = 'load';
    this.taskService.getTasks().subscribe(res => {
      if (res.length) {
        this.state = 'tasks';
        this.tasks = res;
      } else {
        this.state = 'empty';
      }
    }, error => {
      console.log('something was wrong', error);
    });
  });

  ngOnInit(): void {
    this.loadTask();
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
    this.taskService.changePosition(this.tasks);
  }
}
