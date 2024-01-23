import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {addIcons} from 'ionicons';
//importer icones sur notre page hors footer
import { pencil } from 'ionicons/icons';


@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ProfilPage implements OnInit {

  constructor() { 
    addIcons({
      pencil: pencil
    })
  }

  ngOnInit() {
  }

}
