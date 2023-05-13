import { query } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InputService } from 'src/app/services/comunicación/input.service';
import { HorarioService } from 'src/app/services/reserva/horario.service';
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

  // Reserva:
  horasDisponibles: string[] = [];
  horaAM: string[] = [];
  horaPM: string[] = [];
  horaSeleccionada: string = '';

  fechaSeleccionada: any;

  // ID servicio
  idServicio: any;

  constructor(private modal_service: ModalReserveService,
              private horarioService: HorarioService,
              private route: ActivatedRoute,
              private comunicacion: InputService) {
                this.comunicacion.$servicioID.subscribe((servicio: any) => {
                  this.idServicio = servicio;
                })
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

  closeModal(stateModal:boolean , focus:string){
    this.modal_service.estadomodal(stateModal,focus)
  }


  // Reserva:
  seleccionarHora(hora: string){
    this.horaSeleccionada = hora;
  }

  actualizarHorario(fecha: string){
    console.log(fecha);
    let id_lavadero = this.route.snapshot.paramMap.get('id');
    let object = {id_lavadero, fecha, id_servicio: this.idServicio._id}
    this.horarioService.listarHorario(object);
  }

  reservar(){
    let parametro = this.route.snapshot.paramMap.get('id');
    let object = {
      id_lavadero : parametro,
      id_servicio: this.idServicio._id,
      fecha : this.fechaSeleccionada,
      hora_agendada: this.horaSeleccionada,
    }
    this.horarioService.reservar(object);
  }
}
