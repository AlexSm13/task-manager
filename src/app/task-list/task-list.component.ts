import { Component, OnInit } from '@angular/core';
import {TaskService} from '../services/task.service';
import {Task} from '../models/task.model';
import {MatDialog} from '@angular/material/dialog';
import {EditTaskComponent} from '../edit-task/edit-task.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.less']
})
export class TaskListComponent implements OnInit {

  constructor(private taskService: TaskService,
              public dialog: MatDialog) { }
  tasks: Task[] = [];

  name: string;

  loadTask = (() => {

    this.taskService.getTasks().subscribe(res => {
      this.tasks = res;
    });
  });

  ngOnInit(): void {
    this.loadTask();
  }

  openDialog(task): void {
    const dialogRef = this.dialog.open(EditTaskComponent, {
      data: { name: this.name, task }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        result.task.dateCreate = new Date();
        result.task.id = this.tasks.length + 1;
        this.taskService.saveTask(result.task).subscribe(res => {
          if (res) {
            this.loadTask();
          }
        });
      }
    });
  }

  create() {
    this.name = 'Create';
    this.openDialog(new Task());
  }
}
