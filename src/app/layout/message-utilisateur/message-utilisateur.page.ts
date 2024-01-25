import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {chevronBackOutline} from 'ionicons/icons';
import {addIcons} from 'ionicons';
import { Router } from '@angular/router'; 
//importer icones sur notre page hors footer
//on arrive ici via le bouton "contacter" de la page echange-details

@Component({
  selector: 'app-message-utilisateur',
  templateUrl: './message-utilisateur.page.html',
  styleUrls: ['./message-utilisateur.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class MessageUtilisateurPage implements OnInit {
  messages = [
    { sender: 'moi', text: 'Bonjour, ravie de voir que ma carte vous plaise !' },
    { sender: 'LeDresseur', text: 'Gros coup de coeur oui' },
  ];
  constructor(private router: Router) {
    addIcons({
      chevronBackOutline: chevronBackOutline
    })
   }

  ngOnInit() {
  }
  goToEchangeDetailsPage() {
    this.router.navigate(['/echangeDetails']);
  }
}
