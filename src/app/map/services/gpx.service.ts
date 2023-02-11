import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GpxService {
  private traks = new Map<string, string>();
  private marks = new Map<string, Map<string, string>>();

  constructor() {
    this.traks.set('track_1', '/assets/gpx/track_1.gpx');
    this.traks.set('track_2', '/assets/gpx/track_2.gpx');

    const tr2 = new Map<string, string>();
    tr2.set('trees', '/assets/gpx/markers/track_2_markers_trees.gpx');
    tr2.set('lakes', '/assets/gpx/markers/track_2_markers_lakes.gpx');

    this.marks.set('track_2', tr2);
  }

  trackByNumber(trackNumber: number) {
    return this.traks.get(`track_${trackNumber}`) || '';
  }

  maekersByTrack(trackNumber: number) {
    return this.marks.get(`track_${trackNumber}`) || new Map<string, string>();
  }
}
