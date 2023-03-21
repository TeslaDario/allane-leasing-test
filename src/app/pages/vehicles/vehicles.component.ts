import { Component, OnInit } from '@angular/core';
import { SiteTitleService } from '@ngwebapp/core';

@Component({
  selector: 'app-vehicles',
  templateUrl: 'vehicles.component.html',
})
export class VehiclesComponent implements OnInit {
  constructor(private siteTitleService: SiteTitleService) {
    this.siteTitleService.setSiteTitle('Vehicles');
  }

  ngOnInit() {}
}
