import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Task} from '../../models/task.model';
import {TaskService} from '../../services/task.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.less']
})
export class TaskItemComponent implements OnInit, OnDestroy {

  unSubscriber$: Subject<any> = new Subject();

  @Input() task: Task;
  @Output() action = new EventEmitter();

  fire: boolean;
  expire: boolean;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {

    const dueDate = new Date(this.task.dueDate);
    this.fire = dueDate.getTime() <= new Date().setDate(new Date().getDate() + 3);
    this.expire = dueDate < new Date();
  }

  closeDialog() {
    this.action.emit();
  }

  deleted(id) {
    this.taskService.deleteTask(id).pipe(takeUntil(this.unSubscriber$)).subscribe(res => {
      if (res) {
        this.action.emit();
      }
    });
  }

  ngOnDestroy(): void {
    this.unSubscriber$.next();
    this.unSubscriber$.complete();
  }
}
