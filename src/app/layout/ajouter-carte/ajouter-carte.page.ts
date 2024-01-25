import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/security/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-ajouter-carte',
  templateUrl: './ajouter-carte.page.html',
  styleUrls: ['./ajouter-carte.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class AjouterCartePage implements OnInit {
  cardNb: string = '';
  cardDatas: any;

  constructor(private authService: AuthService, private http: HttpClient) {}

  getPokemonDatas(card: any){
    const url = environment.apiPokemonTCGUrl + `/cards/${card}`;
    const token = environment.tokenPokemonTCG;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    this.http.get(url, {headers}).subscribe((res: any) => {
      console.log(res.data)
      this.cardDatas = res.data;
    })
  }

  submitCardNb(){
    this.getPokemonDatas(this.cardNb)

  }

  ngOnInit() {
  }

}
