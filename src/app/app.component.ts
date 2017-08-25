import { Component } from '@angular/core';
import { GoogleMapsAPIWrapper, MapsAPILoader, AgmCoreModule } from '@agm/core';
declare var google: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers : [ GoogleMapsAPIWrapper ]
})
export class AppComponent {
  title = 'My first AGM project';
  lat = 43.7243;
  lng = 20.7063;
  origin = { longitude: 20.70, latitude: 43.72 };
  destination = { longitude: 20.355, latitude: 43.89 };

  constructor(private gmapsApi: GoogleMapsAPIWrapper) {  }


}
