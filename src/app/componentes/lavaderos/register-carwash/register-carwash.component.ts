import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { DeparatamentosService } from 'src/app/services/departamentos/deparatamentos.service';
import * as mapboxgl from 'mapbox-gl';
import { LoaderService } from 'src/app/services/styles/loaders/loader.service';
import { LavaderoService } from 'src/app/services/lavadero.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-carwash',
  templateUrl: './register-carwash.component.html',
  styleUrls: ['./register-carwash.component.scss'],
})
export class RegisterCarwashComponent implements OnInit {
  //el formulario
  lavaderoForm: FormGroup;
  files: File[] = [];
  selectedVehicles: string[] = [];

  //MAP
  map!: mapboxgl.Map;
  zoomInicial = 13;
  latitud: string;
  logintud: string;

  //  departamentos y ciudades
  depJson: any[] = [];
  departamentos: any[] = [];
  ciudadesFiltradas: any[] = [];
  departamentoSeleccionado: string = '';

  constructor(
    private fb: FormBuilder,
    private lavadero: LavaderoService,
    private http: HttpClient,
    public loader: LoaderService,
    private departamentosService: DeparatamentosService,
    private router: Router,
  ) {
    this.lavaderoForm = this.fb.group({
      // Pagina 1
      NIT: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(10),
      ]),
      nombreLavadero: new FormControl('', [Validators.required]),
      siNoLoRecogen: new FormControl('', [Validators.required]),
      imagenes: new FormControl('', [Validators.required]),

      // Pagina 2
      departamento: new FormControl('', [Validators.required]),
      ciudad: new FormControl('', [Validators.required]),
      direccion: new FormControl('', [Validators.required]),
      sector: new FormControl('', [Validators.required]),
      tipoVehiculo: new FormControl(this.selectedVehicles, Validators.required),

      // Pagina 3
      correo_electronico: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      telefono: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
      ]),
      espacios_de_trabajo: new FormControl('', [Validators.required, Validators.min(1), Validators.max(25)]),

      hora_apertura: new FormControl('', [Validators.required]),
      hora_cierre: new FormControl('', [Validators.required]),
      // Pendiente dia que no trabaja

      // Pagina 4
      mapa: new FormControl(this.latitud, Validators.required),
            // Hora de apertura no puede ser mayor a la hora de cierre
      // Hora de cierre no puede ser menor a la hora de apertura
    });
  }

  obtenerDepartamentos() {
    const departamentos = this.depJson.map((item) => item.departamento);
    return departamentos.filter(
      (value, index, self) => self.indexOf(value) === index
    );
  }

  filtrarCiudades() {
    const departamentoSeleccionado =
      this.lavaderoForm.get('departamento').value;
    this.ciudadesFiltradas = this.depJson.filter(
      (item) => item.departamento === departamentoSeleccionado
    );
  }

  ngOnInit() {
    this.departamentosService.getDepartamento().subscribe((object: any) => {
      this.depJson = object;
      this.departamentos = this.obtenerDepartamentos();
    });

    (mapboxgl as any).accessToken =
      'pk.eyJ1Ijoia2V2aW5vcnRlZ2EiLCJhIjoiY2xocWg3M3I3MDJ4OTNwbmtjaHNqeGg5ZCJ9.r8eGnQZEtKmjEpKtAVoopA';

    const latitudInicial = 4.53073602194441;
    const longitudInicial = -75.6926135253908;
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
    this.map.on('click', (e: any) => {
      if (marker) {
        marker.remove();
      }
      marker = new mapboxgl.Marker().setLngLat(e.lngLat).addTo(this.map);
      console.log(e);
      this.latitud = e.lngLat.lat;
      this.logintud = e.lngLat.lng;
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

  onFileSelected(event) {
    this.files = event.target.files;
  }

  finalizar() {
    // Loaders
    this.loader.showLoader();

    const formData = new FormData();
    formData.append('NIT', this.lavaderoForm.get('NIT').value);
    formData.append(
      'nombreLavadero',
      this.lavaderoForm.get('nombreLavadero').value
    );
    formData.append(
      'siNoLoRecogen',
      this.lavaderoForm.get('siNoLoRecogen').value
    );
    formData.append('departamento', this.lavaderoForm.get('departamento').value);
    formData.append('ciudad', this.lavaderoForm.get('ciudad').value);
    formData.append('sector', this.lavaderoForm.get('sector').value);
    formData.append('direccion', this.lavaderoForm.get('direccion').value);
    formData.append('telefono', this.lavaderoForm.get('telefono').value);
    formData.append('correo_electronico',this.lavaderoForm.get('correo_electronico').value);
    formData.append('hora_apertura', this.lavaderoForm.get('hora_apertura').value);
    formData.append('hora_cierre', this.lavaderoForm.get('hora_cierre').value);
    formData.append('espacios_de_trabajo',this.lavaderoForm.get('espacios_de_trabajo').value);
    formData.append('longitud', this.logintud);
    formData.append('latitud', this.latitud);

    for (let i = 0; i < this.selectedVehicles.length; i++) {
      formData.append('tipoVehiculos', this.selectedVehicles[i]);
    }

    for (let i = 0; i < this.files.length; i++) {
      formData.append('images', this.files[i]);
    }

    // ver todos los datos de formData
    formData.forEach((value, key) => {
      console.log(`Clave: ${key}, Valor: ${value}`);
    });

    this.lavadero
      .registrarLavadero(formData)
      .pipe(
        finalize(() => {
          this.loader.hideLoader();
        })
      )
      .subscribe(
        (response: any) => {
          Swal.fire({
            title: 'Registro exitoso',
            text: response.msg,
            icon: 'success',
            confirmButtonText: 'Aceptar',
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/inicio']);
            }
          });
        },
        (error) => {
          Swal.fire({
            title: 'Error',
            text: error.error.msg,
            icon: 'error',
            confirmButtonText: 'Aceptar',
          });
        }
      );
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

  // paginacion del formulario
  marginLeft: string = '0%';
  elementos: { contenido: string; activo: boolean; texto: string }[] = [
    { contenido: '1', activo: true, texto: 'Datos.' },
    { contenido: '2', activo: false, texto: 'Ubic.' },
    { contenido: '3', activo: false, texto: 'Contacto.' },
    { contenido: '4', activo: false, texto: 'Mapa.' },
  ];

  camposPorPagina = [
    [],
    ['NIT', 'nombreLavadero', 'siNoLoRecogen', 'imagenes'],
    ['departamento', 'ciudad', 'direccion', 'sector'],
    [
      'correo_electronico',
      'telefono',
      'espacios_de_trabajo',
      'hora_apertura',
      'hora_cierre',
    ],
    ['mapa'],
  ];

  siguiente(lugar: string) {
    // Validar campos del lugar actual para que no se pase a la siguiente pagina
    const paginaActual = parseInt(lugar) - 1;
    const camposAValidar = this.camposPorPagina[paginaActual];
    let camposValidos = true;
    this.lavaderoForm.markAllAsTouched();
    for (let campo of camposAValidar) {
      if (!this.lavaderoForm.get(campo).valid) {
        camposValidos = false;
        break;
      }
    }

    if (!camposValidos) {
      return;
    }

    if (lugar === '3' && this.selectedVehicles.length === 0) {
      return;
    }

    this.lavaderoForm.markAsUntouched();
    for (let i = 0; i < this.elementos.length; i++) {
      if (this.elementos[i].contenido === lugar) {
        this.marginLeft = '-' + i * 25 + '%';
        this.elementos[i].activo = true;
        this.elementos[i - 1].contenido = '✓';
      }
    }
  }

  anterior(lugar: string) {
    for (let i = 0; i < this.elementos.length; i++) {
      if (this.elementos[i].contenido === lugar) {
        this.marginLeft = '-' + (i - 1) * 25 + '%';
        this.elementos[i].activo = false;
        this.elementos[i - 1].contenido = i.toString();
      }
    }
  }

  // MAPA

  searchCity() {
    try {
      this.http
        .get(
          'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
            this.lavaderoForm.get('mapa').value +
            '.json?access_token=' +
            'pk.eyJ1Ijoia2V2aW5vcnRlZ2EiLCJhIjoiY2xocWg3M3I3MDJ4OTNwbmtjaHNqeGg5ZCJ9.r8eGnQZEtKmjEpKtAVoopA'
        )
        .subscribe((res: any) => {
          this.map.flyTo({
            center: res.features[0].center,
            zoom: this.zoomInicial,
          });
        });
    } catch (error) {
      // Manejar el error de alguna manera, por ejemplo, imprimirlo en la consola sin interrumpir la ejecución:
      console.log('Error en la solicitud a la API de Mapbox:', error);
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
}
