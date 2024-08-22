import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent {
  @Input() message: string = '';
  @Input() visible: boolean = false;
  @Output() confirmed = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  cancel() {
    this.visible = false;
    this.cancelled.emit();
  }

  confirm() {
    this.visible = false;
    this.confirmed.emit();
  }
}
