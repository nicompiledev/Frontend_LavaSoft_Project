import { Component } from '@angular/core';
import { FilterService } from 'src/app/services/filtro/filter.service';
import { DeparatamentosService } from '../../../../services/departamentos/deparatamentos.service';

@Component({
  selector: 'app-filter-basic',
  templateUrl: './filter-basic.component.html',
  styleUrls: ['./filter-basic.component.scss'],
})
export class FilterBasicComponent {

  //  departamentos y ciudades
  depJson: any[] = [];
  departamentos: any[] = [];
  ciudadesFiltradas: any[] = [];

  //  filtros
  departamentoSeleccionado: string = '';
  sectorSeleccionado: string = '';
  ciudadSeleccionada: string = '';

  constructor(
    private filterService: FilterService,
    private departamentosService: DeparatamentosService
  ) {
    this.departamentosService.getDepartamento().subscribe((object: any) => {
      this.depJson = object;
      this.departamentos = this.obtenerDepartamentos();
    });
  }

  obtenerDepartamentos() {
    const departamentos = this.depJson.map((item) => item.departamento);
    // Filtrar los departamentos únicos
    return departamentos.filter(
      (value, index, self) => self.indexOf(value) === index
    );
  }

  filtrarCiudades() {
    this.ciudadesFiltradas = this.depJson.filter(
      (item) => item.departamento === this.departamentoSeleccionado
    );
  }

  onChangeDepartamento(event: any) {
    this.departamentoSeleccionado = event.target.value;
    this.filtrarCiudades();
  }

  onChangeCiudad(event: any) {
    this.ciudadSeleccionada = event.target.value;
  }

  onChangeSector(event: any) {
    this.sectorSeleccionado = event.target.value;
  }

  onSearch() {
    this.filterService.setDepartamentoFilter(this.departamentoSeleccionado);
    this.filterService.setCiudadFilter(this.ciudadSeleccionada);
    this.filterService.setSectorFilter(this.sectorSeleccionado);
  }
}
