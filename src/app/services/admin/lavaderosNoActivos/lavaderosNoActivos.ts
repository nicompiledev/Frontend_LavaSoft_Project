import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AdminService } from '../../admin.service';


@Injectable({
  providedIn: 'root',
})
export class LavaderosNoActivosService {

  $lavaderosNoActivos = new BehaviorSubject<any>(false);

  constructor(private adminService: AdminService) {}

  lavaderosNoActivos() {
    this.adminService.getLavaderosNoConfirmados().subscribe((response: any) => {
      this.$lavaderosNoActivos.next(response);
    });
  }

}
