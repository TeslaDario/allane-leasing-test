import { Component, OnInit } from '@angular/core';
import { SiteTitleService } from '@ngwebapp/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
})
export class HomeComponent implements OnInit {
  constructor(private siteTitleService: SiteTitleService) {
    this.siteTitleService.setSiteTitle('Home');
  }

  ngOnInit() {}
}
