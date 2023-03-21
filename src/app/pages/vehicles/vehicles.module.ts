import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { UiModule } from '@ngwebapp/ui';
import { VehicleFormComponent } from './vehicle-form.component';
import { VehiclesComponent } from './vehicles.component';

const routes: Routes = [
  { path: ':id', component: VehicleFormComponent },
  { path: '', component: VehiclesComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    UiModule,
    ReactiveFormsModule,
  ],
  exports: [],
  declarations: [VehiclesComponent, VehicleFormComponent],
  providers: [],
})
export class VehiclesModule {}
