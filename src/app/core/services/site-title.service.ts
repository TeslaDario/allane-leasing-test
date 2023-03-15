import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SiteTitleService {
  private siteTitle$: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(private titleService: Title) {}

  setSiteTitle(title: string): void {
    this.titleService.setTitle(title);
    this.siteTitle$.next(title);
  }

  getSiteTitleObserver(): Observable<string> {
    return this.siteTitle$.asObservable();
  }
}
