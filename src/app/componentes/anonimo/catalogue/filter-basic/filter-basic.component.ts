import { Component } from '@angular/core';
import { FilterService } from 'src/app/services/filtro/filter.service';
import { DeparatamentosService } from '../../../../services/departamentos/deparatamentos.service';

@Component({
  selector: 'app-filter-basic',
  templateUrl: './filter-basic.component.html',
  styleUrls: ['./filter-basic.component.scss']
})
export class FilterBasicComponent {

  ciudadSeleccionada: string = '';
  tipoVehicleSeleccionado: string = '';
//  departamentos y ciudades
 depJson:any[] = [];
 departamentos:any[] = [];
 ciudadesFiltradas:any[] = [];
 departamentoSeleccionado: string  = "";


  constructor(private filterService: FilterService , private departamentosService: DeparatamentosService) {

    this.departamentosService.getDepartamento().subscribe((object:any)=>{
      this.depJson = object;
      console.log(this.depJson)
       this.departamentos = this.obtenerDepartamentos();
    })

   }

 
 obtenerDepartamentos() {
    const departamentos = this.depJson.map(item => item.departamento);
    // Filtrar los departamentos únicos
    return departamentos.filter((value, index, self) => self.indexOf(value) === index);
  }

  filtrarCiudades() {
    this.ciudadesFiltradas = this.depJson.filter(item => item.departamento === this.departamentoSeleccionado);
  }

  
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
