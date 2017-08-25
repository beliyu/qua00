import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AgmCoreModule } from '@agm/core';
import { AppComponent } from './app.component';
import { DirectionsMapDirective } from './direction-map.directive';
import { MapComponent } from './map/map.component';
import { TableComponent } from './table/table.component';

@NgModule({
  declarations: [
    AppComponent,
    DirectionsMapDirective,
    MapComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD10M3NIuxY7fwqE39-_9cYz8SsLJ6Bv9E',
      libraries: ['places']
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
