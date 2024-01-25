import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-message-tchat-utilisateur',
  templateUrl: './message-tchat-utilisateur.page.html',
  styleUrls: ['./message-tchat-utilisateur.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class MessageTchatUtilisateurPage implements OnInit {
  messages = [
    { sender: 'moi', text: 'salut!' },
    { sender: 'sacha245', text: 'Bonjour je suis ravie que..' },
  ];
  constructor(private router: Router) { }

  ngOnInit() {
  }

}
