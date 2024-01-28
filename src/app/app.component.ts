import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { Storage } from "@ionic/storage-angular";
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet, FormsModule, HttpClientModule],
})
export class AppComponent {
  constructor(storage: Storage) {
    storage.create();
  }
}
// @NgModule({
//   // ...
//   imports: [ /* Other imports... */, LeafletModule ]
//   // ...
// })
// export class AppModule {}