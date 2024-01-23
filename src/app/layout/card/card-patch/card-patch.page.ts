import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-card-patch',
  templateUrl: './card-patch.page.html',
  styleUrls: ['./card-patch.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CardPatchPage implements OnInit {
  cardId: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.cardId = this.route.snapshot.params['cardId'];
  }

}
