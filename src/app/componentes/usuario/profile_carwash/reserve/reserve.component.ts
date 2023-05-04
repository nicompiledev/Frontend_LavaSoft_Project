import { query } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ModalReserveService } from 'src/app/services/styles/modal/modal-reserve.service';

@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.scss']
})
export class ReserveComponent implements OnInit {

  page2: boolean = false;
  margin:string = '0%';
  days: string[] = ['Dom','Lun','Mar','Mie','Jue','Vie','Sab'];
  day: any[] = [] ;
  index: number = 0;

  ngOnInit(): void {
 
    let today =  new Date();
    for( let i = 0 ; i <= 6 ; i++ ) {
      let date = new Date(today);
      date.setDate(today.getDate() + i)
      this.day.push({index: i, day: this.days[date.getDay()] , date: date.getDate()})
    }
    console.log(this.day);
  }
  ngAfterViewInit(): void {
 
  }page(e): void {
    switch (e) {
      case 'next':
        this.margin = '-100%'
        this.page2 = true;
        break;
      case 'back':
        this.margin = '0%'
        this.page2 = false;
        break;
      case 'end':
        alert('finalizado');
        break;
      default:
        alert('error');
    }
  }


  
  

  cambiar(index): void {
    this.index = index;
  }
  constructor(private modal_service: ModalReserveService){

    
  }

  closeModal(stateModal:boolean , focus:string){
    this.modal_service.estadomodal(stateModal,focus)
  }
}
