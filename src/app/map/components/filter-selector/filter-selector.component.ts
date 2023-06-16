import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-map-filter-selector',
  templateUrl: './filter-selector.component.html',
  styleUrls: ['./filter-selector.component.scss']
})
export class FilterSelectorComponent {
  @Input() name = '';
  @Output() change = new EventEmitter<string>();

  @Input() isChecked = false;


  onChange() {
    this.change.emit(this.name);
  }
}
