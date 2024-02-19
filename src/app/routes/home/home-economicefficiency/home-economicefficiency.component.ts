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
  ];
  aniosFiltrados: EficienciaEconomica[] = [];
  anios: number[] = [];

  constructor() { }

  ngOnInit() {
 
  }

  filtrarPorAnio(event: Event) {
 
  }
  
}