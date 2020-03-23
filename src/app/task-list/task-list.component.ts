import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {TaskService} from '../services/task.service';
import {Task} from '../models/task.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListComponent implements OnInit, OnDestroy {

  unSubscriber$: Subject<any> = new Subject();

  tasks: Task[] = [];
  state: 'empty' | 'tasks' | 'load' = 'load';

  constructor(private taskService: TaskService, private changeDetection: ChangeDetectorRef) { }

  loadTask = (() => {
    this.state = 'load';
    this.taskService.getTasks().pipe(takeUntil(this.unSubscriber$)).subscribe(res => {
      if (res.length) {
        this.state = 'tasks';
        this.tasks = res;
      } else {
        this.state = 'empty';
      }
      this.changeDetection.markForCheck();
    }, error => {
      console.log('something was wrong', error);
    });
  });

  ngOnInit(): void {
    this.loadTask();
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
    this.taskService.changePosition(this.tasks).subscribe();
  }

  ngOnDestroy(): void {
    this.unSubscriber$.next();
    this.unSubscriber$.complete();
  }
}
