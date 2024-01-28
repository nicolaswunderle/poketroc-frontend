import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/security/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-ajouter-carte',
  templateUrl: './ajouter-carte.page.html',
  styleUrls: ['./ajouter-carte.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class AjouterCartePage implements OnInit {
  cardNb: string = '';
  nameSearch: string = '';
  cardId: any;
  notInDeck: boolean = false;
  cards: any[] = [];
  filteredCards: any[] = [];

  constructor(private loadingController: LoadingController, private cdr: ChangeDetectorRef ,private authService: AuthService, private http: HttpClient, private router: Router) {}

  getPokemonDatasById(card: any){
    if(this.notInDeck === true){
      const url = environment.apiPokemonTCGUrl + `/cards/${card}`;
      const token = environment.tokenPokemonTCG;
      const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
      this.http.get(url, {headers}).subscribe((res: any) => {
        this.cardId = res.data.id;
        this.goToNewCardPage(this.cardId);
      },
      (error) => {
        console.error('Erreur lors de la récupération des cartes:', error);
      })
    };
  }

  onSearchInput() {
    console.log('onSearchInput called');
    const searchTerm = this.nameSearch.trim().toLowerCase();
    this.filteredCards = this.filterCards(searchTerm);
    this.getPokemonDatasByName();
    this.cdr.detectChanges();
  }

  getPokemonDatasByName(){
    this.presentLoading();
    const urlApi = environment.apiPokemonTCGUrl + `/cards?q=name:${this.nameSearch}*`;
    const token = environment.tokenPokemonTCG;
    const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
    this.http.get(urlApi, {headers}).subscribe((res: any) => {
      if (Array.isArray(res.data)) {
        this.cards = res.data;
      } else {
        console.error('Les données reçues ne sont pas sous forme de tableau:', res);
      }
    },
    (error) => {console.error('Erreur lors de la récupération des cartes:', error);
    },
    () => {this.dismissLoading();
    });
  }

  filterCards(searchTerm: string): any[] {
    const matchingCards: any[] = [];
    for (const card of this.cards) {
      const cardNameLower = card.name.toLowerCase();
      if (cardNameLower.includes(searchTerm)) {
        matchingCards.push(card);
      }
    }
    return matchingCards;
  }

  isCardInDeck(){
    const urlCollectee = environment.apiUrl + '/cartes?statut=collectee';
    const urlSouhaitee = environment.apiUrl + '/cartes?statut=souhaitee';
    this.authService.getToken$().subscribe((token) => {
        const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
        this.http.get(urlCollectee, {headers}).subscribe((collecteeRes: any) => {
          if(collecteeRes.some((e: any) => e.id_api === this.cardNb)) {
            console.log('Vous possédez déjà cette carte!');
          } else{
            this.http.get(urlSouhaitee, {headers}).subscribe((souhaiteeRes: any) => {
              if(souhaiteeRes.some((e: any) => e.id_api === this.cardNb)) {
                console.log('Vous posédez déjà cette carte!');
              } else {
                this.notInDeck = true;
                this.getPokemonDatasById(this.cardNb);
              }
            },(error) => {console.error('Erreur lors de la récupération des cartes:', error);});
          }
        },(error) => {console.error('Erreur lors de la récupération des cartes:', error);});
      }
    );
  }

  goToNewCardPage(cardId: any){
    this.router.navigate(['/ajouterCarte', cardId]).then(() => {
      window.location.reload();
    });

  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Chargement en cours...',
      duration: 3000,
      translucent: true,
      cssClass: 'custom-loading'
    });
    await loading.present();
  }

  async dismissLoading() {
    await this.loadingController.dismiss();
  }


  ngOnInit() {
  }

}
