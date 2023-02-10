import { Component, OnInit } from '@angular/core';
import * as Leaflet          from 'leaflet';
import { LeafletEvent }      from 'leaflet'; // delete Leaflet.Icon.Default.prototype._getIconUrl;
import 'leaflet-routing-machine';
import 'leaflet-gpx';
import { GpxService }        from './services/gpx.service';

// delete Leaflet.Icon.Default.prototype._getIconUrl;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  map!: Leaflet.Map;
  currentTrack: Leaflet.GPX = Leaflet.GPX.prototype;
  markers: Leaflet.Marker[] = [];

  currentStartPoint = Leaflet.latLng(0, 0);
  currentEndPoint = Leaflet.latLng(0, 0);

  currentMarkerPoint = Leaflet.latLng(0, 0);
  currentMarker: Leaflet.Marker = new Leaflet.Marker<any>(
    this.currentMarkerPoint
  );
  pathMarkers = [
    {
      position: { lat: 39.545631, lng: -8.715738 },
      draggable: true,
    },
    {
      position: { lat: 39.545631, lng: -8.714738 },
      draggable: false,
    },
    {
      position: { lat: 39.545631, lng: -8.713738 },
      draggable: true,
    },
  ];
  options = {
    layers: [
      Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }),
    ],
    zoom: 19,
    //center: { lat: 28.626137, lng: 79.821603 },
  };
  mapControl: Leaflet.Routing.Control = new Leaflet.Routing.Control({
    routeWhileDragging: true,
    showAlternatives: true,
  });

  constructor(protected gpxService: GpxService) {
    Leaflet.Icon.Default.mergeOptions({
      iconRetinaUrl: 'assets/marker-icon-2x.png',
      iconUrl: 'assets/marker-icon.png',
      shadowUrl: 'assets/marker-shadow.png',
    });
  }

  // latitude: 39.545631, longitude: -8.716738,

  initMarkers() {
    for (let index = 0; index < this.pathMarkers.length; index++) {
      const data = this.pathMarkers[index];
      const marker = this.generateMarker(data, index);
      marker
        .addTo(this.map)
        .bindPopup(`<b>${data.position.lat},  ${data.position.lng}</b>`);
      this.map.panTo(data.position);
      this.markers.push(marker);
    }
  }

  generateMarker(data: any, index: number) {
    return Leaflet.marker(data.position, { draggable: data.draggable })
      .on('click', (event) => this.markerClicked(event, index))
      .on('dragend', (event) => this.markerDragEnd(event, index));
  }

  onMapReady($event: Leaflet.Map) {
    this.map = $event;
    //this.initMarkers();
    this.startNavigation();
    //this.trackToMarker(0);
  }

  mapClicked($event: any) {
    console.log($event.latlng.lat, $event.latlng.lng);
  }

  markerClicked($event: any, index: number) {
    console.log($event.latlng.lat, $event.latlng.lng);
  }

  markerDragEnd($event: any, index: number) {
    console.log($event.target.getLatLng());
  }

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      this.currentStartPoint = Leaflet.latLng(
        position.coords.latitude,
        position.coords.longitude
      );
    });

    navigator.geolocation.watchPosition((position) => {
      this.currentMarkerPoint = Leaflet.latLng(
        position.coords.latitude,
        position.coords.longitude
      );
      this.updateNavigation();
    });
  }

  startNavigation() {
    /*this.mapControl.setWaypoints([
      Leaflet.latLng(this.currentStartPoint),
      Leaflet.latLng(this.currentEndPoint),
    ]);

    this.mapControl.addTo(this.map);
*/
    this.currentMarker = Leaflet.marker(this.currentStartPoint, {
      draggable: false,
    }).addTo(this.map);
  }

  endNavigation() {
    //  this.mapControl.remove();
    this.currentMarker.removeFrom(this.map);
  }

  updateNavigation() {
    this.currentMarker.setLatLng(this.currentMarkerPoint);
    this.map.panTo(this.currentStartPoint);
    /*if (Leaflet.Routing.control().getWaypoints().length > 0) {
      Leaflet.Routing.control().setWaypoints([
        Leaflet.latLng(this.currentStartPoint),
        Leaflet.latLng(this.currentEndPoint),
      ]);
    }*/
  }

  trackToMarker(markerIndex: number) {
    this.currentEndPoint = Leaflet.latLng(
      this.pathMarkers[markerIndex].position.lat,
      this.pathMarkers[markerIndex].position.lng
    );
    this.endNavigation();
    this.startNavigation();
  }

  showTrack(markerIndex: number) {
    const gpx = this.gpxService.trackByNumber(markerIndex);

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
}
