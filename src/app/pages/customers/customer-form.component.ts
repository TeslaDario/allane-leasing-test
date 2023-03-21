import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { Router, ActivatedRoute } from '@angular/router';
import { Customer, CustomerService } from '@ngwebapp/api';
import { FormMode } from '@ngwebapp/ui';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe-decorator';
import { Subject, takeUntil } from 'rxjs';
import { getFormatedDate } from './format-birthdate';

@Component({
  selector: 'app-customer-form',
  templateUrl: 'customer-form.component.html',
})
export class CustomerFormComponent {
  mode: FormMode = 'new';
  form = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    birthDate: new FormControl('', Validators.required),
  });

  get f() {
    return this.form.controls;
  }

  @ViewChild(MatDatepicker) matDatepicker!: MatDatepicker<Date>;

  private customerId!: number;

  @AutoUnsubscribe()
  private _destroyed$ = new Subject<void>();

  constructor(
    private customerService: CustomerService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id'] !== 'new') {
        this.mode = 'edit';
        this.customerId = params['id'];
        this.loadData();
      }
    });
  }

  close() {
    this.router.navigate(['customers']);
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }

    const customer: Customer = {
      firstName: this.f.firstName.value as string,
      lastName: this.f.lastName.value as string,
      birthDate: getFormatedDate(this.f.birthDate.value as string),
    };

    if (this.customerId) this.update(customer);
    else this.create(customer);
  }

  private loadData(): void {
    this.customerService
      .getCustomerForId(this.customerId)
      .pipe(takeUntil(this._destroyed$))
      .subscribe((customer) => {
        this.f.firstName.setValue(customer.firstName);
        this.f.lastName.setValue(customer.lastName);
        this.f.birthDate.setValue(new Date(customer.birthDate).toString());
        this.matDatepicker.select(new Date(customer.birthDate));
      });
  }

  private update(customer: Customer): void {
    this.customerService
      .updateCustomer(this.customerId, customer)
      .pipe(takeUntil(this._destroyed$))
      .subscribe((res) => this.close());
  }

  private create(customer: Customer): void {
    this.customerService
      .createCustomer(customer)
      .pipe(takeUntil(this._destroyed$))
      .subscribe((res) => this.close());
  }
}
