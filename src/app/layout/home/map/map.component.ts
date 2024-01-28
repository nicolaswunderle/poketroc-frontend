import { Component, AfterViewInit } from '@angular/core';
import { Geolocation, Position } from '@capacitor/geolocation';
import * as L from 'leaflet';
import { environment } from "src/environments/environment";
// import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/security/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Router } from '@angular/router';
import { WebsocketService } from '../../../websocket/websocket.service';
import { WsMessage } from 'src/app/websocket/ws-message.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  standalone: true,
  styleUrls: ['./map.component.scss'],
})

export class MapComponent implements AfterViewInit {
map: L.Map = {} as L.Map;
dresseurId: any;
dresseur: any;
websocket: WebSocket | undefined;
dresseurLatitude: number=0;
dresseurLongitude: number=0;
token: any;

  constructor(private authService: AuthService, private http: HttpClient, private wsService: WebsocketService) {
    this.wsService.listen<WsMessage>().subscribe(res => {
      console.log(res);
    })
    this.wsService.send({
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NWE0ZjJkYTdjYTA3NzFiNDQ1NGE4YWEiLCJleHAiOjE3MDY5OTY2MDksImlhdCI6MTcwNjM5MTgwOX0.6WC_jcuqikdgToSEZUiKo-81rnDJZvGIyPyb71bvbX0",
      localisation: "[46,6]",
      type : 'getDresseurAProximite'
    }); 
  }

  // chercher les données utilisateur dans le background
  getUserDatas(){
    // en brut en attendant la liste
    const url = environment.apiUrl + `/dresseurs/65a4f2da7ca0771b4454a8aa`;
    this.authService.getToken$().subscribe((token) => {
      this.token = token;
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      this.http.get(url, {headers}).subscribe((donnees: any) => {
        this.dresseur = donnees;
      },
      (error) => {
        console.error('Erreur lors de la récupération des données utilisateur :', error);
      }
      )
    })
  } 

  ngAfterViewInit(): void {
    this.createMap();
    this.getUserDatas();
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
      dresseurUser.bindPopup(`${this.dresseur.pseudo}`).openPopup();
      // const dresseurListe = L.marker([lat, lng], { icon: customIcon }).addTo(this.map); // changer liste.lat et liste.lng <- en attente
      //pour autres joueur on recoit une liste avec leur position => boucle for avec const dresseurUser avec nom liste dresseur
    })
  }
  // Mettre à jour la carte avec les utilisateurs à proximité
  handleNearbyUsers(dresseur: any[]) {
    // Supprimer tous les marqueurs existants sur la carte
    this.map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        this.map.removeLayer(layer);
      }
    });
    // parcourir le tableau des utilisateurs à proximité et ajouter leur marqueur
    dresseur.forEach((dresseur) => {
      const marker = L.marker([dresseur.lat, dresseur.lng]).addTo(this.map);
      marker.bindPopup(dresseur.pseudo).openPopup();
    });
  }
  handleNewMessage(message: any) {}
}