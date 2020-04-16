import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styles: [
  ]
})
export class GraficoDonaComponent implements OnInit {

  @Input('ChartData') doughnutChartData: string[] = [];
  @Input('ChartLabels') doughnutChartLabels: number[] = [];
  @Input('ChartType') doughnutChartType: string[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
