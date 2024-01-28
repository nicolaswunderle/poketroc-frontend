import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/security/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  constructor(private route: ActivatedRoute, private authService: AuthService, private http: HttpClient, private router: Router, private toastController: ToastController) {
  }

  getCardDatas(){
    const url = environment.apiUrl + `/cartes/${this.cardId}`;
    this.authService.getToken$().subscribe((token) => {
      const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
      this.http.get(url, {headers}).subscribe((res: any) => {
        this.card = res;
        this.getPokemonDatas(res.id_api);
      },
      (error) => {
        console.error('Erreur lors de la récupération des cartes:', error);
      });
    });
  }

  getPokemonDatas(cardId: any){
    const url = environment.apiPokemonTCGUrl + `/cards/${cardId}`;
    const token = environment.tokenPokemonTCG;
    const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
    this.http.get(url, {headers}).subscribe((res: any) => {
      this.cardDatas = res.data;
    })
  }

  goToEchangePage(cardId: any){
    this.router.navigate(['/echanges', cardId]);
  }

  goToPatchPage(cardId: any){
    this.router.navigate(['/cartes/modifier', cardId]).then(() => {
      window.location.reload();
    });
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
        this.deleteCard();
        this.router.navigate(['/deck']).then(() => {
          this.presentConfirmationToast();
        });
      },
    },
  ];

  async presentConfirmationToast() {
    const toast = await this.toastController.create({
      message: 'La carte a été supprimée avec succès.',
      duration: 5000,
      position: 'top',
      color: 'danger'
    });
    await toast.present();
  }

  deleteCard(){
    this.authService.getToken$().subscribe((token) => {
      const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
      const url = environment.apiUrl + `/cartes/${this.cardId}`;
      this.http.delete(url, {headers})
      .subscribe(() => console.log('Delete successful'));
    });
  }

  setResult(ev: any){
    console.log(`Dismissed with role: ${ev.detail.role}`)
  }

  ngOnInit() {
    this.cardId = this.route.snapshot.params['cardId'];
    this.getCardDatas();
  }

}
