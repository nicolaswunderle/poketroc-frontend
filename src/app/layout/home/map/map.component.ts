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

      const mainLayer= L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        minZoom: 10,
        maxZoom: 17,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyrigth">OpenStreetMap</a>' 
      });

      mainLayer.addTo(this.map);

      // Ajouter un marqueur pour indiquer la position de l'utilisateur
      // const dresseurUser = L.marker([lat, lng]).addTo(this.map);
      // dresseurUser.bindPopup('Votre position').openPopup(); // permet de mettre du texte _> afficher nom dresseur ?
 
       // créer une fonction qui prend une image aléatoire dans le dossier _img/
       const randomImg = () => {
        const img = Math.floor(Math.random() * 16) + 1;
        return `./assets/_img/${img}.png`;
      };

      // création de l'icône avec image aléatoire
      const customIcon = L.icon({
        iconUrl: randomImg(),
        iconSize: [32, 64], // taille img en px
        iconAnchor: [16, 32], // point encrage icône sur position
        popupAnchor: [0, -32] // point encrage popup sur position
      })

      // Ajout du marker avec icône personnalisée
      const dresseurUser = L.marker([lat, lng], { icon: customIcon }).addTo(this.map);
      dresseurUser.bindPopup('').openPopup();
      const dresseurListe = L.marker([lat, lng], { icon: customIcon }).addTo(this.map); // changer liste.lat et liste.lng <- en attente
      //pour autres joueur on recoit une liste avec leur position => boucle for avec const dresseurUser avec nom liste dresseur
    })
  }
}
