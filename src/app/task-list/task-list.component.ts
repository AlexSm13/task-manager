import { Component, OnInit } from '@angular/core';
import {TaskService} from '../services/task.service';
import {Task} from '../models/task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.less']
})
export class TaskListComponent implements OnInit {

  constructor(private taskService: TaskService) { }
  tasks: Task[] = [];

  ngOnInit(): void {
    this.taskService.getTasks().subscribe(res => {
      this.tasks = res;
    });
  }

  create() {

  }

  edit(task) {

  }

  deleted(id) {

  }
}
