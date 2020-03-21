import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Task} from '../../models/task.model';
import {TaskService} from '../../services/task.service';
import {EditTaskComponent} from '../../edit-task/edit-task.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.less']
})
export class TaskItemComponent implements OnInit {

  @Input() task: Task;
  fire: boolean;
  expire: boolean;
  name: string;

  @Output() action = new EventEmitter();

  constructor(private taskService: TaskService,
              public dialog: MatDialog) { }

  ngOnInit(): void {

    const dueDate = new Date(this.task.dueDate);
    this.fire = dueDate.getTime() <= new Date().setDate(new Date().getDate() + 3);
    this.expire = dueDate < new Date();
  }

  openDialog(task): void {
    const dialogRef = this.dialog.open(EditTaskComponent, {
      data: { name: this.name, task }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.taskService.updateTask(result.task).subscribe(res => {
          if (res) {
            this.action.emit();
          }
        });
      }
    });
  }

  edit(task) {
    this.name = 'Edit';
    this.openDialog(task);
  }

  deleted(id) {
    this.taskService.deleteTask(id).subscribe(res => {
      if (res) {
        this.action.emit();
      }
    });
  }
}
