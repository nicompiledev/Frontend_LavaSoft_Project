import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DeparatamentosService } from 'src/app/services/departamentos/deparatamentos.service';
import { ModalReserveService } from 'src/app/services/styles/modal/modal-reserve.service';

@Component({
  selector: 'app-edit-profile-carwash',
  templateUrl: './edit-profile-carwash.component.html',
  styleUrls: ['./edit-profile-carwash.component.scss']
})
export class EditProfileCarwashComponent implements OnInit {
  lavaderoForm: FormGroup;
  selectedVehicles: string[] = [];
 //  departamentos y ciudades
  
 depJson:any[] = [];
 departamentos:any[] = [];
 ciudadesFiltradas:any[] = [];
 departamentoSeleccionado: string  = "";


//modal 

active:boolean;
  
  constructor(private fb: FormBuilder,  private departamentosService:DeparatamentosService , private modal: ModalReserveService) {
        

    this.modal.$modal_reserve.subscribe((valor)=>{
     this.active = valor;
    })


    this.lavaderoForm = this.fb.group({
      nit: new FormControl ('' ,[Validators.required, Validators.minLength(8)]),
      nombreLavadero: new FormControl ('' ,[Validators.required]),
      descripcion: new FormControl ('' ,[Validators.required , ]),
      ciudad: new FormControl ('' ,[Validators.required]),
      direccion: new FormControl ('' ,[Validators.required]),
      telefono:new FormControl ('', [Validators.required, Validators.minLength(10),Validators.maxLength(10)]),
      correo_electronico: new FormControl ('', [Validators.required, Validators.email]),
      hora_apertura: new FormControl ('', [Validators.required ]),
      hora_cierre: new FormControl ('', [Validators.required]),
      espacios_de_trabajo:new FormControl ('' , [Validators.required]),
      tipoVehiculo: new FormControl ('' ,[Validators.required]),
      siNoLoRecogen: new FormControl ('' ,[Validators.required ,Validators.minLength(80)]),
      imagenes: new FormControl ('' ,[Validators.required]),
      ubicacion: new FormControl ('' ,[Validators.required]),
      mapa: new FormControl (''),
      departamento: new FormControl ('',[Validators.required]),
      sector: new FormControl ('', [Validators.required])
    });

  }

  obtenerDepartamentos() {
    const departamentos = this.depJson.map(item => item.departamento);
    // Filtrar los departamentos únicos
    return departamentos.filter((value, index, self) => self.indexOf(value) === index);
  }

  filtrarCiudades() {
    const departamentoSeleccionado = this.lavaderoForm.get('departamento').value;
    this.ciudadesFiltradas = this.depJson.filter(item => item.departamento === departamentoSeleccionado);
  }

  //modal
  openModal(stateModal: boolean , focus:string){
    this.modal.estadomodal(stateModal, focus);
  }



  //validar soloNumeros

  bloquearPegado(event: ClipboardEvent): void {
    event.preventDefault();
  }

  validarInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input && input instanceof HTMLInputElement) {
      input.value = input.value.replace(/\D/g, '');
    }
  }

  // Seleccionar vehiculos
  onCheckboxChange(event: any, vehicle: string) {
    const checked = event.target.checked;
    if (checked) {
      this.selectedVehicles.push(vehicle);
    } else {
      const index = this.selectedVehicles.indexOf(vehicle);
      if (index > -1) {
        this.selectedVehicles.splice(index, 1);
      }
    }
  }

  ngOnInit(): void {
    this.departamentosService.getDepartamento().subscribe((object:any)=>{
      this.depJson = object;
      console.log(this.depJson)
       this.departamentos = this.obtenerDepartamentos();
    });
  }
}
