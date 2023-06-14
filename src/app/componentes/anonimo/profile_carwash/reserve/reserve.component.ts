
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InputService } from 'src/app/services/comunicación/input.service';
import { HorarioService } from 'src/app/services/reserva/horario.service';
import { SocketService } from 'src/app/services/socket/socket.service';
import { LoaderService } from 'src/app/services/styles/loaders/loader.service';
import { ModalReserveService } from 'src/app/services/styles/modal/modal-reserve.service';
import { UsuarioService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';
import { finalize } from 'rxjs';

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

  // Reserva:
  horasDisponibles: string[] = [];
  horaAM: string[] = [];
  horaPM: string[] = [];
  horaSeleccionada: string = '';

  fechaSeleccionada: any;

  // ID servicio
  ServiciosSeleccionados: any;
  vehiculoSeleccionado: any;

  //modal
  active:boolean = false;

  // Vehiculos del usuario
  vehiculos: any[] = [];

  constructor(private modal_service: ModalReserveService,
              private horarioService: HorarioService,
              private route: ActivatedRoute,
              private comunicacion: InputService,
              private loader: LoaderService,
              private usuarioService: UsuarioService,
              private socket: SocketService) {

                this.loader.showLoader();

                //modal
                this.modal_service.$modal_vehicle.subscribe((valor)=>{
                  this.active = valor;
                });

                this.comunicacion.$servicioID.subscribe((servicios: any) => {
                  this.ServiciosSeleccionados = servicios;
                  this.loader.hideLoader();
                })

                this.socket.io.on('reservaCreada', (mensaje: any) => {
                  this.loader.hideLoader();
                  Swal.fire({
                    title: mensaje.mensaje,
                    icon: mensaje.tipo,
                    confirmButtonText: 'Aceptar'
                  }).then((result) => {
                    if (result.isConfirmed) {
                      this.closeModal(false, 'reserve')
                    }
                  })
                });
              }

  ngOnInit(): void {
    let today =  new Date();
    for( let i = 0 ; i <= 7 ; i++ ) {
      let date = new Date(today);
      date.setDate(today.getDate() + i)
      // index, dia, numero, fecha en format YYYY-MM-DD
      this.day.push({index: i, day: this.days[date.getDay()] , date: date.getDate(), dateISO: date.toISOString().slice(0, 10)});
    }

    // Reserva:
    this.horarioService.horasD$.subscribe(horas => {
      this.horasDisponibles = horas.slice();  // slice() para copiar el array
      // Si contiene la palabra PM
      this.horaPM = this.horasDisponibles.filter(hora => hora.includes('PM'));
      // Si contiene la palabra AM
      this.horaAM = this.horasDisponibles.filter(hora => hora.includes('AM'));
    });

    this.fechaSeleccionada = today.toISOString().slice(0, 10);

    this.actualizarHorario(this.fechaSeleccionada);

    // Vehiculos del usuario
    this.loader.showLoader();
    this.usuarioService.getPerfil()
    .pipe(finalize(() => {
      this.loader.hideLoader();
    }))
    .subscribe((usuario: any) => {
      this.vehiculos = usuario.vehiculos;
    });

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
    }
  }

  cambiar(index: any): void {
    this.index = index.index;
    this.fechaSeleccionada = index.dateISO;
    this.actualizarHorario(this.fechaSeleccionada);
  }

  scrollPrevious() {
    const container = document.getElementById('container');
    container.scrollBy({ left: -80, behavior: 'smooth' });
  }
  scrollNext() {
    const container = document.getElementById('container');
    container.scrollBy({ left: 80, behavior: 'smooth' });
  }


  //modal

  openModal(stateModal: Boolean , focus:string ){
    this.modal_service.estadomodal(stateModal , focus)
    console.log(stateModal)
  }

  closeModal(stateModal:boolean , focus:string){
    this.modal_service.estadomodal(stateModal,focus)
  }


  // Reserva:
  seleccionarHora(hora: string){
    this.horaSeleccionada = hora;
  }

  actualizarHorario(fecha: string){
    let id_servicios = this.ServiciosSeleccionados.map(servicio => servicio._id);
    let id_lavadero = this.route.snapshot.paramMap.get('id');
    let object = {id_lavadero, fecha, id_servicios};
    this.horarioService.listarHorario(object);
  }

  reservar(){
    if(this.horaSeleccionada == ''){
      Swal.fire({
        title: 'Seleccione una hora',
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      })
      return;
    }

    if(this.vehiculos.length == 0){
      Swal.fire({
        title: 'Debes seleccionar un vehiculo',
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      })
      return;
    }

    let id_servicios = this.ServiciosSeleccionados.map(servicio => servicio._id);
    let parametro = this.route.snapshot.paramMap.get('id');
    let object = {
      id_lavadero : parametro,
      id_servicios : id_servicios,
      fecha : this.fechaSeleccionada,
      hora_agendada: this.horaSeleccionada,
      vehiculo: this.vehiculoSeleccionado
    }

    console.log(object);
    

    this.horarioService.reservar(object);
    this.loader.showLoader();
  }

  // Vehiculos del usuario
  onSelectVehiculo(vehiculo: any){
    let id_vehiculo = vehiculo.target.value;
    // traer todos los datos del vehiculo
    this.vehiculoSeleccionado = this.vehiculos.find(vehiculo => vehiculo._id == id_vehiculo);
  }

  sumaTotal(){
    let total = 0;
    this.ServiciosSeleccionados.forEach(servicio => {
      total += servicio.costo;
    });
    return total;
  }
}
