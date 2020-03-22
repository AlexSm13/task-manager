import {Directive, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {EditTaskComponent} from '../edit-task/edit-task.component';
import {MatDialog} from '@angular/material/dialog';
import {Task} from '../models/task.model';

@Directive({
  selector: '[appOpenDialog]'
})
export class OpenDialogDirective {

  @Input() task: Task = new Task();
  @Input() name: string;

  @Output() closeDialog = new EventEmitter();

  constructor(public dialog: MatDialog) {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(EditTaskComponent, {
      data: { name: this.name, task: this.task }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.closeDialog.emit();
    });
  }

  @HostListener('click') onClick() {
    this.openDialog();
  }
}
