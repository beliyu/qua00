import { Injectable } from '@angular/core';

@Injectable()
export class LocalService {
public mapRoutes = [];
public curRoute = {};

  constructor() { this.getls(); }

  getls() {
    const retrievedObject = localStorage.getItem('wrou');
    this.mapRoutes = JSON.parse(retrievedObject);
  }
  setls(r) {
    localStorage.setItem('wrou', JSON.stringify(r));
  }

  addRou(r) {
    this.mapRoutes.unshift(r);
    this.setls(this.mapRoutes);
  }
  selectRou(i) {
    this.curRoute = this.mapRoutes[i];
  }
}