import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AgmCoreModule } from '@agm/core';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
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
