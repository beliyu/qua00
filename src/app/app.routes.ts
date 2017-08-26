import { Routes, RouterModule } from '@angular/router';
import { MapComponent } from './map/map.component';
import { TableComponent } from './table';
import { NoContentComponent } from './no-content';


export const ROUTES: Routes = [
  { path: '',      component: TableComponent },
  { path: 'table',  component: TableComponent },
  { path: 'map', component: MapComponent },
  { path: '**',    component: NoContentComponent },
];
