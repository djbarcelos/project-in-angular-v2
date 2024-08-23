import { Component, Input, OnInit } from '@angular/core';
import * as dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

import { Employee } from 'app/interface/Employee';
import { TypeNotification } from 'app/components/notification/notification.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  @Input() employeeList: Employee[];
 
  isModalOpen: boolean;

  type: TypeNotification;
  message: string;
  notificationVisible: boolean;

  years: number[] = [];
  selectedYear: number | string | void;

  constructor() { 
    this.isModalOpen = false;
    this.employeeList = [];
    this.selectedYear = null;
    this.notificationVisible = false;
  }

  ngOnInit() {

    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= 1900; year--) {
      this.years.push(year);
    }

    this.updateEmployeeList();
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  successNotification() {
    this.type = 'success';
    this.message = 'Concluído';
    this.notificationVisible = true;
    setTimeout(() => this.notificationVisible = false, 3000);
  }

  onChangeSelectYear() {
    this.updateEmployeeList();
  }

  async updateEmployeeList() {

    let patch = 'http://localhost:8080/employees';
    
    if(this.selectedYear !== null && this.selectedYear !== "all") {
      patch += `?year=${this.selectedYear}`;
    }
    
    const response = await fetch(patch, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    const result = await response.json();

    result.forEach(employee => {
      employee.hireDate = dayjs(new Date(employee.hireDate)).format('DD/MM/YYYY');
      const salaryNummber = parseFloat(employee.salary);
      employee.salary = salaryNummber.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    });

    result.sort((itemA: Employee, itemB: Employee) => itemA.name.localeCompare(itemB.name));
    
    this.employeeList = result;
  }
}
