import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { home, book, add, people, person } from "ionicons/icons";

// Custom type that represent a tab data.
declare type PageTab = {
  title: string; // The title of the tab in the tab bar
  icon: string; // The icon of the tab in the tab bar
  path: string; // The route's path of the tab to display
};

@Component({
  selector: 'app-layout',
  templateUrl: './layout.page.html',
  styleUrls: ['./layout.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class LayoutPage {
  tabs: PageTab[];

  constructor() {
    this.tabs = [
      //{ title: "Home", icon: home, path: "create-trip" },
      //{ title: "Deck", icon: book, path: "places-map" },
  { title: "Home", icon: home, path: "home" },
      { title: "Deck", icon: book, path: "deck" },
{ title: "Ajouter Carte", icon: add, path: "ajouterCarte" },
      //{ title: "Ajouter Carte", icon: add, path: "trip-list" },
      {title : "Echanges", icon: people, path: "echanges"},
      {title : "Profil", icon: person, path: "profil"}
    ];
  }
}