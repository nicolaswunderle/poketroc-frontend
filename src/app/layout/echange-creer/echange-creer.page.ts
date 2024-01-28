import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {caretBack, caretForward} from 'ionicons/icons';
import {addIcons} from 'ionicons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-echange-creer',
  templateUrl: './echange-creer.page.html',
  styleUrls: ['./echange-creer.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class EchangeCreerPage implements OnInit {
activeSegment: string = 'moi';
segmentOption = true;
images: string[] = [
  'https://ionicframework.com/docs/img/demos/card-media.png',
  //mettre ici les autres liens des images
  'https://ionicframework.com/docs/img/demos/avatar.svg',
];
currentImageIndex: number = 0;

  constructor(private router: Router) { 
    addIcons({
      caretForward: caretForward,
      caretBack: caretBack
    })
  }

  ngOnInit() {
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
goToDeckPage(){
  this.router.navigate(['/deckChoixEchange']);
}
}
