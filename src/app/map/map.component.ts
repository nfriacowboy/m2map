import { Component, OnInit } from '@angular/core';
import * as Leaflet          from 'leaflet';
import 'leaflet-routing-machine';

// delete Leaflet.Icon.Default.prototype._getIconUrl;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  map!: Leaflet.Map;
  markers: Leaflet.Marker[] = [];
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

  constructor() {
    Leaflet.Icon.Default.mergeOptions({
      iconRetinaUrl: 'assets/marker-icon-2x.png',
      iconUrl: 'assets/marker-icon.png',
      shadowUrl: 'assets/marker-shadow.png',
    });
  }

  initMarkers() {
    const initialMarkers = [
      {
        position: { lat: 28.625485, lng: 79.821091 },
        draggable: true,
      },
      {
        position: { lat: 28.625293, lng: 79.817926 },
        draggable: false,
      },
      {
        position: { lat: 28.625182, lng: 79.81464 },
        draggable: true,
      },
    ];
    for (let index = 0; index < initialMarkers.length; index++) {
      const data = initialMarkers[index];
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
    this.initMarkers();
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
      console.log(position);
      const currentLatLng = Leaflet.latLng(
        position.coords.latitude,
        position.coords.longitude
      );

      // Define the start and end points of the route
      const startPoint = currentLatLng;
      const endPoint = Leaflet.latLng(39.535, -8.71);

      // Use the routing API to calculate the route between the points
      Leaflet.Routing.control({
        waypoints: [Leaflet.latLng(startPoint), Leaflet.latLng(endPoint)],
        routeWhileDragging: true,
      }).addTo(this.map);
    });
  }
}
