import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { TextMaskModule } from 'angular2-text-mask';

import { HomeComponent } from './pages/home/home.component';
import { EmployeesListComponent } from './pages/home/components/employees-list/employees-list.component';
import { ModalComponent } from './pages/home/components/modal/modal.component';
import { EmployeeFormComponent } from './pages/home/components/employee-form/employee-form.component';
import { NotificationComponent } from './components/notification/notification.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { MultiSelectComponent } from './components/multi-select/multi-select.component';

@NgModule({
  declarations: [
    HomeComponent,
    EmployeesListComponent,
    ModalComponent,
    EmployeeFormComponent,
    NotificationComponent,
    ConfirmComponent,
    MultiSelectComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    TextMaskModule
  ],
  bootstrap: [HomeComponent],
})
export class AppModule { }
