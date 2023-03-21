import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UiModule } from '@ngwebapp/ui';

import { ContractsComponent } from './contracts.component';

const routes = [{ path: '', component: ContractsComponent }];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), UiModule],
  exports: [],
  declarations: [ContractsComponent],
  providers: [],
})
export class ContractsModule {}
