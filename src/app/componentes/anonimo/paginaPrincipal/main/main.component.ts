import { Component } from '@angular/core';
import { DeparatamentosService } from 'src/app/services/departamentos/deparatamentos.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
//  departamentos y ciudades
depJson:any[] = [];
departamentos:any[] = [];
ciudadesFiltradas:any[] = [];
departamentoSeleccionado: string  = "";


 constructor(private departamentosService: DeparatamentosService) {

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

}
