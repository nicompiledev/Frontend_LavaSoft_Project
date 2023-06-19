import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DeparatamentosService } from 'src/app/services/departamentos/deparatamentos.service';
import { LavaderoService } from 'src/app/services/lavadero.service';
import { LoaderService } from 'src/app/services/styles/loaders/loader.service';
import { ModalReserveService } from 'src/app/services/styles/modal/modal-reserve.service';
import { finalize } from 'rxjs';
import Swal from 'sweetalert2';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-edit-profile-carwash',
  templateUrl: './edit-profile-carwash.component.html',
  styleUrls: ['./edit-profile-carwash.component.scss'],
})
export class EditProfileCarwashComponent implements OnInit {
  //MAP
  map!: mapboxgl.Map;
  zoomInicial = 13;
  latitud: string;
  logintud: string;

  lavaderoForm: FormGroup;
  contrasenaForm: FormGroup;
  selectedVehicles: string[] = [];
  //  departamentos y ciudades

  depJson: any[] = [];
  departamentos: any[] = [];
  ciudadesFiltradas: any[] = [];
  departamentoSeleccionado: string = '';

  //modal
  active: boolean;

  lavadero: any;

  constructor(
    private fb: FormBuilder,
    private departamentosService: DeparatamentosService,
    private modal: ModalReserveService,
    private loader: LoaderService,
    private lavaderoService: LavaderoService
  ) {
    this.modal.$modal_reserve.subscribe((valor) => {
      this.active = valor;
    });

    this.lavaderoForm = this.fb.group({
      nit: new FormControl('', [Validators.required, Validators.minLength(8)]),
      nombreLavadero: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required]),
      ciudad: new FormControl('', [Validators.required]),
      direccion: new FormControl('', [Validators.required]),
      telefono: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
      ]),
      correo_electronico: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      hora_apertura: new FormControl('', [Validators.required]),
      hora_cierre: new FormControl('', [Validators.required]),
      espacios_de_trabajo: new FormControl('', [Validators.required]),

      siNoLoRecogen: new FormControl('', [
        Validators.required,
        Validators.minLength(80),
      ]),
      imagenes: new FormControl('', [Validators.required]),
      ubicacion: new FormControl('', [Validators.required]),
      mapa: new FormControl(''),
      departamento: new FormControl('', [Validators.required]),
      sector: new FormControl('', [Validators.required]),
    });

    this.contrasenaForm = new FormGroup(
      {
        contrasena: new FormControl('', [Validators.required]),
        nueva_contrasena: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
        ]),
        confirmar_contrasena: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
        ]),
      },
      { validators: this.validarContrasenasIguales }
    );
  }

  validarContrasenasIguales(group: FormGroup) {
    const password = group.get('nueva_contrasena').value;
    const confirmPassword = group.get('confirmar_contrasena').value;
    console.log(confirmPassword);
    console.log(password);
    return password === confirmPassword
      ? null
      : { contrasenasNoCoinciden: true };
  }

  obtenerDepartamentos() {
    const departamentos = this.depJson.map((item) => item.departamento);
    // Filtrar los departamentos únicos
    return departamentos.filter(
      (value, index, self) => self.indexOf(value) === index
    );
  }

  filtrarCiudades(ciudad?: string) {
    const departamentoSeleccionado =
      this.lavaderoForm.get('departamento').value;
    this.ciudadesFiltradas = this.depJson.filter(
      (item) => item.departamento === departamentoSeleccionado
    );

    if (ciudad) {
      this.lavaderoForm.get('ciudad').setValue(ciudad);
    }
  }

  //modal
  openModal(stateModal: boolean, focus: string) {
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
    this.departamentosService.getDepartamento().subscribe((object: any) => {
      this.depJson = object;
      this.departamentos = this.obtenerDepartamentos();
    });

    this.loader.showLoader();
    // modal service
    this.lavaderoService
      .getLavadero()
      .pipe(
        finalize(() => {
          this.loader.hideLoader();
        })
      )
      .subscribe(
        (lavadero: any) => {
          this.lavadero = lavadero;
          this.cambiarInformaciónFormulario();
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un error, por favor intente más tarde',
          });
        }
      );
  }

  @ViewChild('collapseOne') collapseOne: any;

  cambiarInformaciónFormulario() {
    this.collapseOne.nativeElement.classList.remove('show');

    this.lavaderoForm.patchValue({
      nit: this.lavadero.nit,
      nombreLavadero: this.lavadero.nombreLavadero,
      descripcion: this.lavadero.descripcion,
      departamento: this.lavadero.departamento,
      direccion: this.lavadero.direccion,
      telefono: this.lavadero.telefono,
      correo_electronico: this.lavadero.correo_electronico,
      hora_apertura: this.lavadero.hora_apertura,
      hora_cierre: this.lavadero.hora_cierre,
      espacios_de_trabajo: this.lavadero.espacios_de_trabajo,
      siNoLoRecogen: this.lavadero.siNoLoRecogen,
      sector: this.lavadero.sector,
    });
    console.log(this.lavadero);

    this.filtrarCiudades(this.lavadero.ciudad);

    const vehiculosSeleccionados = this.lavadero.tipoVehiculos;
    vehiculosSeleccionados.forEach((vehiculo) => {
      const inputElement = document.querySelector(
        `input[name="${vehiculo}"]`
      ) as HTMLInputElement;
      if (inputElement) {
        inputElement.checked = true;
      }
    });
    // subir ventana
    window.scrollTo(0, 0);

    (mapboxgl as any).accessToken =
      'pk.eyJ1Ijoia2V2aW5vcnRlZ2EiLCJhIjoiY2xocWg3M3I3MDJ4OTNwbmtjaHNqeGg5ZCJ9.r8eGnQZEtKmjEpKtAVoopA';

    const latitudInicial = this.lavadero.ubicacion.coordinates[1];
    const longitudInicial = this.lavadero.ubicacion.coordinates[0];
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [longitudInicial, latitudInicial],
      zoom: this.zoomInicial,
      touchZoomRotate: false, // Desactiva la función de zoom y rotación en dispositivos táctiles
      interactive: true, // Activa la interacción con el mapa
      dragPan: true, // Permite arrastrar el mapa
      scrollZoom: true, // Permite hacer zoom con el desplazamiento del mouse
      attributionControl: true, // Muestra la atribución de los datos del mapa
    });

    // Elimina marcadores de ubicacion y agregar otro al dar click
    let marker: any;

    this.map.on('load', () => {
      this.map.resize(); // Ajusta el mapa al tamaño del contenedor
      // Agrega un marcador en la ubicación actual
      marker = new mapboxgl.Marker()
        .setLngLat([
          this.lavadero.ubicacion.coordinates[0],
          this.lavadero.ubicacion.coordinates[1],
        ])
        .addTo(this.map);
    });

    this.map.on('click', (e: any) => {
      Swal.fire({
        title: '¿Desea cambiar la ubicación?',
        text: 'Se eliminará la ubicación actual',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, cambiar',
        cancelButtonText: 'No, cancelar',
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          if (marker) {
            marker.remove();
          }
          marker = new mapboxgl.Marker().setLngLat(e.lngLat).addTo(this.map);
          console.log(e);
          this.latitud = e.lngLat.lat;
          this.logintud = e.lngLat.lng;
        }
      });
    });

    this.map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      }),
      'bottom-right'
    );

    this.map.addControl(new mapboxgl.NavigationControl(), 'top-right');
  }

  marcarCheckboxes(valores) {
    // Obtener los checkboxes
    const checkboxes = document.getElementsByName('radio');

    // Iterar sobre los checkboxes y marcar los correspondientes
    for (let i = 0; i < checkboxes.length; i++) {
      const checkbox = checkboxes[i] as HTMLInputElement;
      if (valores.includes(checkbox.value)) {
        checkbox.checked = true;
      }
    }
  }
}
