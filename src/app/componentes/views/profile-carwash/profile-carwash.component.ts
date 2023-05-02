import { Component, OnInit } from '@angular/core';
import { ModalReserveService } from 'src/app/services/styles/modal/modal-reserve.service';

@Component({
  selector: 'app-profile-carwash',
  templateUrl: './profile-carwash.component.html',
  styleUrls: ['./profile-carwash.component.scss']
})
export class ProfileCarwashComponent  implements OnInit {
  constructor(private modal_service:ModalReserveService){}
  active:boolean = false;

  ngOnInit(): void {
   this.modal_service.$modal_reserve.subscribe((valor)=>{this.active = valor})
  }

}
