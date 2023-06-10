import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { FilterService } from 'src/app/services/filtro/filter.service';
import { LoaderService } from 'src/app/services/styles/loaders/loader.service';
import { finalize } from 'rxjs';
import { anonimoService } from 'src/app/services/anonimo.service';

@Component({
  selector: 'app-filter-complete',
  templateUrl: './filter-complete.component.html',
  styleUrls: ['./filter-complete.component.scss'],
})
export class FilterCompleteComponent implements OnInit {
  ciudad: string;
  departamento: string;

  constructor(
    private anonimoService: anonimoService,
    private filterService: FilterService,
    private loader: LoaderService,
    private http: HttpClient
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

        this.loader.showLoader();
        try {
          this.http
            .get(
              'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
                ubicacion +
                '.json?access_token=pk.eyJ1Ijoia2V2aW5vcnRlZ2EiLCJhIjoiY2xocWg3M3I3MDJ4OTNwbmtjaHNqeGg5ZCJ9.r8eGnQZEtKmjEpKtAVoopA'
            )
            .pipe(
              finalize(() => {
                this.loader.hideLoader();
              })
            )
            .subscribe(async (res: any) => {

              // Obtener los puntos de la base de datos y agregarlos a la fuente
              this.obtenerPuntosDesdeBaseDeDatos(res.features[0].center[0], res.features[0].center[1]); // Aquí debes implementar la lógica para obtener los puntos desde la base de datos
              
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
    this.anonimoService.getLavaderosRadio(lng, lat)
      .pipe(finalize(() => {
        this.loader.hideLoader();
      }))
      .subscribe(
        (response: any) => {
          // Procesar la respuesta de la API y agregar los puntos al arra
          console.log(response);
          
          
          response.forEach((item: any) => {
            const feature = {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [item.ubicacion.coordinates[0], item.ubicacion.coordinates[1]];
              },
              properties: {
                title: item.nombreLavadero,
                description: item.description,
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
            type: 'circle',
            source: 'lavaderos',
            paint: {
              'circle-color': '#1E90FF',
              'circle-radius': 6,
              'circle-stroke-width': 2,
              'circle-stroke-color': '#fff',
            },
          });
    
          const popup = new mapboxgl.Popup({
            closeButton:false,
            closeOnClick:false
            });
    
          this.map.on('mouseenter', 'lavaderos', (e:any) => {           
    
            const coordinates = e.features[0].geometry.coordinates.slice();
            const nombre = e.features[0].properties.title;
            const description = e.features[0].properties.description;
    
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) { // Esto es para que el popup no se salga del mapa
              coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }
            // Nombre y descripción del popup
            popup.setLngLat(coordinates).setHTML('<p>' + nombre + '</p><p>' + description + '</p>').addTo(this.map);
          });
    
          this.map.on('mouseleave', 'lavaderos', () => {
            this.map.getCanvas().style.cursor = '';
            popup.remove();
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
      style: 'mapbox://styles/mapbox/streets-v12',
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
  

    const buscarLavaderosControl = new BuscarLavaderosControl();
    // En el centro arriba:
    this.map.addControl(buscarLavaderosControl, 'top-left');
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
