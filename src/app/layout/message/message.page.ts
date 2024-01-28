import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {create} from 'ionicons/icons';
import {addIcons} from 'ionicons';
import {Router, ActivatedRoute} from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/security/auth.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class MessagePage implements OnInit {
 // createIcon = create;
 exchangesDatas: any[] = [];
 username:any;
  constructor(private router: Router, private auth: AuthService, private http: HttpClient, private route: ActivatedRoute ) {
    addIcons({
      create: create
    })
  }

  getExchangesDatas(){
    const urlExanche = environment.apiUrl + `/echanges`;
    this.auth.getToken$().subscribe((token) => {
      const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
      this.http.get(urlExanche, {headers}).subscribe((datas: any) => {
        datas.forEach((exchange: any) => {
          this.exchangesDatas.push(exchange);
        });
        console.log(this.exchangesDatas)
      })
    })
  }

  ngOnInit() {
    this.getExchangesDatas();
  }
  goToMessageEcrirePage(){
    this.router.navigate(['/message-ecrire']);
  }
  goToMessageUserPage(exchangeId: string) {
    this.router.navigate([`message/exchange`, { exchangeId }]);
  }
}
