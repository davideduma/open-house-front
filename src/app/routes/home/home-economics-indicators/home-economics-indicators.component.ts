import { Component, OnInit } from '@angular/core';
import indicadores from '../../../../assets/testsSupport/home-content/indicadores.json';

@Component({
  selector: 'app-home-economics-indicators',
  templateUrl: './home-economics-indicators.component.html',
  styleUrls: ['./home-economics-indicators.component.scss']
})
export class HomeEconomicsIndicatorsComponent implements OnInit {
  public economicIndicators: any = [];

  constructor() { }

  ngOnInit(): void {
    this.economicIndicators = indicadores.indicators;
  }
}
