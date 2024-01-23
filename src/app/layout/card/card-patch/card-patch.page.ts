import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-patch',
  templateUrl: './card-patch.page.html',
  styleUrls: ['./card-patch.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CardPatchPage implements OnInit {
  cardId: any;

  constructor(private route: ActivatedRoute, private router: Router) { }

  public alertButtons = [
    {
      text: 'Annuler',
      role: 'cancel',
      handler: () => {
        console.log('Modification annulé');
      },
    },
    {
      text: 'Modifier',
      role: 'edit',
      handler: () => {
        console.log('Carte modifié');
        this.router.navigate([`/cartes/${this.cardId}`]).then(() => {
          window.location.reload();
        })
      },
    },
  ];

  ngOnInit() {
    this.cardId = this.route.snapshot.params['cardId'];
  }

}
