import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-map-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Output() showFilters = new EventEmitter<string>();

  onFilterClick() {
    this.showFilters.emit('');
  }
}
