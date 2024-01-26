import { Component, AfterViewInit } from '@angular/core';
import { Geolocation, Position } from '@capacitor/geolocation';
import * as L from 'leaflet';
import { environment } from "src/environments/environment";
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/security/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

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

  constructor(private route: ActivatedRoute, private authService: AuthService, private http: HttpClient, private router: Router) { }

  // chercher les données utilisateur dans le background
  getUserDatas(){
    // en brut en attendant la liste
    const url = environment.apiUrl + `/dresseurs/65a4f2da7ca0771b4454a8aa`;
    this.authService.getToken$().subscribe((token) => {
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
      const dresseurListe = L.marker([lat, lng], { icon: customIcon }).addTo(this.map); // changer liste.lat et liste.lng <- en attente
      //pour autres joueur on recoit une liste avec leur position => boucle for avec const dresseurUser avec nom liste dresseur
    })
  }
}
