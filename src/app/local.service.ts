import { Injectable } from '@angular/core';

@Injectable()
export class LocalService {
public mapRoutes = [];
public curRoute = {
  "orig": {
    "longitude": 20.6885667,
    "latitude": 43.7240916,
    "name": "Cara Lazara, Kraljevo"
  },"dest": {
    "longitude": 20.3490749,
    "latitude": 43.897127,
    "name": "Takovska, Čačak"}};

  constructor() { this.getls(); }

  getls() {
    const retrievedObject = localStorage.getItem('wrou');
    this.mapRoutes = JSON.parse(retrievedObject);
  }
  setls(r) {
    localStorage.setItem('wrou', JSON.stringify(r));
  }

  addRou(r) {
    this.mapRoutes = [... this.mapRoutes];
    this.mapRoutes.unshift(r);
    this.setls(this.mapRoutes);
  }
  selectRou(i) {
    this.curRoute = i;
  }
  remRou(i) {
    this.mapRoutes.splice(i, 1);
    this.setls(this.mapRoutes);
  }
}
