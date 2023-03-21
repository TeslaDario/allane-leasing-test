import { NgModule } from '@angular/core';

import { SidenavComponent } from './sidenav/sidenav.component';
import { NavigationComponent } from './navigation/navigation.component';

import { ToolbarComponent } from './toolbar/toolbar.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MaterialModule } from './material.module';
import { TableComponent } from './table/table.component';

@NgModule({
  imports: [RouterModule, CommonModule, MaterialModule],
  declarations: [
    SidenavComponent,
    NavigationComponent,
    ToolbarComponent,
    TableComponent,
  ],
  exports: [
    // Components
    SidenavComponent,
    NavigationComponent,
    ToolbarComponent,
    TableComponent,

    // Modules
    MaterialModule,
  ],
})
export class UiModule {}
