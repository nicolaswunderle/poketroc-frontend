import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from "@angular/router";
import { AuthService } from "src/app/security/auth.service";
import { logOut as logOutIcon, pencil } from "ionicons/icons";
//pour changer de photo de profil et utiliser sa caméra, il faudra peut-être utiliser Cordova Camera


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

  constructor(
    
    private auth: AuthService,
    
    private router: Router
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

}
