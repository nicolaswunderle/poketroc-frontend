import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CallbackID, Geolocation, PositionOptions, WatchPositionCallback } from '@capacitor/geolocation';
<<<<<<< HEAD
import { MapComponent } from './map/map.component';
=======
>>>>>>> origin/main

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

    constructor() { }

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

  ngOnInit() {
    this.watchPosition();
  }
  onChoixChange() {
    if (this.choix !== 'cartesCochees') {
      this.choixCartes = 'cartesNouveautes';
    }
  }
}


