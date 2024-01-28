import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/security/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-echanges',
  templateUrl: './echanges.page.html',
  styleUrls: ['./echanges.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
  
})
export class EchangesPage implements OnInit {
  alertButtons = ['Fermer'];
  cardId: any;
  echanges: any;
  //concerne la création des onglets
  segmentOption = true;

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    
    private authService: AuthService,
    private http: HttpClient
    ) { }

  ngOnInit() {
    this.cardId = this.route.snapshot.params['cardId'];
    this.getEchangesDatas();
  }
  goToAnotherPage() {
    
    this.router.navigate(['/echange/:echangeId']);
  }

  goToEchangePage(){
    this.router.navigate(['/echanges']);
  }

  getEchangesDatas(){
    const url = environment.apiUrl + `/echanges`;
    this.authService.getToken$().subscribe((token) => {
      const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
      
      this.http.get(url, {headers}).subscribe((res:any) => {
        this.echanges = res;
        console.log(this.echanges);
        
      },
      (error) => {
        console.error('Erreur lors de la récupération des échanges:', error);
      });
    });
  }
  
  
}
