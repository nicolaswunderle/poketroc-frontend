import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from "@angular/router";
import { AuthService } from "src/app/security/auth.service";
import { logOut as logOutIcon, pencil } from "ionicons/icons";
//pour les photos
import {PictureService} from "src/app/picture/picture.service";

@Component({
  selector: 'app-profil-modification',
  templateUrl: './profil-modification.page.html',
  styleUrls: ['./profil-modification.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ProfilModificationPage implements OnInit {
  readonly logOutIcon = logOutIcon;
  readonly pencil = pencil;
//photos
picture:any;

  constructor(
    
    private auth: AuthService,
    
    private router: Router,

    //photos
    private pictureService: PictureService,
    
  ) {}

  ngOnInit() {
  }

 
  logOut() {
    console.log("logging out...");
    this.auth.logOut();
    this.router.navigateByUrl("/login");
  }
  goToProfilPage(){
    this.router.navigate(['/profil']);
  }

  //méthode prendre photo
  takePictureTest() {
    this.pictureService.takeAndUploadPicture().subscribe(
      (picture) => {
        if (picture) {
          this.picture = picture;
          console.log(this.picture)
          
        } else {
          console.error('Aucune photo prise.');
        }
      },
      (error) => {
        console.error('Erreur lors de la prise et de l\'envoi de la photo :', error);
      }
    );
  }
}
