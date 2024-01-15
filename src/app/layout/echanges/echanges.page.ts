import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-echanges',
  templateUrl: './echanges.page.html',
  styleUrls: ['./echanges.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class EchangesPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
