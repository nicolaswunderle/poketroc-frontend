import { Component, AfterViewInit } from '@angular/core';
import { Geolocation, Position } from '@capacitor/geolocation';
import * as L from 'leaflet';
import { environment } from "src/environments/environment";
import { AuthService } from 'src/app/security/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { WebsocketService } from '../../../websocket/websocket.service';
import { WsMessage } from 'src/app/websocket/ws-message.model';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { latLng, MapOptions, tileLayer } from 'leaflet';

// @NgModule({
//   // ...
//   imports: [ /* Other imports... */, LeafletModule ]
//   // ...
// })

export class ExamplePageModule {
  // mapOptions: MapOptions;

  // constructor(/* ... */) {
  //   // ...
  //  this.mapOptions = {
  //    layers: [
  //      tileLayer(
  //        'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  //        { maxZoom: 18 }
  //      )
  //    ],
  //    zoom: 13,
  //    center: latLng(46.778186, 6.641524)
  //  };
  // }
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  standalone: true,
  styleUrls: ['./map.component.scss'],
})

export class MapComponent implements AfterViewInit {
map: L.Map = {} as L.Map
dresseur: any;
dresseurLatitude: number=0;
dresseurLongitude: number=0;
token: any;

  constructor(private authService: AuthService, private http: HttpClient, private wsService: WebsocketService) {
    this.wsService.listen().subscribe( message => {
      const content = JSON.parse(message);
     
      if (content.getDresseurAProximite) {
        const dresseurs = content.getDresseurAProximite;
        this.updateMapWithDresseurs(dresseurs);
      }
    })
  }

  ngAfterViewInit(): void {
    this.getUserDatas();
    this.createMap();
  }

  // chercher les données utilisateur dans le background
  getUserDatas(){
    // en brut en attendant la liste
    const url = environment.apiUrl + `/dresseurs/65a4f2da7ca0771b4454a8aa`; // idDresseur
    this.authService.getToken$().subscribe((token) => {
      this.token = token;
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
       //appel WebSocket avec le token
      this.wsService.send({
        type: 'getDresseurAProximite',
        token: this.token,
      });
      this.http.get(url, {headers}).subscribe((donnees: any) => {
        this.dresseur = donnees;
      },
      (error) => {
        console.error('Erreur lors de la récupération des données utilisateur :', error);
      })
    })
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
      dresseurUser.bindPopup(`${this.dresseur?.pseudo || 'Dresseur'}`).openPopup();
    })
  }
   
  updateMapWithDresseurs(dresseurs: any) {
    console.log("Mettre à jour la carte avec dresseurs : ",dresseurs);
    // Supprimer tous les marqueurs existants sur la carte
    this.map?.eachLayer(layer => {
      if (layer instanceof L.Marker) {
        this.map?.removeLayer(layer);
      }
    });
    // Pour chaque objet du tableau, prendre localisation.coordinates et créer un marker sur la page
    dresseurs.forEach((dresseur: any) => {
      const lat = dresseur.localisation.coordinates[0];
      const lng = dresseur.localisation.coordinates[1];
      console.log("latitude : ", lat);
      // Utiliser la référence à this.map stockée lors de la création de la carte
        const marker = L.geoJSON(dresseurs.localisation.coordinates).addTo(this.map);
        console.log("marker : ", marker);
    });
  }
  
 
  // Gérer les nouveaux messages
  handleNewMessage(message: any) {}
  
}