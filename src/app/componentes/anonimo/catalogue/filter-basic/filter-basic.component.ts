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
  departamentoSeleccionado: string = 'departamento';
  ciudadSeleccionada: string = 'ciudad';
  sectorSeleccionado: string = 'sectores';

  constructor(
    private filterService: FilterService,
    private departamentosService: DeparatamentosService
  ) {

    this.departamentosService.getDepartamento().subscribe((object: any) => {
      this.depJson = object;
      this.departamentos = this.obtenerDepartamentos();

      const {departamento, ciudad, sector} = this.filterService.getDatosFiltro();

      if(departamento != null && departamento != ""){
        this.departamentoSeleccionado = departamento;
        this.filtrarCiudades();
      }

      if(ciudad != null && ciudad != ""){
        this.ciudadSeleccionada = ciudad;
      }

      if(sector != null && sector != ""){
        this.sectorSeleccionado = sector;
      }
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
    let departamentoEnviar = this.departamentoSeleccionado;
    if(departamentoEnviar == 'departamento'){
      departamentoEnviar = "";
    }
    this.filterService.setDepartamentoFilter(departamentoEnviar);
    this.filtrarCiudades();
  }

  onChangeCiudad(event: any) {
    let ciudadEnviar = this.ciudadSeleccionada;
    if(ciudadEnviar == 'ciudad'){
      ciudadEnviar = "";
    }
    this.filterService.setCiudadFilter(ciudadEnviar);
  }

  onChangeSector(event: any) {
    let sectorEnviar = this.sectorSeleccionado;
    if(sectorEnviar == 'sectores'){
      sectorEnviar = "";
    }
    this.filterService.setSectorFilter(sectorEnviar);
  }
}
