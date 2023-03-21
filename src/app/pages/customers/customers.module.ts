import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UiModule } from '@ngwebapp/ui';

import { CustomersComponent } from './customers.component';

const routes = [{ path: '', component: CustomersComponent }];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), UiModule],
  exports: [],
  declarations: [CustomersComponent],
  providers: [],
})
export class CustomersModule {}
