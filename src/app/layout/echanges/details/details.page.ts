import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {caretBack, caretForward} from 'ionicons/icons';
import {addIcons} from 'ionicons';
import { Router , ActivatedRoute} from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/security/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class DetailsPage implements OnInit {
  echangeId: string = "";
  echange: object = {};
alertButtons = ['Fermer'];
activeSegment: string = 'moi';
segmentOption = true;
images: string[] = [
  'https://ionicframework.com/docs/img/demos/card-media.png',
  //mettre ici les autres liens des images
  'https://ionicframework.com/docs/img/demos/avatar.svg',
];
currentImageIndex: number = 0;

  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private authService: AuthService,
    private http: HttpClient
    ) { 
    addIcons({
      caretForward: caretForward,
      caretBack: caretBack
    })
  }

  ngOnInit() {
    this.echangeId = this.route.snapshot.params['echangeId'];
    this.getEchangeDatas();
  }

  getEchangeDatas(){
    const url = environment.apiUrl + `/echanges/${this.echangeId}`;
    this.authService.getToken$().subscribe((token) => {
      const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
      this.http.get(url, {headers}).subscribe((res:any) => {
        this.echange = res;
      },
      (error) => {
        console.error('Erreur lors de la récupération des échanges:', error);
      });
    });
  }


  goToEchangesPage(){
    this.router.navigate(['/echanges']);
  
  }
  goToUserMessagePage() {
    this.router.navigate(['/messageUtilisateur']);
  }
  segmentChanged(ev: any) {
    if (ev.detail.value === 'moi') {
      this.segmentOption = true;
    } else {
      this.segmentOption = false;
    }
  }
  goToPreviousImage(){
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
    }
  }
  goToNextImage(){
    if (this.currentImageIndex < this.images.length - 1) {
      this.currentImageIndex++;
  } 
}

}