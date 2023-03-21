import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Customer, CustomerService, ErrorResponse } from '@ngwebapp/api';
import { SiteTitleService } from '@ngwebapp/core';
import {
  ConfirmDialogComponent,
  ConfirmDialogData,
  ConfirmDialogResult,
  TableData,
} from '@ngwebapp/ui';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe-decorator';
import { Subject, takeUntil } from 'rxjs';
import { formatBirthDate } from './format-birthdate';

@Component({
  selector: 'app-customers',
  templateUrl: 'customers.component.html',
})
export class CustomersComponent implements OnInit {
  tableData: TableData<Customer> = {
    data: [],
    page: 0,
    size: 10,
    total: 0,
  };

  loading = false;

  @AutoUnsubscribe()
  private _destroyed$ = new Subject<void>();

  constructor(
    private customerService: CustomerService,
    private siteTitleService: SiteTitleService,
    private router: Router,
    private dialog: MatDialog,
    private snackbar: MatSnackBar
  ) {
    this.siteTitleService.setSiteTitle('Customers');
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
    this.router.navigate(['customers', id]);
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
        this.customerService
          .deleteCustomer(id)
          .pipe(takeUntil(this._destroyed$))
          .subscribe({
            next: () =>
              (this.tableData.data = this.tableData.data?.filter(
                (d) => d.id !== id
              )),
            error: ({ error }: { error: ErrorResponse }) =>
              this.snackbar.open(
                `Status: ${error.status}! Message:  ${error.error}`,
                'OK',
                {
                  duration: 7000,
                  verticalPosition: 'top',
                  horizontalPosition: 'center',
                }
              ),
          });
    });
  }

  private loadData(): void {
    this.loading = true;

    this.customerService
      .getAllCustomers({
        page: this.tableData.page,
        size: this.tableData.size,
        sort: 'UNSORTED',
      })
      .pipe(takeUntil(this._destroyed$))
      .subscribe({
        next: ({ numberOfItems, overviewItems }) => {
          this.tableData.data = overviewItems?.map((item) => ({
            ...item,
            birthDate: formatBirthDate(item.birthDate),
          }));
          this.tableData.total = numberOfItems;
        },
        error: (err) => console.error(err),
        complete: () => (this.loading = false),
      });
  }
}
