import { Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Component, trigger, state, animate, transition, style } from '@angular/core';

@Component({
  selector: 'table2-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `

    <table class="table">
    <tr>
      <th>#</th>
      <th>Origin place</th>
      <th>Destination</th>
      <th> Distance </th>
      <th> Duration </th>
      <th>Delete</th>
    </tr>
    <tr *ngFor="let w of data let i=index" [@anBoja]="'in'" >
      <td>{{i+1}}</td>
      <td (click)="buttSel.emit(w)"> {{w.orig.name}} </td>
      <td (click)="buttSel.emit(w)"> {{w.dest.name}} </td>
      <td (click)="buttSel.emit(w)"> {{w.dis}} </td>
      <td (click)="buttSel.emit(w)"> {{w.dur}} </td>
      <td><button class="btn btn-primary" (click)="buttDel.emit(i)">X</button></td>
    </tr>
  </table>
  `,
  animations: [
    trigger('anBoja', [
      state('in', style({opacity: 1, transform: 'translateX(0)'})),

      transition('* => void',
        [animate('0.3s 0.3s ease-in',
           style({opacity: 0, transform: 'translateX(50px)'}))
        ]),
      transition('void => *',
        [style({ opacity: '0', transform: 'translateY(-50px)'}),
                animate('0.3s')
      ])
    ])
  ],
    styles: [`
    td {
      cursor: pointer;
    }
    `]
})
export class Table2Component {
@Input() data;
@Output() buttSel = new EventEmitter();
@Output() buttDel = new EventEmitter();

// whTogg(w){this.buttBoja.emit(w);}
// whDel(w){this.buttDel.emit(w);}
}
