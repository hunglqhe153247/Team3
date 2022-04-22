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
  schemeType: ScaleType;

  showLegend!: boolean;
  legendTitle: any;
  legendPosition: LegendPosition;
  countryDATA: any[];

  showXAxisLabel: boolean;
  showYAxisLabel: boolean;
  showXAxis: boolean;
  showYAxis: boolean;
  xAxisLabel: string;
  yAxisLabel: string;
  animations: boolean;
  showGridLine: boolean;
  autoScale = true;

  rangeFillOpacity: number = 0.15;
  curve = shape.curveLinear;

  roundDomains: boolean = false;
  tooltipDisabled: boolean;

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
    chartService.showGridLineSubject.subscribe((event: any) => {
      this.showGridLine = event;
    });
    chartService.showLegendSubject.subscribe((event: any) => {
      this.showLegend = event;
    });
    chartService.legendTitleSubject.subscribe((event: any) => {
      this.legendTitle = event;
    });
    chartService.legendPositionSubject.subscribe((event: any) => {
      this.legendPosition = event;
    });

    chartService.tooltipDisabledSubject.subscribe((event: any) => {
      this.tooltipDisabled = event;
    });
    chartService.schemeTypeSubject.subscribe((event: any) => {
      this.schemeType = event;
    });
    chartService.colorSchemeSubject.subscribe((event: string) => {
      console.log(event, 'dang o char component');
      this.setColorScheme(event);
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
    this.legendTitle = this.chartService.legendTitle;
    this.showLegend = this.chartService.showLegend;
    this.legendPosition = this.chartService.getLegendPosition();
    this.showXAxisLabel = this.chartService.getShowXAxisLabel();
    this.showYAxisLabel = this.chartService.getShowYAxisLabel();
    this.xAxisLabel = 'Date';
    this.yAxisLabel = 'Number of People';
    this.showXAxis = this.chartService.getShowXAxis();
    this.showYAxis = this.chartService.getShowYAxis();
    this.showGridLine = this.chartService.getShowGridLine();
    this.setColorScheme(this.chartService.getColorScheme());
    this.tooltipDisabled = this.chartService.getTooltipDisabled();
    this.schemeType = this.chartService.getShemeType();
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

  setColorScheme(name: string) {
    this.colorScheme = this.colorSets.find((s: any) => s.name === name);
  }
}
