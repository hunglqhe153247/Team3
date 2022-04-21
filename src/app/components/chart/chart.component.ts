import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LegendPosition } from '@swimlane/ngx-charts';
import { ChartService } from 'src/app/service/chart.service';

import { Color, colorSets } from '@swimlane/ngx-charts';

import { ScaleType } from '@swimlane/ngx-charts';
import { ChartSettingComponent } from './chart-setting/chart-setting.component';
import * as shape from 'd3-shape';
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit {
  checkHidden: boolean = true;

  @ViewChild('someTag') myDiv!: ElementRef;
  view!: [number, number];

  colorSets: any;
  colorScheme: any;
  schemeType = ScaleType.Ordinal;

  showLegend!: boolean;
  legendTitle: any;
  legendPosition = LegendPosition.Below;
  countryDATA: any[];

  showXAxisLabel: boolean;
  showYAxisLabel: boolean;
  showXAxis: boolean;
  showYAxis: boolean;
  xAxisLabel: string;
  yAxisLabel: string;
  animations: boolean;
  showGridLines = true;
  autoScale = true;

  rangeFillOpacity: number = 0.15;
  curve = shape.curveLinear;

  roundDomains: boolean = false;
  tooltipDisabled: boolean = false;

  constructor(private dialog: MatDialog, private chartService: ChartService) {
    Object.assign(this, { colorSets });
    chartService.showXAxisSubject.subscribe((event: any) => {
      this.showXAxis = event;
    });
    chartService.showYAxisSubject.subscribe((event: any) => {
      this.showYAxis = event;
    });
    chartService.showXAxisLabelSubject.subscribe((event: any) => {
      this.showXAxisLabel = event;
    });
    chartService.showYAxisLabelSubject.subscribe((event: any) => {
      this.showYAxisLabel = event;
    });
    chartService.showLegendSubject.subscribe((event: any) => {
      this.showLegend = event;
    });
    chartService.legendTitleSubject.subscribe((event: any) => {
      this.legendTitle = event;
    });
    chartService.countryDATASubject.subscribe((event: any) => {
      this.countryDATA = event;
      this.checkHidden = false;

      // console.log('da thay doi')
      // console.log(this.countryDATA)
    });
  }
  ngOnInit(): void {
    this.animations = true;
    this.countryDATA = this.chartService.countryDATA;
    this.view = this.chartService.view;
    this.legendTitle = this.chartService.legendTitle;
    this.showLegend = this.chartService.showLegend;
    this.showXAxisLabel = this.chartService.getShowXAxisLabel();
    this.showYAxisLabel = this.chartService.getShowYAxisLabel();
    this.xAxisLabel = 'Date';
    this.yAxisLabel = 'Number of People';
    this.showXAxis = this.chartService.getShowXAxis();
    this.showYAxis = this.chartService.getShowYAxis();
    this.setColorScheme('forest');
  }

  // config pop
  create(event: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '30%';
    dialogConfig.height = '100%';
    dialogConfig.position = {
      top: '0',
      left: '0',
    };
    this.dialog.open(ChartSettingComponent, dialogConfig);
  }

  setColorScheme(name: any) {
    this.colorScheme = this.colorSets.find((s: any) => s.name === name);
  }
}
