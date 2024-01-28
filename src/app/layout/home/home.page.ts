import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CallbackID, Geolocation, PositionOptions, WatchPositionCallback } from '@capacitor/geolocation';
import { MapComponent } from './map/map.component';
// import { DresseurComponent } from '.';

import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/security/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Router} from '@angular/router';
import { WebsocketService } from 'src/app/websocket/websocket.service';
import { WsMessage } from 'src/app/websocket/ws-message.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, MapComponent]
})
export class HomePage implements OnInit {
  choix: string = 'cartesCochees';
  choixCartes: string = 'cartesNouveautes';
  watchId: Promise<CallbackID> | undefined;

  websocket: WebSocket | undefined;
  echanges: any;
token: any;
dresseur: any;

    constructor(private route: ActivatedRoute, 
     
   private router: Router,
      private authService: AuthService,
      private http: HttpClient,
      private wsService: WebsocketService) { 
        this.wsService.listen<WsMessage>().subscribe(res => {
          console.log(res);
        })
        this.wsService.send({
          token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NWE0ZjJkYTdjYTA3NzFiNDQ1NGE4YWEiLCJleHAiOjE3MDY5OTY2MDksImlhdCI6MTcwNjM5MTgwOX0.6WC_jcuqikdgToSEZUiKo-81rnDJZvGIyPyb71bvbX0",
          localisation: "[46,6]",
          type : 'getDresseurAProximite'
        }); 
        
    }

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
      
      this.getUserDatas();
    }

    // géolocaliser l'utilisateur
    printCurrentPosition = async () => {
      const coordinates = await Geolocation.getCurrentPosition();
      console.log('Current position:', coordinates);
    };

    watchPosition = () => {
      const options: PositionOptions = {};
      const callback: WatchPositionCallback = (position) => {
        console.log('Watched position:', position);
        // Faites quelque chose avec la position mise à jour ici
      };
      this.watchId = Geolocation.watchPosition(options, callback);
      setInterval(async() => {
        if (this.watchId !== undefined){
        // Geolocation.clearWatch({ id.this.watchId });
        this.watchId = Geolocation.watchPosition(options, callback);
      }
    }, 30000);
    };
    handleDresseurAProximite(message: any) {
  // Traiter les données reçues pour 'getDresseurAProximite'
  const dresseursProximite = message.dresseursProximite;
  // Effectuer d'autres opérations nécessaires avec les données
  console.log('Dresseurs à proximité:', dresseursProximite);
}


/* PAGE CARTES ***************************************************************************************************************/
//connexion websocket (remplacer localhost par lien api)
// envoyer objet getDresseur -> localisation /



  ngOnInit() {
    this.watchPosition();

    //cartes pour échanges
    this.getEchangesDatas();
  }
  onChoixChange() {
    if (this.choix !== 'cartesCochees') {
      this.choixCartes = 'cartesNouveautes';
    }
  }
  getEchangesDatas(){
    const url = environment.apiUrl + `/echanges`;
    this.authService.getToken$().subscribe((token) => {
      const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
      
      this.http.get(url, {headers}).subscribe((res:any) => {
        this.echanges = res;
        console.log(this.echanges);
        
      },
      (error) => {
        console.error('Erreur lors de la récupération des échanges:', error);
      });
    });
  }

  goToEchangeCreerPage(){
    this.router.navigate(['/echangeCreer']);
  }
}


