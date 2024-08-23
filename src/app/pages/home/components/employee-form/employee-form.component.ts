import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

import { Employee } from 'app/interface/Employee';
import { TypeNotification } from 'app/components/notification/notification.component';

interface EmployeeProps {
  name: string;
  cpf: string;
  hireDate: Date;
  workFunction: string;
  salary: number;
  managerId?: string;
  listManaged?;
  subordinates?;
}

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {

  @Output() successNotification = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();
  @Output() updateEmployeeList = new EventEmitter<void>();
  @Input() employee: Employee;

  type: TypeNotification;
  message: string;
  notificationVisible: boolean;

  id: string | null;
  name: string;
  cpf: string;
  hireDate: string;
  workFunction: string;
  salary: string;
  managerId: string | null;

  allEmployees: Employee[];
  selectedItems: any[];
  options;


  cpfMask = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
  dateMask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];

  constructor() { 
    this.notificationVisible = false;
    this.selectedItems = [];
    this.options = [];
    this.managerId = null;
  }

  ngOnInit() {
    dayjs.locale('pt-br');
    this.getEmployeeList();

    if(this.employee) {
      const { name, cpf, hireDate, workFunction, salary, managerId, subordinates } = this.employee;
      
      this.id = this.employee?.id;
      this.name = name;
      this.cpf = cpf;
      this.hireDate = hireDate;
      this.workFunction = workFunction;
      this.salary = salary;
      this.managerId = managerId;
      this.selectedItems = [...subordinates.map(item => item.id)]
    }
  }
  
  get getFormattedDate(): Date {
    if (this.hireDate) {
      const [day, month, year] = this.hireDate.split('/').map(Number);
      return new Date(year, month - 1, day);
    }
    return null;
  }

  get getFormatSalary(): string {
   return Number(this.salary || 0 ).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  get parserSalary(): number {

    let value = this.salary.replace('R$', '').trim();
    
    value = value.replace(/\./g, '').replace(',', '.');

    const number = parseFloat(value);

    return isNaN(number)? 0: number;
  }
 
  onSubmit(form): void {
    if(form.valid) {
      const employee: EmployeeProps = {
        name: this.name,
        cpf: this.cpf,
        hireDate: this.getFormattedDate,
        workFunction: this.workFunction,
        salary: this.parserSalary,
        managerId: this.managerId == "null" ? null : this.managerId,
        listManaged: this.selectedItems || []
      }

      if(this.id) {
        this.update(employee)
        .then(() => {
          this.successNotification.emit();
          this.updateEmployeeList.emit();
          this.close.emit();
        });
      } else {
        this.save(employee)
        .then(() => {
          this.successNotification.emit();
          this.updateEmployeeList.emit();
          this.close.emit();
        });
      } 
    } else {
      this.errorNotification();
    }
  }
  
  onInputDate(): void {
    const [day, month, year] = this.hireDate.split('/').map(Number);

    if (!isNaN(day) && day < 1 || day > 31) {
      this.hireDate = '';
      return 
    }
    
    if (!isNaN(month) && month < 1 || month > 12) {
      this.hireDate = day + '/';
      return 
    }
    
    if (!isNaN(year) && year < 1900 || year > new Date().getFullYear()) {
      this.hireDate = day + '/' + month + '/';
      return
    }

    const date = new Date(year, month - 1, day);
    if (date.getDate() !== day || date.getMonth() !== month - 1 || date.getFullYear() !== year) {
      this.hireDate = '';
    }
    
  }

  onBlurSalary(): void{
    this.salary = this.parserSalary.toString();
    this.salary = this.getFormatSalary;
  }

  errorNotification() {
    this.type = 'error';
    this.message = 'O preenchimento de todos os campos é obrigatório.';
    this.notificationVisible = true;
    setTimeout(() => this.notificationVisible = false, 3000);
  }

  onSelectionChange(selectedOptions: string[]) {
    this.selectedItems = selectedOptions;
  }

  async save(employee: EmployeeProps) {
    return await fetch('http://localhost:8080/employees', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employee)
    });
  }
  
  async update(employee: EmployeeProps) {
    return await fetch('http://localhost:8080/employees/' + this.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employee)
    });
  }

  async getEmployeeList() {
    
    const response = await fetch('http://localhost:8080/employees', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    const result = await response.json();

    result.sort((itemA: Employee, itemB: Employee) => itemA.name.localeCompare(itemB.name));
    
    this.allEmployees = result
    .filter(item => this.id || this.employee?.managerId ? (this.id != item.id ) && (this.id != this.employee?.managerId ) : item);

    this.options = result
    .filter(item => this.id ? (this.id != item.id ) : item)
    .map(item => {return {id: item.id, value: item.name }});
    
  }
}
