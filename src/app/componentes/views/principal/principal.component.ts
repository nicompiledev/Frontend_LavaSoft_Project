import { Component, OnInit } from '@angular/core';
import { ModalReserveService } from 'src/app/services/styles/modal/modal-reserve.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {
 constructor(private modal_service:ModalReserveService){}

  activeModal: number = 0;

  ngOnInit(): void {
    this.modal_service.$modal.subscribe(valor => {
      this.activeModal = valor
    })
    
  }


  closeModal(){
    this.activeModal = 0
  }

}
