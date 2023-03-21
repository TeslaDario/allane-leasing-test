import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { UiModule } from '@ngwebapp/ui';
import { CustomerFormComponent } from './customer-form.component';

import { CustomersComponent } from './customers.component';

const routes: Routes = [
  { path: ':id', component: CustomerFormComponent },
  { path: '', component: CustomersComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    UiModule,
    ReactiveFormsModule,
  ],
  exports: [],
  declarations: [CustomersComponent, CustomerFormComponent],
  providers: [],
})
export class CustomersModule {}
