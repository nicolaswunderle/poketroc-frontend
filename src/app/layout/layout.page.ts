import { Component } from "@angular/core";
import { SharedModule } from 'src/app/shared-module';
// import { 
//   IonHeader,
//   IonToolbar,
//   IonTitle 
// } from "@ionic/angular/standalone";
import { home, book, add, people, person, chatbubbles} from "ionicons/icons";

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
  imports: [
    SharedModule,
    // IonHeader,
    // IonToolbar,
    // IonTitle
  ]
})
export class LayoutPage {
  tabs: PageTab[];
  constructor() {
    this.tabs = [
  { title: "Home", icon: home, path: "home" },
      { title: "Deck", icon: book, path: "deck" },
{ title: "Ajouter Carte", icon: add, path: "ajouterCarte" },
      {title : "Echanges", icon: people, path: "echanges"},
      {title : "Profil", icon: person, path: "profil"},
      {title : "Message", icon: chatbubbles, path: "message"},
      
    ];
  }
}