import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/security/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ajouter-carte',
  templateUrl: './ajouter-carte.page.html',
  styleUrls: ['./ajouter-carte.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class AjouterCartePage implements OnInit {
  cardNb: string = '';
  cardId: any;

  constructor(private authService: AuthService, private http: HttpClient, private router: Router) {}

  getPokemonDatas(card: any){
    const url = environment.apiPokemonTCGUrl + `/cards/${card}`;
    const token = environment.tokenPokemonTCG;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    this.http.get(url, {headers}).subscribe((res: any) => {
      console.log(res.data)
      this.cardId = res.data.id;
      if(this.cardId){
        this.goToNewCardPage(this.cardId);
      }
    },
    (error) => {
      console.error('Erreur lors de la récupération des cartes:', error);
    })
  }

  submitCardNb(){
    this.getPokemonDatas(this.cardNb);
  }

  goToNewCardPage(cardId: any){
    this.router.navigate(['/ajouterCarte', cardId]).then(() => {
      window.location.reload();
    });

  }

  ngOnInit() {
    }

}
