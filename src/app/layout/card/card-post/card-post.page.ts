import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/security/auth.service';
import { catchError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-post',
  templateUrl: './card-post.page.html',
  styleUrls: ['./card-post.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CardPostPage implements OnInit {
  cardId: any;
  cardDatas: any;
  etat: string = '';
  description: string = '';
  type: string = '';
  statut: string = '';
  quantity: string = '';

  constructor(private route: ActivatedRoute, private http: HttpClient, private authService: AuthService, private router: Router) {
  }

  public alertButtons = [
    {
      text: 'Annuler',
      role: 'cancel',
      handler: () => {
        console.log('Ajout annulé');
      },
    },
    {
      text: 'Ajouter',
      role: 'add',
      handler: () => {
        console.log('Carte ajoutée');
        this.postCard();
        //this.router.navigate([`/deck/`]).then(() => {
        //  window.location.reload();
        //})
      },
    },
  ];

  postCard(){
    const cardPost = {
      etat: this.etat,
      desc_etat: this.description,
      type: this.type,
      statut: this.statut,
      quantite: this.quantity,
      id_api: this.cardId,
    }
    console.log(cardPost);
    const url = environment.apiUrl + `/cartes?statut=${cardPost.statut}`;
    this.authService.getToken$().subscribe((token) => {
      const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
      this.http.post(url, cardPost, { headers }).subscribe((res: any) => {console.log(res);});
    });
  }

  getPokemonDatas(card: any){
    const url = environment.apiPokemonTCGUrl + `/cards/${card}`;
    const token = environment.tokenPokemonTCG;
    const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
    this.http.get(url, {headers}).subscribe((res: any) => {
      this.cardDatas = res.data;
    })
  }

  ngOnInit() {
    this.cardId = this.route.snapshot.params['cardId'];
    this.getPokemonDatas(this.cardId);
  }

}
