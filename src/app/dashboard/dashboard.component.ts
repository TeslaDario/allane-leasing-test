import { Component, OnInit } from '@angular/core';
import { SiteTitleService } from '@ngwebapp/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  constructor(private siteTitleService: SiteTitleService) {
    this.siteTitleService.setSiteTitle('Dashboard');
  }

  ngOnInit() {}
}
