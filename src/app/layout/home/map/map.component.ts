import { Component, AfterViewInit } from '@angular/core';
import { Geolocation, Position } from '@capacitor/geolocation';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  standalone: true,
  styleUrls: ['./map.component.scss'],
})

export class MapComponent implements AfterViewInit {
map: L.Map = {} as L.Map;

  constructor() { }

  ngAfterViewInit(): void {
    this.createMap();
  }

  createMap() {
    Geolocation.getCurrentPosition().then((position: Position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      const zoomLevel = 14;

    //créer la carte
    this.map = L.map('map', {
      center: [lat, lng],
      zoom: zoomLevel
    });

    const mainLayer= L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      minZoom: 12,
      maxZoom: 17,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyrigth">OpenStreetMap</a> contributors'
    });

    mainLayer.addTo(this.map);

    // Rafraîchir la carte après un certain temps
    setInterval(() => {
      this.refreshMap();
    }, 30000); //  = 30 sec.
    }).catch(err => {
      console.warn(`Erreur : ${err.message}`);
    });
  }

  refreshMap() {
    // Effacer la carte
    this.map.remove();

    // Appeler à nouveau la création de la carte
    this.createMap();
  }
}
