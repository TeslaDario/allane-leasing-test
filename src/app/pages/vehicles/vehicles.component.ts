import { Component, OnInit } from '@angular/core';
import { Vehicle, VehicleService } from '@ngwebapp/api';
import { SiteTitleService } from '@ngwebapp/core';
import { Subject, takeUntil } from 'rxjs';
import {
  ConfirmDialogComponent,
  ConfirmDialogData,
  ConfirmDialogResult,
  TableData,
} from '@ngwebapp/ui';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe-decorator';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-vehicles',
  templateUrl: 'vehicles.component.html',
})
export class VehiclesComponent implements OnInit {
  tableData: TableData<Vehicle> = {
    data: [],
    page: 0,
    size: 10,
    total: 0,
  };

  loading = false;

  @AutoUnsubscribe()
  private _destroyed$ = new Subject<void>();

  constructor(
    private vehicleService: VehicleService,
    private siteTitleService: SiteTitleService,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.siteTitleService.setSiteTitle('Vehicles');
  }

  ngOnInit() {
    this.loadData();
  }

  handlePageEvent(e: PageEvent) {
    this.tableData.page = e.pageIndex;
    this.tableData.size = e.pageSize;
    this.tableData.total = e.length;
    this.loadData();
  }

  handleRowClick({ id }: { id: number }): void {
    this.router.navigate(['vehicles', id]);
  }

  handleRowDelete({ id }: { id: number }): void {
    const dialogRef = this.dialog.open<
      ConfirmDialogComponent,
      ConfirmDialogData,
      ConfirmDialogResult
    >(ConfirmDialogComponent, {
      data: {
        title: 'Delete',
        content: 'Are you sure you want to delete this item?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirm')
        this.vehicleService
          .deleteVehicle(id)
          .pipe(takeUntil(this._destroyed$))
          .subscribe(() => {
            this.tableData.data = this.tableData.data?.filter(
              (d) => d.id !== id
            );
          });
    });
  }

  private loadData(): void {
    this.loading = true;

    this.vehicleService
      .getAllVehicles({
        page: this.tableData.page,
        size: this.tableData.size,
        sort: 'UNSORTED',
      })
      .pipe(takeUntil(this._destroyed$))
      .subscribe({
        next: ({ numberOfItems, overviewItems }) => {
          this.tableData.data = overviewItems;
          this.tableData.total = numberOfItems;
        },
        error: (err) => console.error(err),
        complete: () => (this.loading = false),
      });
  }
}
