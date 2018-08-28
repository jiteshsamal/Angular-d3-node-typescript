import { Component, ViewChild, ElementRef } from '@angular/core';
import { MarketStatusService } from './market-status.service';
import { MarketPrice } from './market-price';
import * as d3 from 'd3';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-d3';
  marketStatus: MarketPrice[];
  marketStatusToPlot: MarketPrice[];
  chartData:number[];
  @ViewChild('chartData')chartElement: ElementRef;

  set MarketStatus(status: MarketPrice[]) {
    this.marketStatus = status;
    this.marketStatusToPlot = this.marketStatus.slice(0, 20);
  }

  constructor(private marketStatusSvc: MarketStatusService) {

    this.marketStatusSvc.getInitialMarketStatus()
      .subscribe(prices => {
        this.MarketStatus = prices;
      });

      this.marketStatusSvc.getInitialChartStatus()
      .subscribe(prices => {
        this.chartData = prices;
        this.buildChart();
      });
  }


  buildChart(){
    var svg = d3.select(this.chartElement.nativeElement)
    .append('svg')
    .attr('width', 700)
    .attr('height', 500);

    svg.selectAll('rect')
       .data(this.chartData)
       .enter()
       .append('rect')
       .attr('height',function(d,i){return d*10})
       .attr('width',70)
       .attr('fill','darkred')
       .attr('x',function(d,i){return 80 * i})
       .attr('y',function(d,i){return 500-(d*10)})

  }
}
