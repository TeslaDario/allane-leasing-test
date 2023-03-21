import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {
  ContractOverview,
  ContractService,
  Customer,
  CustomerService,
  Vehicle,
  VehicleService,
} from '@ngwebapp/api';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe-decorator';
import { map, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-contract-create',
  templateUrl: 'contract-create.component.html',
})
export class ContractCreateComponent implements OnInit {
  monthlyRate!: number;
  customer!: number;
  vehicle!: number;
  customers: Customer[] = [];
  vehicles: Vehicle[] = [];

  @AutoUnsubscribe()
  private _destroyed$ = new Subject<void>();

  constructor(
    private customerService: CustomerService,
    private vehicheService: VehicleService,
    private contractService: ContractService,
    public dialogRef: MatDialogRef<ContractCreateComponent, ContractOverview>
  ) {}

  ngOnInit() {
    this.customerService
      .getAllCustomers({ page: 0, size: 100 })
      .pipe(
        takeUntil(this._destroyed$),
        map((c) => c.overviewItems)
      )
      .subscribe((items) => (this.customers = items ?? []));
    this.vehicheService
      .getAllVehicles({ page: 0, size: 100 })
      .pipe(
        takeUntil(this._destroyed$),
        map((v) => v.overviewItems)
      )
      .subscribe((items) => (this.vehicles = items ?? []));
  }

  onSubmit(event: Event) {
    event.preventDefault();

    if (!this.monthlyRate || !this.customer || !this.vehicle) {
      return;
    }

    // console.log(
    //   '',
    //   this.monthlyRate,
    //   '\n',
    //   this.customer,
    //   this.customers,
    //   '\n',
    //   this.vehicle,
    //   this.vehicles
    // );

    const customer: Customer = this.customers.find(
      (c) => (c.id = this.customer)
    ) as Customer;
    const vehicle: Vehicle = this.vehicles.find(
      (v) => (v.id = this.vehicle)
    ) as Vehicle;

    this.contractService
      .createContract({
        monthlyRate: this.monthlyRate,
        customer,
        vehicle,
      })
      .subscribe((res) => {
        this.dialogRef.close({
          contractId: res.id,
          monthlyRate: res.monthlyRate,
          customerId: res.customer.id,
          customerName: res.customer.firstName + ' ' + res.customer.lastName,
          vehicleId: res.vehicle.id,
          vehicleName:
            res.vehicle.brand +
            ' ' +
            res.vehicle.model +
            '(' +
            res.vehicle.modelYear +
            ')',
          vehiclePrice: res.vehicle.price,
          vin: res.vehicle.vin,
        });
      });
  }
}
