import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/security/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.page.html',
  styleUrls: ['./card.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CardPage implements OnInit {
  cardId: any;
  card: any;
  cardDatas: any;

  constructor(private route: ActivatedRoute, private authService: AuthService, private http: HttpClient, private router: Router) {
  }

  getCardDatas(){
    const url = environment.apiUrl + `/cartes/${this.cardId}`;
    this.authService.getToken$().subscribe((token) => {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      this.http.get(url, {headers}).subscribe((res: any) => {
        this.card = res;
        this.getPokemonDatas(res);
      },
      (error) => {
        console.error('Erreur lors de la récupération des cartes:', error);
      }
      )
    })
  }

  getPokemonDatas(card: any){
    const url = environment.apiPokemonTCGUrl + `/cards/${card.id_api}`;
    const token = environment.tokenPokemonTCG;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    this.http.get(url, {headers}).subscribe((res: any) => {
      this.cardDatas = res.data;
      console.log(this.cardDatas);
    })
  }

  goToEchangePage(cardId: any){
    this.router.navigate(['/echanges', cardId]);
  }

  goToPatchPage(cardId: any){
    this.router.navigate(['/cartes/modifier', cardId]);
  }

  public alertButtons = [
    {
      text: 'Annuler',
      role: 'cancel',
      handler: () => {
        console.log('Suppression annulé');
      },
    },
    {
      text: 'Supprimer',
      role: 'delete',
      handler: () => {
        console.log('Carte supprimé');
        this.authService.getToken$().subscribe((token) => {
          const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
          });
          const url = environment.apiUrl + `/cartes/${this.cardId}`;
          this.http.delete(url, {headers})
          .subscribe(() => console.log('Delete successful'));
        });
        this.router.navigate(['/deck']).then(() => {
          window.location.reload();
        })
      },
    },
  ];

  setResult(ev: any){
    console.log(`Dismissed with role: ${ev.detail.role}`)
  }

  ngOnInit() {
    this.cardId = this.route.snapshot.params['cardId'];
    this.getCardDatas();
  }

}
