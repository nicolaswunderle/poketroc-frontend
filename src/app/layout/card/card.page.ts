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
      },
      (error) => {
        console.error('Erreur lors de la récupération des cartes:', error);
      }
      )
    })
  }

  changePage(cardId: any){
    this.router.navigate(['/echanges', cardId]);
  }

  ngOnInit() {
    this.cardId = this.route.snapshot.params['cardId'];
    this.getCardDatas();
  }

}
