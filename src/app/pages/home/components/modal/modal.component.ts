import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Employee } from 'app/interface/Employee';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Output() successNotification = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();
  @Output() update = new EventEmitter<void>();
  @Input() title: string;
  @Input() employee: Employee;

  constructor() {
  }
  
  ngOnInit() {
  }

  closeModal() {
    this.close.emit();
  }
  
  updateEmployeeList() {
    this.update.emit();
  }

  _successNotification() {
    this.successNotification.emit();
  }
}
