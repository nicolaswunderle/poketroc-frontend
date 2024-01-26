import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-echanges',
  templateUrl: './echanges.page.html',
  styleUrls: ['./echanges.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
  
})
export class EchangesPage implements OnInit {
  alertButtons = ['Fermer'];
  cardId: any;
  //concerne la création des onglets
  segmentOption = true;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.cardId = this.route.snapshot.params['cardId'];
  
  }
  goToAnotherPage() {
    
    this.router.navigate(['/echangeDetails']);
  }

  goToEchangePage(){
    this.router.navigate(['/echange']);
  }
  
  
}
