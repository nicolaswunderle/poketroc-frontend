import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {caretBack, caretForward} from 'ionicons/icons';
import {addIcons} from 'ionicons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-echange-details',
  templateUrl: './echange-details.page.html',
  styleUrls: ['./echange-details.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class EchangeDetailsPage implements OnInit {
segmentModel: string = "Moi";
  constructor(private router: Router) { 
    addIcons({
      caretForward: caretForward,
      caretBack: caretBack
    })
  }

  ngOnInit() {
  }
  goToUserMessagePage() {
    // Remplacez 'chemin-de-votre-page' par le chemin réel de la page vers laquelle vous souhaitez naviguer.
    this.router.navigate(['/messageUtilisateur']);
  }
}
