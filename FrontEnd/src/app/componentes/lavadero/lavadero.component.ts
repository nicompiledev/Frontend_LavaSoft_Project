import { Component } from '@angular/core';
import { HorarioService } from 'src/app/services/reserva/horario.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lavadero',
  templateUrl: './lavadero.component.html',
  styleUrls: ['./lavadero.component.scss']
})
export class LavaderoComponent {
  horasDisponibles: string[] = [];
  miFormulario: FormGroup;

  constructor(private horarioService: HorarioService, private fb: FormBuilder, private route: ActivatedRoute) {
    this.miFormulario = this.fb.group({
      id_lavadero: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required]
    });
  }

  ngOnInit(): void {

    this.horarioService.horasD$.subscribe(horas => {
      this.horasDisponibles = horas.slice();
    });

    this.actualizarHorario();

  }

  seleccionarHora(hora: string){
    let parametro = this.route.snapshot.paramMap.get('id');
    let object = {
      id_lavadero : parametro,
      fecha : '2023-03-20',
      hora
    }
    this.horarioService.reservar(object)
    this.actualizarHorario();
  }

  actualizarHorario(){
    //let id_lavadero = '641344c2a4489bbd6bd9e90f';
    let id_lavadero = this.route.snapshot.paramMap.get('id');
    let fecha = '2023-03-20'
    let object = {id_lavadero, fecha}
    this.horarioService.listarHorario(object);
  }
}
