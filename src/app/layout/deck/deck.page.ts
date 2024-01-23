import { Component, OnInit, inject } from '@angular/core';
import { SharedModule } from 'src/app/shared-module';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/security/auth.service';
import { Router } from '@angular/router';
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
  cardsColl: any[] = [];
  cardsWant: any[] = [];
  segmentOption = true;

  constructor(private authService: AuthService, private readonly http: HttpClient, private router: Router) {
    this.getCards();
  }

  getCards(){
    const url = environment.apiUrl + '/cartes?statut=collectee';
    const url2 = environment.apiUrl + '/cartes?statut=souhaitee';
    //const accessToken = this.authService.getToken$();
    this.authService.getToken$().subscribe(
      (token) => {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });

        this.http.get(url, {headers}).subscribe(
          (res: any) => {
            res.forEach((e: any) => {
              this.cardsColl.push(e);
            });
          },
          (error) => {
            console.error('Erreur lors de la récupération des cartes:', error);
          }
        );
        this.http.get(url2, {headers}).subscribe(
          (res: any) => {
            res.forEach((e: any) => {
              this.cardsWant.push(e);
            });
          },
          (error) => {
            console.error('Erreur lors de la récupération des cartes:', error);
          }
        );
      },

      (authError) => {
        console.error('Erreur lors de la récupération du token d\'accès:', authError);
      }
    );
  }

  segmentChanged(ev: any) {
    if (ev.detail.value === 'collected') {
      this.segmentOption = true;
    } else {
      this.segmentOption = false;
    }
  }

  changePage(cardId: any){
    this.router.navigate(['/cartes', cardId]);
  }

  ngOnInit() {
  }

}
