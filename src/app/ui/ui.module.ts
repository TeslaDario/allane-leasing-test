import { NgModule } from '@angular/core';

import { SidenavComponent } from './sidenav/sidenav.component';
import { NavigationComponent } from './navigation/navigation.component';

import { ToolbarComponent } from './toolbar/toolbar.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MaterialModule } from './material.module';

@NgModule({
  imports: [RouterModule, CommonModule, MaterialModule],
  declarations: [SidenavComponent, NavigationComponent, ToolbarComponent],
  exports: [
    // Components
    SidenavComponent,
    NavigationComponent,
    ToolbarComponent,

    // Modules
    MaterialModule,
  ],
})
export class UiModule {}
