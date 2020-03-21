import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Task} from '../../models/task.model';
import {TaskService} from '../../services/task.service';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.less']
})
export class TaskItemComponent implements OnInit {

  @Input() task: Task;
  fire: boolean;
  expire: boolean;

  @Output() action = new EventEmitter();

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {

    const dueDate = new Date(this.task.dueDate);
    this.fire = dueDate.getTime() <= new Date().setDate(new Date().getDate() + 3);
    this.expire = dueDate < new Date();
  }

  edit(task) {

  }

  deleted(id) {
    this.taskService.deleteTask(id).subscribe(res => {
      if (res) {
        this.action.emit();
      }
    });
  }
}
