import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { MainComponent } from './main.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'customers',
        loadChildren: () =>
          import('../pages/customers/customers.module').then(
            (m) => m.CustomersModule
          ),
      },
      {
        path: 'vehicles',
        loadChildren: () =>
          import('../pages/vehicles/vehicles.module').then(
            (m) => m.VehiclesModule
          ),
      },
      {
        path: 'contracts',
        loadChildren: () =>
          import('../pages/contracts/contracts.module').then(
            (m) => m.ContractsModule
          ),
      },
      { path: '**', redirectTo: '/contracts' },
    ],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
