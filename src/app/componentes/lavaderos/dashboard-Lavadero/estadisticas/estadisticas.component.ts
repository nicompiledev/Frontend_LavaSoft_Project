import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { LavaderoService } from 'src/app/services/lavadero.service';
import { finalize } from 'rxjs';
import { LoaderService } from 'src/app/services/styles/loaders/loader.service';

Chart.register(...registerables); // esto es para que funcione el grafico

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.scss']
})
export class EstadisticasComponent implements OnInit {

  constructor(private lavaderoService: LavaderoService, private loader : LoaderService) {}

  gananciasTotales: number;
  gananciasPromedio: number;
  mejorMes: string;
  peorMes: string;

  ngOnInit(): void {
    this.RenderChart();
  }

  RenderChart() {
    this.loader.showLoader();
    this.lavaderoService.obtenerGananciasPorMes(2023)
    .pipe(finalize(() => this.loader.hideLoader()))
    .subscribe(
      (res: any) => {
         // res = {ganancias: (12) [0, 0, 0, 0, 0, 150000, 0, 0, 0, 0, 0, 0]}

        const ganancias = res.ganancias;
        const meses = [];
        const gananciasPorMes = [];

        ganancias.forEach((ganancia: any, index: number) => {
          meses.push(this.obtenerNombreMes(index.toString()));
          gananciasPorMes.push(ganancia);
        });

              // Asignar los valores a las variables de estadísticas
      this.gananciasTotales = this.calcularGananciasTotales(ganancias);
      this.gananciasPromedio = this.calcularGananciasPromedio(ganancias);
      this.mejorMes = this.obtenerMejorMes(ganancias, meses);
      this.peorMes = this.obtenerPeorMes(ganancias, meses);

        new Chart('ganancias', {
          type: 'line', // otros tipos: line, radar, pie, doughnut, polarArea, bubble, scatter
          data: {
            labels: meses,
            datasets: [
              {
                label: 'Ganancias', data: gananciasPorMes, backgroundColor: '#1E90E0', borderColor: '#1E90FF', borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }

  obtenerNombreMes(numeroMes: string) {
    const meses = [ 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
    return meses[parseInt(numeroMes)];
  }

  calcularGananciasTotales(ganancias) {
    return ganancias.reduce((total, ganancia) => total + ganancia, 0);
  }
  
  calcularGananciasPromedio(ganancias) {
    const total = this.calcularGananciasTotales(ganancias);
    const cantidadMeses = ganancias.length;
    return total / cantidadMeses;
  }
  
  obtenerMejorMes(ganancias, meses) {
    const maxGanancia = Math.max(...ganancias);
    const indexMaxGanancia = ganancias.indexOf(maxGanancia);
    return meses[indexMaxGanancia];
  }
  
  obtenerPeorMes(ganancias, meses) {
    const minGanancia = Math.min(...ganancias);
    const indexMinGanancia = ganancias.indexOf(minGanancia);
    return meses[indexMinGanancia];
  }
}
