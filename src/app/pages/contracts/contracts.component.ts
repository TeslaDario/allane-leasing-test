import { Component, OnInit } from '@angular/core';
import { SiteTitleService } from '@ngwebapp/core';
import {
  ContractOverviewService,
  ContractOverview,
  ContractService,
  ErrorResponse,
} from '@ngwebapp/api';
import { Subject, takeUntil } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import {
  ConfirmDialogComponent,
  ConfirmDialogData,
  ConfirmDialogResult,
  TableData,
} from '@ngwebapp/ui';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe-decorator';
import { MatDialog } from '@angular/material/dialog';
import { ContractCreateComponent } from './contract-create.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contracts',
  templateUrl: 'contracts.component.html',
})
export class ContractsComponent implements OnInit {
  tableData: TableData<ContractOverview> = {
    data: [],
    page: 0,
    size: 10,
    total: 0,
  };

  loading = false;

  @AutoUnsubscribe()
  private _destroyed$ = new Subject<void>();

  constructor(
    private contractOverviewService: ContractOverviewService,
    private contractService: ContractService,
    private siteTitleService: SiteTitleService,
    private router: Router,
    private dialog: MatDialog,
    private snackbar: MatSnackBar
  ) {
    this.siteTitleService.setSiteTitle('Contracts');
  }

  ngOnInit() {
    this.loadData();
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open<
      ContractCreateComponent,
      any,
      ContractOverview
    >(ContractCreateComponent);
    dialogRef
      .afterClosed()
      .subscribe((newContract: ContractOverview | undefined) => {
        if (newContract && newContract.contractId)
          this.tableData.data = [...(this.tableData.data ?? []), newContract];
      });
  }

  handlePageEvent(e: PageEvent) {
    this.tableData.page = e.pageIndex;
    this.tableData.size = e.pageSize;
    this.tableData.total = e.length;
    this.loadData();
  }

  handleRowClick({ contractId }: { contractId: number }): void {
    this.router.navigate(['contracts', contractId]);
  }

  handleRowDelete({ contractId }: { contractId: number }): void {
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
        this.contractService
          .deleteContract(contractId)
          .pipe(takeUntil(this._destroyed$))
          .subscribe({
            next: () => {
              this.tableData.data = this.tableData.data?.filter(
                (d) => d.contractId !== contractId
              );
            },
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

    this.contractOverviewService
      .getContractOveriew({
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
