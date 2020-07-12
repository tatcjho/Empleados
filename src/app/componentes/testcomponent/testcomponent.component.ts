import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-testcomponent',
  templateUrl: './testcomponent.component.html',
  styleUrls: ['./testcomponent.component.scss'],
})
export class TestcomponentComponent implements OnInit {


  @Input() icon:string;
  @Output() finish = new EventEmitter<any>();

  contador: number = 0;

  constructor() { }

  ngOnInit() {}

  calcular(){
    this.contador = this.contador+1;
    this.finish.emit({msg: 'OK', contador: this.contador})

  }

}
