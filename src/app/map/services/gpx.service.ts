import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GpxService {
  private traks: string[] = [];

  constructor() {
    this.traks.push('/assets/gpx/track_1.gpx');
    this.traks.push('/assets/gpx/track_2.gpx');
  }

  trackByNumber(trackNumber: number) {
    return this.traks[trackNumber];
  }
}
