import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-echanges',
  templateUrl: './echanges.page.html',
  styleUrls: ['./echanges.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class EchangesPage implements OnInit {
  cardId: any;
  //concerne la création des onglets
  segmentModel: string = "attente";
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.cardId = this.route.snapshot.params['cardId'];
  }

}
