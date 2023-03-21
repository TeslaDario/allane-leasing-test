import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UiModule } from '@ngwebapp/ui';

import { VehiclesComponent } from './vehicles.component';

const routes: Routes = [{ path: '', component: VehiclesComponent }];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), UiModule],
  exports: [],
  declarations: [VehiclesComponent],
  providers: [],
})
export class VehiclesModule {}
