import { Injectable }    from '@angular/core';
import { FilterService } from "./filter.service";

@Injectable({
  providedIn: 'root',
})
export class GpxService {
  private traks = new Map<string, string>();
  private marks = new Map<string, string>();

  constructor(private filters: FilterService) {
    this.traks.set('track_1', '/assets/gpx/tracks/track_1.gpx');
    this.traks.set('track_2', '/assets/gpx/tracks/track_2.gpx');


    this.marks.set('trees', '/assets/gpx/markers/trees.gpx');
    this.marks.set('lakes', '/assets/gpx/markers/lakes.gpx');
    this.marks.set('springs', '/assets/gpx/markers/springs.gpx');
    this.marks.set('others', '/assets/gpx/markers/others.gpx')
  }

  trackByName(name: string) {
    return this.traks.get(name) || '';
  }

  markersByName(name: string) {
    return this.marks.get(name) || '';
  }

  selectedMarkers() {
    return this.marks;
  }
}
