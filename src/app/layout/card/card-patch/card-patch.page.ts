import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/security/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-card-patch',
  templateUrl: './card-patch.page.html',
  styleUrls: ['./card-patch.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CardPatchPage implements OnInit {
  cardId: any;
  card: any;
  etat: string = '';
  description: string = '';
  type: string = '';
  statut: string = '';
  quantity: string = '';

  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService, private http: HttpClient) { }

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

  getCardDatas(){
    console.log(this.etat);
    const url = environment.apiUrl + `/cartes/${this.cardId}`;
    this.authService.getToken$().subscribe((token) => {
      const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
      this.http.get(url, {headers}).subscribe((res:any) => {
        this.card = res;
      },
      (error) => {
        console.error('Erreur lors de la récupération des cartes:', error);
      });
    });
  }

  patchCardDatas(){

  }

  ngOnInit() {
    this.cardId = this.route.snapshot.params['cardId'];
    this.getCardDatas();
  }

}
