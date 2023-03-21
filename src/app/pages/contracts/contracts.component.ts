import { Component, OnInit } from '@angular/core';
import { SiteTitleService } from '@ngwebapp/core';

@Component({
  selector: 'app-contracts',
  templateUrl: 'contracts.component.html',
})
export class ContractsComponent implements OnInit {
  constructor(private siteTitleService: SiteTitleService) {
    this.siteTitleService.setSiteTitle('Contracts');
  }

  ngOnInit() {}
}
