import { OnInit, OnDestroy, Component, Inject, ComponentRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TaskService} from '../services/task.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.less']
})
export class EditTaskComponent implements OnInit, OnDestroy {

  componentRef: ComponentRef<any>;
  public taskForm: FormGroup;
  isShow = false;

  constructor(
    private taskService: TaskService,
    public dialogRef: MatDialogRef<EditTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  hasError = ((controlName: string, errorName: string) => {
    return this.taskForm.controls[controlName].hasError(errorName);
  });

  ngOnInit() {
    this.isShow = this.data.name === 'Show';
    this.taskForm = new FormGroup({
      title: new FormControl(this.data.task.title ? this.data.task.title : '', [Validators.required]),
      dueDate: new FormControl(this.data.task.dueDate ? this.data.task.dueDate : new Date()),
      description: new FormControl(this.data.task.description ? this.data.task.description : '', [Validators.required])
    });
  }

  public onCancel() {
    this.dialogRef.close();
  }

  public save(taskFormValue) {
    if (this.taskForm.valid) {
      this.executeOwnerCreation(taskFormValue);
    }
  }

  private executeOwnerCreation(taskFormValue) {
    const task = {
      id: this.data.task.id || null,
      title: taskFormValue.title,
      description: taskFormValue.description,
      dateCreate: this.data.task.dateCreate || new Date(),
      dueDate: taskFormValue.dueDate
    };

    const obs = this.data.task.id ? this.taskService.updateTask(task) : this.taskService.saveTask(task);

    obs.subscribe(res => {
      this.dialogRef.close(res);
    });
  }

  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }
}
