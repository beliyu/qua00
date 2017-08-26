import { Component, ViewChild, ElementRef, OnInit, NgZone } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsAPIWrapper, MapsAPILoader, AgmCoreModule } from '@agm/core';
import { DirectionsMapDirective } from '../direction-map.directive';
import { LocalService } from '../local.service';

declare var google: any;

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @ViewChild('pickupInput')
  public pickupInputElementRef: ElementRef;

  @ViewChild('pickupOutput')
  public pickupOutputElementRef: ElementRef;

  @ViewChild(DirectionsMapDirective) vc: DirectionsMapDirective;

  origin = { longitude: 20.70, latitude: 43.72, name: 'Kv' };
  destination = { longitude: 20.355, latitude: 43.89, name: 'Ca' };
  destinationInput: FormControl;
  destinationOutput: FormControl;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private ls: LocalService
  ) { }

  ngOnInit() {
    this.destinationInput = new FormControl();
    this.destinationOutput = new FormControl();

    this.mapsAPILoader.load().then(() => {
      const autocompleteInput = new google.maps.places.Autocomplete(this.pickupInputElementRef.nativeElement, {
        types: ['address']
      });

      const autocompleteOutput = new google.maps.places.Autocomplete(this.pickupOutputElementRef.nativeElement, {
        types: ['address']
      });
      this.setupPlaceChangedListener(autocompleteInput, 'Orig');
      this.setupPlaceChangedListener(autocompleteOutput, 'Dest');
    });
  }

  private setupPlaceChangedListener(autocomplete: any, mode: any) {
    autocomplete.addListener('place_changed', () => {
      this.ngZone.run(() => {
        const place = autocomplete.getPlace();
        if (place.geometry === undefined) {
          return;
        }
        if (mode === 'Orig') {
          this.origin = {
            longitude: place.geometry.location.lng(),
            latitude: place.geometry.location.lat(),
            name: ''
          };
        } else {
          this.destination = {
            longitude: place.geometry.location.lng(),
            latitude: place.geometry.location.lat(),
            name: ''
          };
        }
      });
    });
  }
  private saveR(o, d) {
    const r = { orig: this.origin, dest: this.destination };
    r.orig.name = o;
    r.dest.name = d;
    this.ls.addRou(r);
  }
  private selR(i) {
    this.ls.selectRou(i);
  }
  private whmDel(i) {
    this.ls.remRou(i);
  }
}
