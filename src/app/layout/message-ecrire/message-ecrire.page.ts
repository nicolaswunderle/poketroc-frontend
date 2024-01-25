import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router'; 
@Component({
  selector: 'app-message-ecrire',
  templateUrl: './message-ecrire.page.html',
  styleUrls: ['./message-ecrire.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class MessageEcrirePage implements OnInit {
 
    messages = [
      { sender: 'sacha245', text: 'Bonjour, ravie de voir que ma carte vous plaise !' },
      { sender: 'LeDresseur', text: 'Gros coup de coeur oui' },
      { sender: 'Pokedresseur', text: 'salut' },
    ];
  constructor(private router: Router) { }
  selectConversation(userId: string) {
    // Naviguer vers la page de confirmation avec l'ID de l'utilisateur sélectionné
    this.router.navigate(['/confirmation', userId]);
  }

  ngOnInit() {
  }
  goToMessagePage() {
    this.router.navigate(['/message']);
  }
}
