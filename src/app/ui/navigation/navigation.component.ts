import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface ILink {
  label: string;
  href: string;
  icon?: string;
  exact?: boolean;
}

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
})
export class NavigationComponent {
  @Input() links!: ILink[];
  @Output() linkClicked: EventEmitter<string> = new EventEmitter();

  onLinkClicked(label: string) {
    this.linkClicked.emit(label);
  }
}
