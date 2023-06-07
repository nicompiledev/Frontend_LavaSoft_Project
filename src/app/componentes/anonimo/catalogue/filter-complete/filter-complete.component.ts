import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-filter-complete',
  templateUrl: './filter-complete.component.html',
  styleUrls: ['./filter-complete.component.scss'],
})

export class FilterCompleteComponent implements OnInit {
  //MAP
  map!: mapboxgl.Map;
  zoomInicial = 13;
  latitud: string;
  logintud: string;


  selectedVehicles: string[] = [];
  

  ngOnInit(): void {
    (mapboxgl as any).accessToken =
      'pk.eyJ1Ijoia2V2aW5vcnRlZ2EiLCJhIjoiY2xocWg3M3I3MDJ4OTNwbmtjaHNqeGg5ZCJ9.r8eGnQZEtKmjEpKtAVoopA';

    const latitudInicial = 4.53073602194441;
    const longitudInicial = -75.6926135253908;
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [longitudInicial, latitudInicial],
      zoom: this.zoomInicial,
      minZoom: 11, // Limita el zoom out
      maxZoom: 15, // Limita el zoom in
      touchZoomRotate: false, // Desactiva la función de zoom y rotación en dispositivos táctiles
      interactive: true, // Activa la interacción con el mapa
      dragPan: true, // Permite arrastrar el mapa
      scrollZoom: true, // Permite hacer zoom con el desplazamiento del mouse
      attributionControl: true, // Muestra la atribución de los datos del mapa
    });

    this.map.on('moveend', () => {
      const { lng, lat } = this.map.getCenter();
      this.latitud = lat.toFixed(4);
      this.logintud = lng.toFixed(4);
      console.log(this.latitud, this.logintud);
    });
    this.map.on('zoom', () => {
      const zoom = this.map.getZoom();
      console.log(zoom);
    });

    const buscarLavaderosControl = new BuscarLavaderosControl();
    // En el centro arriba:
    this.map.addControl(buscarLavaderosControl, 'top-left');
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


class BuscarLavaderosControl {
  map: mapboxgl.Map;
  container: HTMLDivElement;
  button: HTMLButtonElement;
 

  onAdd(map) {
    this.map = map;

    this.container = document.createElement('div');
    this.container.className = 'mapboxgl-ctrl mapboxgl-ctrl-group';
    this.container.style.margin = '10px'; // Ejemplo de estilo aplicado al contenedor

    this.button = document.createElement('button');
    this.button.type = 'button';
    this.button.innerHTML = 'Buscar';
    this.button.style.padding = '5px'; // Ejemplo de estilo aplicado al botón
    this.button.style.background = '#2196F3'; // Ejemplo de estilo aplicado al botón
    this.button.style.color = 'white'; // Ejemplo de estilo aplicado al botón
    this.button.style.width = '100%';
    this.button.style.fontSize = '.7rem';
    this.button.style.borderRadius = '5px';
    this.button.addEventListener('click', () => {
      console.log(this.map.getCenter());
      
    });

    this.container.appendChild(this.button);
    return this.container;
  }

  onRemove() {
    this.container.parentNode.removeChild(this.container);
    this.map = undefined;
  }


   
  
}
