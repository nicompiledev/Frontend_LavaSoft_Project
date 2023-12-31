import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { FilterService } from 'src/app/services/filtro/filter.service';
import { LoaderService } from 'src/app/services/styles/loaders/loader.service';
import { finalize } from 'rxjs';
import { anonimoService } from 'src/app/services/anonimo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filter-complete',
  templateUrl: './filter-complete.component.html',
  styleUrls: ['./filter-complete.component.scss'],
})
export class FilterCompleteComponent implements OnInit {
  ciudad: string;
  departamento: string;
  loadingMap: boolean = false;

  constructor(
    private anonimoService: anonimoService,
    private filterService: FilterService,
    private loader: LoaderService,
    private http: HttpClient,
    private router: Router
  ) {

    this.filterService.filters$.subscribe(([departamento, ciudad]) => {
      // Realiza la lógica de filtrado y muestra los lavaderos actualizados

      if (
        (departamento || ciudad) &&
        (departamento != this.departamento || ciudad != this.ciudad)
      ) {
        this.departamento = departamento;
        this.ciudad = ciudad;

        let ubicacion = `Colombia, ${departamento}, ${ciudad}`;
        try {

          this.loadingMap = true;

          this.http
            .get(
              'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
                ubicacion +
                '.json?access_token=pk.eyJ1Ijoia2V2aW5vcnRlZ2EiLCJhIjoiY2xocWg3M3I3MDJ4OTNwbmtjaHNqeGg5ZCJ9.r8eGnQZEtKmjEpKtAVoopA'
            )
            .pipe(
              finalize(() => {
                this.loadingMap = false;
              })
            )
            .subscribe(async (res: any) => {
              // Obtener los puntos de la base de datos y agregarlos a la fuente
              this.obtenerPuntosDesdeBaseDeDatos(
                res.features[0].center[0],
                res.features[0].center[1]
              ); // Aquí debes implementar la lógica para obtener los puntos desde la base de datos

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
    });
  }

  obtenerPuntosDesdeBaseDeDatos(lng: number, lat: number) {
    const features = []; // Array para almacenar los puntos

    // Llamada a la API y procesamiento de la respuesta
    this.loadingMap = true;
    this.anonimoService
      .getLavaderosRadio(lng, lat)
      .pipe(
        finalize(() => {
          this.loadingMap = false;
        })
      )
      .subscribe(
        (response: any) => {
          // Procesar la respuesta de la API y agregar los puntos al arra
          response.forEach((item: any) => {
            let longitud: number = item.ubicacion.coordinates[0];
            let latitud: number = item.ubicacion.coordinates[1];
            const feature = {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [longitud, latitud],
              },
              properties: {
                id: item._id,
                title: item.nombreLavadero,

              },
            };
            features.push(feature);
          });
          // Remover la capa y fuente existente
          if (this.map.getLayer('lavaderos')) {
            this.map.removeLayer('lavaderos');
          }
          if (this.map.getSource('lavaderos')) {
            this.map.removeSource('lavaderos');
          }

          // Agregar la nueva fuente y capa con los puntos actualizados
          this.map.addSource('lavaderos', {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: features,
            },
          });

          this.map.addLayer({
            id: 'lavaderos',
            type: 'symbol',
            source: 'lavaderos',
            layout: {
              'icon-image': 'car-wash',
              'icon-size': 0.04,
              'icon-allow-overlap': true,
              'text-field': ['get', 'title'],
              'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
              'text-offset': [0, 1.25],
              'text-size': 10,
              'text-anchor': 'top',
            },
          });

          // Agregar el popup
          this.map.on('click', 'lavaderos', (e: any) => {
            this.router.navigate(['/profile_carwash', e.features[0].properties.id]);
          });

          // Cambiar el cursor cuando se pase sobre un punto
          this.map.on('mouseenter', 'lavaderos', () => {
            this.map.getCanvas().style.cursor = 'pointer';
          });

          // Cambiar el cursor cuando se deje de pasar sobre un punto
          this.map.on('mouseleave', 'lavaderos', () => {
            this.map.getCanvas().style.cursor = '';
          });
        },
        (error) => {
          // Manejar el error de alguna manera
        }
      );
  }

  //MAP
  map!: mapboxgl.Map;
  zoomInicial = 12;
  latitud: string;
  logintud: string;

  vehiculoSeleccionado: string = '';
  mejorCalificados: boolean = false;

  ngOnInit(): void {
    (mapboxgl as any).accessToken =
      'pk.eyJ1Ijoia2V2aW5vcnRlZ2EiLCJhIjoiY2xocWg3M3I3MDJ4OTNwbmtjaHNqeGg5ZCJ9.r8eGnQZEtKmjEpKtAVoopA';

    const latitudInicial = 4.53073602194441;
    const longitudInicial = -75.6926135253908;
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/kevinortega/clirpewpz01oi01qg6lso5p7x',
      center: [longitudInicial, latitudInicial],
      zoom: this.zoomInicial,
      maxZoom: 15, // Limita el zoom in
      touchZoomRotate: false, // Desactiva la función de zoom y rotación en dispositivos táctiles
      interactive: true, // Activa la interacción con el mapa
      dragPan: true, // Permite arrastrar el mapa
      scrollZoom: true, // Permite hacer zoom con el desplazamiento del mouse
      attributionControl: false, // Muestra la atribución de los datos del mapa
    });

    this.map.on('moveend', () => {
      const { lng, lat } = this.map.getCenter();
      this.latitud = lat.toFixed(4);
      this.logintud = lng.toFixed(4);
    });
    this.map.on('zoom', () => {
      const zoom = this.map.getZoom();
    });

    const buscarLavaderosControl = new BuscarLavaderosControl(this);
    // En el centro arriba:
    this.map.addControl(buscarLavaderosControl, 'top-left');


    this.map.on('style.load', () => {
      this.obtenerPuntosDesdeBaseDeDatos(longitudInicial, latitudInicial);
    });

  }

  // Seleccionar vehiculos
  onRadioChange(vehicle: string) {
    this.vehiculoSeleccionado = vehicle;
    this.filterService.setTipoVehiculoFilter(this.vehiculoSeleccionado);
  }

  Mejor_Calificados() {
    this.mejorCalificados = !this.mejorCalificados;
    this.filterService.setOrderByPopularityFilter(this.mejorCalificados);
  }
}

class BuscarLavaderosControl {
  map: mapboxgl.Map;
  container: HTMLDivElement;
  button: HTMLButtonElement;
  filterCompleteComponent: FilterCompleteComponent;

  constructor(filterCompleteComponent: FilterCompleteComponent) {
    this.filterCompleteComponent = filterCompleteComponent;
  }


  onAdd(map: mapboxgl.Map) {
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
    this.button.style.border = 'none';
    this.button.style.cursor = 'pointer';
    //click
    this.button.addEventListener('click', () => {
      const { lng, lat } = this.map.getCenter();
      this.map.flyTo({
        center: [lng, lat],
        zoom: 12,
      });

      this.filterCompleteComponent.obtenerPuntosDesdeBaseDeDatos(lng, lat);
    });

    this.container.appendChild(this.button);
    return this.container;
  }

  onRemove() {
    this.container.parentNode.removeChild(this.container);
    this.map = undefined;
  }
}
