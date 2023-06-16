import { Component }                  from '@angular/core';
import * as Leaflet                   from 'leaflet';
import { DragEndEvent, LeafletEvent } from 'leaflet'; // delete Leaflet.Icon.Default.prototype._getIconUrl;
import 'leaflet-routing-machine';
import 'leaflet-gpx';
import { GpxService }                 from './services/gpx.service';
import { MatDialog }                  from "@angular/material/dialog";
import { FilterComponent }            from "./components/filter/filter.component";
import { FilterService }              from "./services/filter.service";
import { environment }                from "../../environments/environment";
import { ActivatedRoute }             from "@angular/router"; // delete Leaflet.Icon.Default.prototype._getIconUrl;

// delete Leaflet.Icon.Default.prototype._getIconUrl;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent {
  map!: Leaflet.Map;
  currentTrack: Leaflet.GPX = Leaflet.GPX.prototype;
  currentMarkers = new Map<string, { gpxRef: Leaflet.GPX; inMap: boolean }>();
  currentStartPoint = Leaflet.latLng(0, 0);
  userPoint = Leaflet.latLng(0, 0);
  userMarker: Leaflet.Marker = new Leaflet.Marker<any>(
    this.userPoint
  );

  protected readonly environment = environment;
  private userDragged = false;

  constructor(protected gpxService: GpxService, public dialog: MatDialog,
              protected filterService: FilterService,
              private route: ActivatedRoute) {

    this.initializeComponent();


  }

  openFilters(): void {
    const dialogRef = this.dialog.open(FilterComponent, {
      data: { tile: 'asdasdasd', description: 'asdasdasd' },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.title = result;
    });
  }

  onMapReady($event: Leaflet.Map) {
    this.map = $event;
    //this.initMarkers();

    this.addMarkers();

    const trackId = this.route.snapshot.paramMap.get('trackId');
    if (trackId) {
      this.showTrack(trackId);
    }
    this.startNavigation();
  }

  startNavigation() {

    this.map.on('dragend', (event: DragEndEvent) => {
      this.userDragged = true;
    });

    this.userMarker = Leaflet.marker(this.currentStartPoint, {
      draggable: false,
    }).addTo(this.map);
    this.map.panTo(this.currentStartPoint);
  }

  recenter() {
    this.userDragged = false;
    this.map.panTo(this.currentStartPoint);
  }


  private updateNavigation() {
    this.userMarker.setLatLng(this.userPoint);
    if (!this.userDragged) {
      this.map.panTo(this.currentStartPoint);
    }

  }

  private showTrack(trackId: string) {
    const gpx = this.gpxService.trackByName(trackId);

    if (this.currentTrack) {
      this.currentTrack.remove();
    }

    this.currentTrack = new Leaflet.GPX(gpx, {
      async: true,
      marker_options: {
        startIconUrl: 'assets/pin-icon-start.png',
        endIconUrl: 'assets/pin-icon-end.png',
        shadowUrl: 'assets/pin-shadow.png',
        wptIconUrls: {
          '': 'assets/pin-icon-wpt.png',
        },
      },
    }).on('loaded', (event: LeafletEvent) => {
      this.map.fitBounds(event.target.getBounds());
    });
    this.currentTrack.addTo(this.map);


  }

  private initializeComponent() {
    Leaflet.Icon.Default.mergeOptions({
      iconRetinaUrl: 'assets/marker-icon-2x.png',
      iconUrl: 'assets/marker-icon.png',
      shadowUrl: 'assets/marker-shadow.png',
    });


    this.filterService.onFilterChange().subscribe((value) => {
      const markers = this.currentMarkers.get(value);
      const showInMap = !!this.filterService.selectedFilters.get(value);
      if (markers) {
        markers.inMap = showInMap;
        if (showInMap) {
          markers.gpxRef.addTo(this.map);
        } else {
          markers.gpxRef.remove();
        }
      }

    });
    this.setNavigator();
  }

  private setNavigator() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.currentStartPoint = Leaflet.latLng(
        position.coords.latitude,
        position.coords.longitude
      );
    });

    navigator.geolocation.watchPosition((position) => {
      this.userPoint = Leaflet.latLng(
        position.coords.latitude,
        position.coords.longitude
      );
      this.updateNavigation();
    });
  }

  private addMarkers() {

    const gpxMarkers = this.gpxService.selectedMarkers();
    gpxMarkers.forEach((value, key) => {
      const showInMap = !!this.filterService.selectedFilters.get(key);
      const gpxRef = {
        gpxRef: new Leaflet.GPX(value, {
          async: true,
          marker_options: {

            startIconUrl: 'assets/pin-icon-start.png',
            endIconUrl: 'assets/pin-icon-end.png',
            shadowUrl: 'assets/pin-shadow.png',
            wptIconUrls: {
              '': `assets/${key}-icon-wpt.png`,
            },


          },

        }),
        inMap: showInMap,
      };

      this.currentMarkers.set(key.toString(), gpxRef);
      if (showInMap) {
        gpxRef.gpxRef.addTo(this.map);
      }
    });
  }
}
