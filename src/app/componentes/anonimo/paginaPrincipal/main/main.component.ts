import { Component } from '@angular/core';
import { DeparatamentosService } from 'src/app/services/departamentos/deparatamentos.service';
import { FilterService } from 'src/app/services/filtro/filter.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  //  departamentos y ciudades
  depJson: any[] = [];
  departamentos: any[] = [];
  ciudadesFiltradas: any[] = [];

  //  filtros
  departamentoSeleccionado: string = '';
  sectorSeleccionado: string = '';
  ciudadSeleccionada: string = '';

  constructor(
    private departamentosService: DeparatamentosService,
    private filterService: FilterService
  ) {
    this.departamentosService.getDepartamento().subscribe((object: any) => {
      this.depJson = object;
      this.departamentos = this.obtenerDepartamentos();
    });
  }

  obtenerDepartamentos() {
    const departamentos = this.depJson.map((item) => item.departamento);
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

  buscarLavadero() {
    this.filterService.setDepartamentoFilter(this.departamentoSeleccionado);
    this.filterService.setCiudadFilter(this.ciudadSeleccionada);
    this.filterService.setSectorFilter(this.sectorSeleccionado);
  }
}
