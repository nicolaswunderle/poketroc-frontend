import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ViewDidEnter } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class RegisterPage implements ViewDidEnter {

  lastname: string = '';
  firstname: string = '';
  pseudo: string = '';
  email: string = '';
  password: string = '';
  date: string = '';
  deck: boolean = false;

  constructor(private readonly http: HttpClient) {}

  onSubmit(){
    const user={
      lastname: this.lastname,
      firstname: this.firstname,
      pseudo: this.pseudo,
      email: this.email,
      password: this.password,
      date: this.date,
      deck: this.deck,
      localisation: { "type": "Point", "coordinates": [ -74 , 7 ] },
    };
    const userExemple = {"prenom": "Nicolas", "nom": "Wunderle", "pseudo":"nw", "email": "nicolas.wunderle@heig-vd.ch", "date_naissance": "1999-11-14", "localisation": { "type": "Point", "coordinates": [ -74 , 7 ] }, "mot_de_passe": "12345"};

    console.log(user);

    this.sendDataToBackend(user);
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

}

