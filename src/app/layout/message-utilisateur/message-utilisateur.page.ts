import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { chevronBackOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-message-utilisateur',
  templateUrl: './message-utilisateur.page.html',
  styleUrls: ['./message-utilisateur.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class MessageUtilisateurPage implements OnInit {
  username: string | null;
  messages = [
    { sender: 'moi', text: 'Bonjour, ravie de voir que ma carte vous plaise !' },
    { sender: 'LeDresseur', text: 'Gros coup de cœur oui' },
  ];

  newMessageText: string = ''; 

  constructor(private router: Router, private route: ActivatedRoute) {
    addIcons({
      chevronBackOutline: chevronBackOutline
    })
    this.username = this.route.snapshot.paramMap.has('username') ? this.route.snapshot.paramMap.get('username') : null;
  }

  ngOnInit() {}

  goToEchangeDetailsPage() {
    this.router.navigate(['/echangeDetails']);
  }

  goToMessagePage() {
    this.router.navigate(['/message']);
  }

  sendMessage() {
   
    if (this.newMessageText.trim() !== '') {
      const newMessage = {
        sender: 'moi', 
        text: this.newMessageText,
      };

      
      this.messages.push(newMessage);

 
      this.newMessageText = '';
    }
  }
}
