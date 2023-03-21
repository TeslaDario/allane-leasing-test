import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contract, ContractService } from '@ngwebapp/api';
import { SiteTitleService } from '@ngwebapp/core';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe-decorator';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-contract-details',
  templateUrl: 'contract-details.component.html',
  styles: [
    `
      .detail {
        display: flex;
        flex-direction: row;
        align-items: flex-start;

        strong {
          min-width: 120px;
        }
      }
    `,
  ],
})
export class ContractDetailsComponent {
  contract!: Contract;
  editedContract!: Contract;
  loading = false;

  @AutoUnsubscribe()
  private _destroyed$ = new Subject<void>();

  constructor(
    private siteTitleService: SiteTitleService,
    private contractService: ContractService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.siteTitleService.setSiteTitle(`Contract no: `);

    this.activatedRoute.params.subscribe((params) => {
      const id = params['id'];
      this.loadData(id);
      this.siteTitleService.setSiteTitle(`Contract no: ${id}`);
    });
  }

  hasDifferences(): boolean {
    return this.contract.monthlyRate !== this.editedContract.monthlyRate;
  }

  openVehicle(id: number) {
    this.router.navigate(['vehicles', id]);
  }

  update(): void {
    const updatedContract: Contract = {
      ...this.contract,
      monthlyRate: this.editedContract.monthlyRate,
    };

    this.contractService
      .updateContract(<number>this.contract.id, updatedContract)
      .pipe(takeUntil(this._destroyed$))
      .subscribe({
        next: () => this.router.navigateByUrl('contracts'),
        error: (err) => console.error(err),
      });
  }

  private loadData(id: number): void {
    this.loading = true;
    this.contractService
      .getContractForId(id)
      .pipe(takeUntil(this._destroyed$))
      .subscribe({
        next: (contract: Contract) => {
          this.contract = contract;
          this.editedContract = { ...contract };
        },
        error: (err) => this.router.navigateByUrl('contracts'),
        complete: () => (this.loading = false),
      });
  }
}
