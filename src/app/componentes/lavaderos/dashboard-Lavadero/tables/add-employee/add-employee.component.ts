import { Component } from '@angular/core';
import { ModalReserveService } from 'src/app/services/styles/modal/modal-reserve.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent {


  constructor(private modalService:ModalReserveService){}

  closeModal(){
	this.modalService.estadomodal(false , 'add_employee')  
  }
}
