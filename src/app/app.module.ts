import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AgmCoreModule } from '@agm/core';
import { AppComponent } from './app.component';
import { DirectionsMapDirective } from './direction-map.directive';

@NgModule({
  declarations: [
    AppComponent,
    DirectionsMapDirective
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD10M3NIuxY7fwqE39-_9cYz8SsLJ6Bv9E'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
