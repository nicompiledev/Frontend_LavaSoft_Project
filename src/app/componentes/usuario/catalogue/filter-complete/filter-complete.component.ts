import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-filter-complete',
  templateUrl: './filter-complete.component.html',
  styleUrls: ['./filter-complete.component.scss']
})
export class FilterCompleteComponent implements OnInit{
  
  //MAP
  map!: mapboxgl.Map;
  zoomInicial = 13;
  latitud: string;
  logintud: string;


  ngOnInit(): void {
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
  }

}
