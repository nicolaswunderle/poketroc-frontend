import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {create} from 'ionicons/icons';
import {addIcons} from 'ionicons';


@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class MessagePage implements OnInit {
 // createIcon = create;
  constructor() { 
    addIcons({
      create: create
    })
  }

  ngOnInit() {
  }

}
