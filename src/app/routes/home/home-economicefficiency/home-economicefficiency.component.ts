import { Component, OnInit } from '@angular/core';

interface EficienciaEconomica {
  anio: number;
  eficiencia: string;
}

@Component({
  selector: 'app-home-economicefficiency',
  templateUrl: './home-economicefficiency.component.html',
  styleUrls: ['./home-economicefficiency.component.scss']
})
export class HomeEconomicefficiencyComponent implements OnInit {
  datosEficiencia: EficienciaEconomica[] = [
    { "anio": 2020, "eficiencia": "80%" },
    { "anio": 2021, "eficiencia": "85%" },
    { "anio": 2022, "eficiencia": "90%" },
    { "anio": 2023, "eficiencia": "95%" },
    { "anio": 2024, "eficiencia": "20%" },
  ];
  aniosFiltrados: EficienciaEconomica[] = [];
  anios: number[] = [];

  constructor() { }

  ngOnInit() {
    this.aniosFiltrados = [...this.datosEficiencia];
    this.anios = [...new Set(this.datosEficiencia.map(dato => dato.anio))];
  }

  filtrarPorAnio(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const anio = Number(selectElement.value);
    if (!anio) {
      this.aniosFiltrados = [...this.datosEficiencia];
    } else {
      this.aniosFiltrados = this.datosEficiencia.filter(dato => dato.anio === anio);
    }
  }
  
}
