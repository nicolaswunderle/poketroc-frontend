import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';



@Component({
  selector: 'app-echanges',
  templateUrl: './echanges.page.html',
  styleUrls: ['./echanges.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class EchangesPage implements OnInit {
  //concerne la création des onglets
  segmentModel: string = "attente";
  constructor(private router: Router) { }

  ngOnInit() {
  }
  goToAnotherPage() {
    // Remplacez 'chemin-de-votre-page' par le chemin réel de la page vers laquelle vous souhaitez naviguer.
    this.router.navigate(['/echangeDetails']);
  }
}
