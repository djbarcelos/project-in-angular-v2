import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

import { Employee } from 'app/interface/Employee';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit {

  @Output() successNotification = new EventEmitter<void>();
  @Output() update = new EventEmitter<void>();
  @Input() employeeList: Employee[];
  
  id: string;
  selectedEmployee: null | Employee;
  isModalOpen: boolean;
  emptyList:boolean; 

  confirmVisible = false;

   constructor() { 
    this.isModalOpen = false;
  }

  ngOnInit() {
    dayjs.locale('pt-br');
  }

  selectRow(employee: Employee): void {
    this.selectedEmployee = this.selectedEmployee === employee ? null : employee;
    if(employee?.id) {
      this.id = employee.id
    }
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  updateEmployeeList() {
    this.update.emit();
  }

  _successNotification() {
    this.successNotification.emit();
  }

  alertConfirm() {
    this.confirmVisible = true;
  }

  onConfirm() {
    this.remove(this.id).then((a) => {
      this.successNotification.emit();
      this.update.emit();
      this.confirmVisible = false;
    });
  }

  onCancel() {
    this.confirmVisible = false;
  }

  async remove(id: string) {
    return await fetch('http://localhost:8080/employees/' + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }
}
