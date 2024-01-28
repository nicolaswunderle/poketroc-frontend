import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from "@angular/router";
import { AuthService } from "src/app/security/auth.service";
import { logOut as logOutIcon, pencil } from "ionicons/icons";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";


@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ProfilPage implements OnInit {

  modificationErreur = false;
  
  readonly logOutIcon = logOutIcon;
  readonly pencil = pencil;
  dresseur: any;
  modification = false;

  constructor(
    // Inject the authentication provider.
    private auth: AuthService,
    // Inject the router
    private router: Router,
    private http: HttpClient
  ) {
    this.auth.getUser$().subscribe(dresseur => {
      this.dresseur = dresseur;
      this.dresseur.date_naissance = this.convertirDate(this.dresseur.date_naissance);
      console.log(this.dresseur.date_naissance)
    })
  }

  ngOnInit() {
  }

  // Add a method to log out.
  logOut() {
    console.log("logging out...");
    this.auth.logOut();
    this.router.navigateByUrl("/connexion");
  }
  toggleModifications() {
    if (this.modification) {
      this.modification = false;  
    } else {
      this.modification = true;
    }
  }
  onSubmit(form: NgForm) {
    // Do not do anything if the form is invalid.
    if (form.invalid) {
      return;
    }

    // Hide any previous login error.
    this.modificationErreur = false;

    this.auth.getToken$().subscribe(token => {
      const url = `${environment.apiUrl}/dresseurs/`;
      const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
      this.http.patch(url, this.dresseur, {headers}).subscribe(
        (res: any) => {
          this.dresseur = res;
        },(error) => {
          this.modificationErreur = true;
          console.error('Erreur lors de la modification du dresseur : ', error);
        }
      );
    });


    this.toggleModifications();
  }


  convertirDate(dateBrute: string) {
    const date = new Date(dateBrute);
    
    const annee = date.getFullYear();
    const mois = (date.getMonth() + 1).toString().padStart(2, '0');
    const jour = date.getDate().toString().padStart(2, '0');
  
    const dateFormatee = `${annee}-${mois}-${jour}`;
    return dateFormatee;
  }
}
