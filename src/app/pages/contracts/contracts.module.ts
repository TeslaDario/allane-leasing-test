import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { UiModule } from '@ngwebapp/ui';

import { ContractCreateComponent } from './contract-create.component';
import { ContractDetailsComponent } from './contract-details.component';
import { ContractsComponent } from './contracts.component';

const routes: Routes = [
  { path: ':id', component: ContractDetailsComponent },
  { path: '', component: ContractsComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    UiModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [],
  declarations: [
    ContractsComponent,
    ContractCreateComponent,
    ContractDetailsComponent,
  ],
  providers: [],
})
export class ContractsModule {}
