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

  private readonly DUE_COLOR = '#00BFFF';
  private readonly ERROR_COLOR = '#FF0000';
  color: string;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {

    const dueDate = new Date(this.task.dueDate);
    const newDate = new Date();

    const diffDate = dueDate - newDate;
    const threeDay = 3 * 24 * 60 * 60 * 1000;

    if (diffDate > 0 && diffDate <= threeDay) {
      this.color = this.DUE_COLOR;
    }

    if (diffDate < 0) {
      this.color = this.ERROR_COLOR;
    }
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
