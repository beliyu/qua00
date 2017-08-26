import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AgmCoreModule } from '@agm/core';
import { AppComponent } from './app.component';
import { DirectionsMapDirective } from './direction-map.directive';
import { MapComponent } from './map/map.component';
import { TableComponent, Table2Component } from './table';
import { LocalService } from './local.service';

@NgModule({
  declarations: [
    AppComponent,
    DirectionsMapDirective,
    MapComponent,
    TableComponent, Table2Component
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD10M3NIuxY7fwqE39-_9cYz8SsLJ6Bv9E',
      libraries: ['places']
    })
  ],
  providers: [LocalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
