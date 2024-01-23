import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-message-utilisateur',
  templateUrl: './message-utilisateur.page.html',
  styleUrls: ['./message-utilisateur.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class MessageUtilisateurPage implements OnInit {
  messages = [
    { sender: 'moi', text: 'Bonjour, ravie de voir que ma carte vous plaise !' },
    { sender: 'LeDresseur', text: 'Gros coup de coeur oui' },
  ];
  constructor() { }

  ngOnInit() {
  }

}
