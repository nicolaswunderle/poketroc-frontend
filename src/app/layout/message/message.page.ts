import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {create} from 'ionicons/icons';
import {addIcons} from 'ionicons';
import {Router} from '@angular/router';


@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class MessagePage implements OnInit {
 // createIcon = create;
  constructor(private router: Router) { 
    addIcons({
      create: create
    })
  }

  ngOnInit() {
  }
  goToMessageEcrirePage(){
    this.router.navigate(['/message-ecrire']);
  }
}
