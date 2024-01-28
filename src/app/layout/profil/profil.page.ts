import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from "@angular/router";
import { AuthService } from "src/app/security/auth.service";
import { logOut as logOutIcon, pencil } from "ionicons/icons";
import { PictureService } from "src/app/picture/picture.service";


@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ProfilPage implements OnInit {
  
  readonly logOutIcon = logOutIcon;
  readonly pencil = pencil;
  profilePicture :any;
  constructor(
    // Inject the authentication provider.
    private auth: AuthService,
    // Inject the router
    private router: Router,
   private pictureservice: PictureService,
    
  ) {}

  ngOnInit() {
  this.profilePicture =  this.pictureservice.getProfilePicture();
  console.log(this.profilePicture);
  }

  // Add a method to log out.
  logOut() {
    console.log("logging out...");
    this.auth.logOut();
    this.router.navigateByUrl("/login");
  }
  goToProfilModificationPage(){
    this.router.navigate(['/profilModification']);
  }

}
