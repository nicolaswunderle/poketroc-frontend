import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/shared-module';
// import { IonList, IonItem, IonThumbnail, IonLabel } from "@ionic/angular/standalone";

@Component({
  selector: 'app-deck',
  templateUrl: './deck.page.html',
  styleUrls: ['./deck.page.scss'],
  standalone: true,
  imports: [SharedModule]
  // imports: [SharedModule, IonList, IonItem, IonThumbnail, IonLabel]
})
export class DeckPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
