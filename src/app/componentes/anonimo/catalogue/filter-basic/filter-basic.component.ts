import { Component } from '@angular/core';
import { FilterService } from 'src/app/services/filtro/filter.service';

@Component({
  selector: 'app-filter-basic',
  templateUrl: './filter-basic.component.html',
  styleUrls: ['./filter-basic.component.scss']
})
export class FilterBasicComponent {

  constructor(private filterService: FilterService) { }

  ciudadSeleccionada: string = '';
  tipoVehicleSeleccionado: string = '';

  onChangeCiudad(event: any) {
    this.ciudadSeleccionada = event.target.value;
  }

  onChangeSector(event: any) {
    console.log(event.target.value);
  }

  onChangeTipoVehiculo(event: any) {
    this.tipoVehicleSeleccionado = event.target.value;
  }

  onSearch() {
    this.filterService.setCiudadFilter(this.ciudadSeleccionada);
    this.filterService.setTipoVehiculoFilter(this.tipoVehicleSeleccionado);
  }

}
