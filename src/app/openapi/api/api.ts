export * from './contract.service';
import { ContractService } from './contract.service';
export * from './contractOverview.service';
import { ContractOverviewService } from './contractOverview.service';
export * from './customer.service';
import { CustomerService } from './customer.service';
export * from './modelAndBrand.service';
import { ModelAndBrandService } from './modelAndBrand.service';
export * from './vehicle.service';
import { VehicleService } from './vehicle.service';
export const APIS = [ContractService, ContractOverviewService, CustomerService, ModelAndBrandService, VehicleService];
