import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.scss']
})
export class ReserveComponent implements OnInit {

  mounth: string;
  days: string[] = ['Dom','Lun','Mar','Mie','Jue','Vie','Sab'];
  day: any[] = [] ;
  index: number = 0;

  ngOnInit(): void {
 
    let today =  new Date();
    for( let i = 0 ; i <= 7 ; i++ ) {
      let date = new Date(today);
      date.setDate(today.getDate() + i)
      this.day.push({index: i, day: this.days[date.getDay()] , date: date.getDate()})
    }
    console.log(this.day);
    
  }

  cambiar(index): void {
    this.index = index;
  }
  constructor(){

    
  }
}
