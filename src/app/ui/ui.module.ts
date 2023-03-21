import { NgModule } from '@angular/core';

import { SidenavComponent } from './sidenav/sidenav.component';
import { NavigationComponent } from './navigation/navigation.component';

import { ToolbarComponent } from './toolbar/toolbar.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MaterialModule } from './material.module';
import { TableComponent } from './table/table.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { CapSplitPipe } from './pipes/cap-split.pipe';

@NgModule({
  imports: [RouterModule, CommonModule, MaterialModule],
  declarations: [
    SidenavComponent,
    NavigationComponent,
    ToolbarComponent,
    TableComponent,
    ConfirmDialogComponent,

    CapSplitPipe,
  ],
  exports: [
    // Components
    SidenavComponent,
    NavigationComponent,
    ToolbarComponent,
    TableComponent,
    ConfirmDialogComponent,

    // pipes
    CapSplitPipe,

    // Modules
    MaterialModule,
  ],
})
export class UiModule {}
