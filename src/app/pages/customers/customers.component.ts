import { Component, OnInit } from '@angular/core';
import { SiteTitleService } from '@ngwebapp/core';

@Component({
  selector: 'app-customers',
  templateUrl: 'customers.component.html',
})
export class CustomersComponent implements OnInit {
  constructor(private siteTitleService: SiteTitleService) {
    this.siteTitleService.setSiteTitle('Customers');
  }

  ngOnInit() {}
}
