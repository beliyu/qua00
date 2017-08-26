import { Component, ViewChild, ElementRef, OnInit, NgZone } from '@angular/core';
import { GoogleMapsAPIWrapper, MapsAPILoader, AgmCoreModule } from '@agm/core';
import { DirectionsMapDirective } from '../direction-map.directive';
import { LocalService } from '../local.service';
declare var google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  origin = { longitude: 20.70, latitude: 43.72 };
  destination = { longitude: 20.355, latitude: 43.89 };

  constructor(private ls: LocalService) { }

  ngOnInit( ) {
  }

}
