import { Component, ViewChild, ElementRef, OnInit, NgZone } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsAPIWrapper, MapsAPILoader, AgmCoreModule } from '@agm/core';
import { Router } from '@angular/router';
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

  myPos = { longitude: 0, latitude: 0, name: 'My Location' };
  origin = { longitude: 0, latitude: 0, name: 'or' };
  destination = { longitude: 0, latitude: 0, name: 'de' };
  destinationInput: FormControl;
  destinationOutput: FormControl;
  duration = '';
  distance = '';
  x = {dur: '', dis: ''};

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private router: Router,
    private ls: LocalService
  ) { }

  ngOnInit() {
    this.setMyPosition();
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
  private setMyPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.myPos.latitude = position.coords.latitude;
        this.myPos.longitude = position.coords.longitude;
      });
    }
  }
  private whmSel(r) {
    this.ls.selectRou(r);
    this.router.navigate(['/map']);
  }
  private whmSel2(o, d) {
    if (this.origin.latitude !== 0 && this.destination.latitude !== 0) {
      this.matrix(this.origin, this.destination);
      const r = {
        orig: this.origin,
        dest: this.destination,
        dur: '',
        dis: ''
      };
      r.orig.name = o;
      r.dest.name = d;
      this.x = r;
      this.ls.selectRou(r);
      this.router.navigate(['/map']);
    }
  }
  private whmDel(i) {
    this.ls.remRou(i);
  }
  private setCurLoc() {
    this.origin = this.myPos;
    this.destinationInput.setValue('My Location');
  }
  private matrix(wo, wd) {
    this.mapsAPILoader.load().then(() => {
      const me = this;
      const orig1 = new google.maps.LatLng(wo.latitude, wo.longitude);
      const dest1 = new google.maps.LatLng(wd.latitude, wd.longitude);

      const matrix = new google.maps.DistanceMatrixService();
      matrix.getDistanceMatrix(
        {
          origins: [orig1],
          destinations: [dest1],
          travelMode: 'DRIVING'
        }, (response, status) => {
          me.x.dur = response.rows[0].elements[0].duration.text;
          me.x.dis = response.rows[0].elements[0].distance.text;
          this.ls.selectRou(me.x);
          this.ls.addRou(me.x);
        });
    });
  }
}
