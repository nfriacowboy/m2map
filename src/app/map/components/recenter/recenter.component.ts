import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-map-recenter',
  templateUrl: './recenter.component.html',
  styleUrls: ['./recenter.component.scss']
})
export class RecenterComponent {
  @Output() recenter = new EventEmitter<string>();

  onRecenterClick() {
    this.recenter.emit('');
  }

}
