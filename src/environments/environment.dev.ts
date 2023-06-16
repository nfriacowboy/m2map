import * as Leaflet from "leaflet";

export const environment = {
  production: false,
  leafletOptions: {
    layers: [
      Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }),
    ],
    zoom: 19,
    //center: { lat: 28.626137, lng: 79.821603 },
  },
  filters: new Map<string, boolean>([
    ['trees', false],
    ['lakes', true],
    ['springs', true],
    ['others', true]
  ])
};
