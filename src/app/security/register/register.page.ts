import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ViewDidEnter } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { Router } from "@angular/router";

//pour les photos
import {PictureService} from "src/app/picture/picture.service";


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class RegisterPage implements ViewDidEnter {
  profilePicture: any;
  lastname: string = '';
  firstname: string = '';
  pseudo: string = '';
  email: string = '';
  password: string = '';
  date: string = '';
  deck: boolean = false;

//photos
picture:any;

  constructor(private readonly http: HttpClient, private router: Router,  
  private pictureService: PictureService,) {
   
   
   }
    
  

  onSubmit(){
    const user={
      nom: this.lastname,
      prenom: this.firstname,
      pseudo: this.pseudo,
      email: this.email,
      mot_de_passe: this.password,
      date_naissance: this.date,
      deck_visible: this.deck,
      url_image_profil:this.picture.url,
      //rajouter image + en ligne
      //mettre en dur -> demander à karen
      localisation: { "type": "Point", "coordinates": [ -74 , 7 ] },
    };
    //il manque dans exemple : en ligne, deck visible et image
    const userExemple = {"prenom": "Nicolas", "nom": "Wunderle", "pseudo":"nw", "email": "nicolas.wunderle@heig-vd.ch", "date_naissance": "1999-11-14", "localisation": { "type": "Point", "coordinates": [ -74 , 7 ] }, "mot_de_passe": "12345"};

    console.log(user);

    this.sendDataToBackend(user);
    this.router.navigate(['/login']);
  }

  private sendDataToBackend(user: any): void {

    // Make an Http request to retrieve the trips.
    const url = environment.apiUrl + '/dresseurs';
    this.http.post<any>(url, user).subscribe(
      (response) => {
        console.log('User created successfully:', response);
      },
      (error) => {
        console.error('Error creating user:', error);
      }
    );
  }

  ionViewDidEnter(): void {
  }

  ngOnInit() {}

  //prendre photo
  takePictureTest() {
    this.pictureService.takeAndUploadPicture().subscribe(
      (picture) => {
        if (picture) {
          this.picture = picture;
          console.log(this.picture)
          this.pictureService.setProfilePicture(picture);
          console.log(this.pictureService);
          
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

