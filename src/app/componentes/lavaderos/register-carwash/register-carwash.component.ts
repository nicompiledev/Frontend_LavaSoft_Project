import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';
import { HttpClient } from '@angular/common/http';

import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-register-carwash',
  templateUrl: './register-carwash.component.html',
  styleUrls: ['./register-carwash.component.scss']
})
export class RegisterCarwashComponent  implements OnInit {
  //el formulario
  lavaderoForm: FormGroup;
  files: File[] = [];

  //MAP
  map!: mapboxgl.Map;
  zoomInicial = 13;
  latitud: string;
  logintud: string;

  constructor(private fb: FormBuilder, private admin: AdminService, private http: HttpClient) {
    this.lavaderoForm = this.fb.group({
      nit: new FormControl ('' ,[Validators.required, Validators.minLength(8)]),
      nombreLavadero: new FormControl ('' ,[Validators.required]),
      descripcion: new FormControl ('' ,[Validators.required , ]),
      ciudad: new FormControl ('' ,[Validators.required]),
      direccion: new FormControl ('' ,[Validators.required]),
      telefono:new FormControl ('', [Validators.required, Validators.minLength(10),Validators.maxLength(10)]),
      correo_electronico: new FormControl ('', [Validators.required, Validators.email]),
      contrasena: new FormControl ('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      hora_apertura: new FormControl ('', [Validators.required ]),
      hora_cierre: new FormControl ('', [Validators.required]),
      espacios_de_trabajo:new FormControl ('' , [Validators.required]),
      tipoVehiculo: new FormControl ('' ,[Validators.required]),
      siNoLoRecojen: new FormControl ('' ,[Validators.required ,Validators.minLength(80)]),
      imagenes: new FormControl ('' ,[Validators.required]),
      ubicacion: new FormControl ('' ,[Validators.required]),
      mapa: new FormControl ('')
    });
  }

  ngOnInit() {
    (mapboxgl as any).accessToken = "pk.eyJ1Ijoia2V2aW5vcnRlZ2EiLCJhIjoiY2xocWg3M3I3MDJ4OTNwbmtjaHNqeGg5ZCJ9.r8eGnQZEtKmjEpKtAVoopA"

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
      console.log(e)
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
    const formData = new FormData();
    formData.append('NIT', this.lavaderoForm.get('nit').value);
    formData.append('nombreLavadero', this.lavaderoForm.get('nombrelavadero').value);
    formData.append('descripcion', this.lavaderoForm.get('descripcion').value);
    formData.append('ciudad', this.lavaderoForm.get('ciudad').value);
    formData.append('direccion', this.lavaderoForm.get('direccion').value);
    formData.append('telefono', this.lavaderoForm.get('telefono').value);
    formData.append('correo_electronico', this.lavaderoForm.get('correo_electronico').value);
    formData.append('hora_apertura', this.lavaderoForm.get('hora_apertura').value);
    formData.append('hora_cierre', this.lavaderoForm.get('hora_cierre').value);
    formData.append('espacios_de_trabajo', this.lavaderoForm.get('espacios_de_trabajo').value);
    //formData.append('tipoVehiculo', this.lavaderoForm.get('tipoVehiculo').value);
    formData.append('siNoLoRecojen', this.lavaderoForm.get('siNoLoRecojen').value);
    formData.append('longitud', this.logintud);
    formData.append('latitud', this.latitud);

    for (let i = 0; i < this.files.length; i++) {
      formData.append('images', this.files[i]);
    }

    this.admin.registrarLavadero(formData).subscribe(
      (response) => {
        console.log('Datos enviados correctamente', response);
      },
      (error) => {
        console.log(error)
      }
    );
  }

  //validar soloNumeros

  soloNumeros(event: KeyboardEvent): boolean {
    const tecla = event.keyCode;
    if (tecla > 31 && (tecla < 48 || tecla > 57)) {
      event.preventDefault();
      return false;
    }
    return true;
  }

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
    { contenido: '2', activo: false, texto: 'Nac.' },
    { contenido: '3', activo: false, texto: 'Contac.' },
    { contenido: '4', activo: false, texto: 'Pass.' },
  ];
  camposPorPagina = [
    [], // No se requiere validación para avanzar a la primera página
    ['name', 'lastname'], // Campos a validar en la página 1
    ['fecha_nacimiento', 'genero'], // Campos a validar en la página 2
    ['email', 'cel'], // Campos a validar en la página 3
    ['password', 'confimar_password'], // Campos a validar en la página 4
  ];

  siguiente(lugar: string) {

      for (let i = 0; i < this.elementos.length; i++) {
        if (this.elementos[i].contenido === lugar) {
          console.log(lugar);
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
    this.http
      .get(
        'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
        this.lavaderoForm.get('mapa').value  +
          '.json?access_token=' +
          "pk.eyJ1Ijoia2V2aW5vcnRlZ2EiLCJhIjoiY2xocWg3M3I3MDJ4OTNwbmtjaHNqeGg5ZCJ9.r8eGnQZEtKmjEpKtAVoopA"
      )
      .subscribe((res: any) => {
        this.map.flyTo({
          center: res.features[0].center,
          zoom: this.zoomInicial,
        });
      });
  }
}
