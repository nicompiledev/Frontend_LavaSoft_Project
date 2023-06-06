import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalReserveService } from 'src/app/services/styles/modal/modal-reserve.service';
import { UsuarioService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss']
})
export class ReportesComponent {

  ReportForm: FormGroup;

  constructor(private modal:ModalReserveService, private fb: FormBuilder, private usuarioService: UsuarioService, private route: ActivatedRoute) {
    // razon: text, tipo: select, descripcion: textarea:
    this.ReportForm = this.fb.group({
      razon: ['', [Validators.required]],
      tipo_reporte: ['', [Validators.required]],
      descripcion: ['', [Validators.required]]
    });
  }

  closeModal(stateModal:boolean , focus:string){
    this.modal.estadomodal(stateModal , focus);
  }

  enviarReporte(){

    if(this.ReportForm.valid){

      // Advertencia de no enviar reportes falsos o su cuenta sera suspendida:

      // cancelar el envio del reporte
      Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: 'Recuerde que no debe enviar reportes falsos, de lo contrario su cuenta sera suspendida',
        showConfirmButton: true,
        confirmButtonText: 'Enviar',
        showCancelButton: true,
        cancelButtonText: 'Cancelar'
      }).then((result)=>{
        if(result.isConfirmed){
          this.enviarReporte2();
        }
      });
    }else{
      this.ReportForm.markAllAsTouched();

    }
  }


  enviarReporte2(){

    let razon = this.ReportForm.get('razon')?.value;
    let tipo = this.ReportForm.get('tipo_reporte')?.value;
    let descripcion = this.ReportForm.get('descripcion')?.value;
    // traer el id lavadero url:
    const id_lavadero = this.route.snapshot.paramMap.get('id');

    this.usuarioService.reportarLavadero(id_lavadero, razon, tipo, descripcion).subscribe(
      (res:any)=>{
        this.closeModal(false, 'reports');

        Swal.fire({
          icon: 'success',
          title: 'Reporte enviado',
          text: res.msg,
          showConfirmButton: true,
          confirmButtonText: 'Ok',

        });

      },
      (err:any)=>{
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.error.msg,
          showConfirmButton: true,
          confirmButtonText: 'Ok',
        });
      }
    );
  }
}
