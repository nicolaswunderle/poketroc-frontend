import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-ajouter-carte',
  templateUrl: './ajouter-carte.page.html',
  styleUrls: ['./ajouter-carte.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class AjouterCartePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
