import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Brand,
  Model,
  ModelAndBrandService,
  Vehicle,
  VehicleService,
} from '@ngwebapp/api';
import { FormMode } from '@ngwebapp/ui';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe-decorator';
import { Observable, Subject, takeUntil, map } from 'rxjs';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: 'vehicle-form.component.html',
})
export class VehicleFormComponent {
  readonly minYear = 1900;
  readonly maxYear = new Date().getFullYear();
  mode: FormMode = 'new';
  form = new FormGroup({
    brand: new FormControl('', Validators.required),
    model: new FormControl('', Validators.required),
    year: new FormControl<number>(0, [
      Validators.required,
      Validators.min(1900),
      Validators.max(this.maxYear),
    ]),
    vin: new FormControl(''),
    price: new FormControl<number>(0, Validators.required),
  });

  get f() {
    return this.form.controls;
  }

  brands$: Observable<Brand[]> = this.modelAndBrandService.getBrands();
  models$!: Observable<Model[]>;

  private vehicleId!: number;

  @AutoUnsubscribe()
  private _destroyed$ = new Subject<void>();

  constructor(
    private vehicleService: VehicleService,
    private modelAndBrandService: ModelAndBrandService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id'] !== 'new') {
        this.mode = 'edit';
        this.vehicleId = params['id'];
        this.loadData();
      }
    });

    this.f.brand.valueChanges
      .pipe(
        takeUntil(this._destroyed$),
        map((e) => Number(e))
      )
      .subscribe((e) => this.onBrandChange(e));
  }

  compareFn(p1: string, p2: string): boolean {
    if (p1 && p2) return p1 == p2;
    return false;
  }

  close() {
    this.router.navigate(['vehicles']);
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }

    const vehicle: Vehicle = {
      brand: this.f.brand.value as string,
      model: this.f.model.value as string,
      modelYear: Number(this.f.year.value),
      vin: this.f.vin.value as string,
      price: Number(this.f.price.value),
    };

    if (this.vehicleId) this.update(vehicle);
    else this.create(vehicle);
  }

  private onBrandChange(id: number): void {
    if (id) {
      this.models$ = this.modelAndBrandService.getModelsByBrandId(id);
    }
    this.f.model.setValue('');
  }

  private loadData(): void {
    this.vehicleService
      .getVehicleForId(this.vehicleId)
      .pipe(takeUntil(this._destroyed$))
      .subscribe((vehicle) => {
        this.f.brand.setValue(vehicle.brand);
        this.f.model.setValue(vehicle.model);
        this.f.year.setValue(vehicle.modelYear);
        this.f.vin.setValue(vehicle.vin ?? '');
        this.f.price.setValue(vehicle.price);
      });
  }

  private update(vehicle: Vehicle): void {
    this.vehicleService
      .updateVehicle(this.vehicleId, vehicle)
      .pipe(takeUntil(this._destroyed$))
      .subscribe((res) => this.close());
  }

  private create(vehicle: Vehicle): void {
    this.vehicleService
      .createVehicle(vehicle)
      .pipe(takeUntil(this._destroyed$))
      .subscribe((res) => this.close());
  }
}
