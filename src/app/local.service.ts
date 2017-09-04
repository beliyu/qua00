import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class LocalService {
  public mapRoutes;
  public curRoute = {
    'orig': {
      'longitude': 20.6885667,
      'latitude': 43.7240916,
      'name': 'Cara Lazara, Kraljevo'
    }, 'dest': {
      'longitude': 20.3490749,
      'latitude': 43.897127,
      'name': 'Takovska, Čačak'
    }
  };

  constructor(public http: Http) {
    this.getls();
    // this.prox('Vancouver+BC|Seattle', 'San+Francisco|Victoria+BC');
  }

  prox (o, d) {
    this.http.get('/api?origins=' + o + '&destinations=' + d + '&mode=driving&'
      + 'key=AIzaSyD10M3NIuxY7fwqE39-_9cYz8SsLJ6Bv9E')
      .map((res: Response) => res.json());
      // .subscribe((data) => console.log(data.rows[0].elements[0]) );
  }

  getls() {
    const rObject = localStorage.getItem('wrou');
    this.mapRoutes = rObject ? JSON.parse(rObject) : [];
  }
  setls(r) {
    localStorage.setItem('wrou', JSON.stringify(r));
  }

  addRou(r) {
    if (this.mapRoutes.length > 9) {
      this.mapRoutes.splice(9);
    }
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
