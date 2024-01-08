import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ViewWillEnter } from "@ionic/angular";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.page.html',
  styleUrls: ['./trip-list.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class TripListPage implements ViewWillEnter {

  constructor(private readonly http: HttpClient) {}

  ionViewWillEnter(): void {
    // Make an HTTP request to retrieve the trips.
    const url = "https://demo-travel-log-api.onrender.com/api/trips";
    this.http.get(url).subscribe((trips) => {
      console.log(`Trips loaded`, trips);
    });
  }

}
