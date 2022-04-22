import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ChartService } from 'src/app/service/chart.service';
import { LegendPosition } from '@swimlane/ngx-charts';

import { ScaleType } from '@swimlane/ngx-charts';
@Component({
  selector: 'app-chart-setting',
  templateUrl: './chart-setting.component.html',
  styleUrls: ['./chart-setting.component.css'],
})
export class ChartSettingComponent implements OnInit {
  legendPositionIndex: string;
  schemeTypeIndex: string;

  legendTitleValue: string = '';

  legendTitle!: string;
  showLegend!: boolean;
  showXAxis!: boolean;
  showYAxis!: boolean;
  showXAxisLabel!: boolean;
  showYAxisLabel!: boolean;
  showGridLine!: boolean;
  tooltipDisabled!: boolean;

  schemeColorSelected!: string;
  colorSchemeArray = [
    'vivid',
    'natural',
    'cool',
    'fire',
    'solar',
    'air',
    'aqua',
    'flame',
    'ocean',
    'forest',
    'horizon',
    'neons',
    'picnic',
    'night',
    'nightLights',
  ];

  constructor(
    private chartService: ChartService,
    private dialogRef: MatDialogRef<ChartSettingComponent>
  ) {
    this.legendTitle = chartService.getLegendTitle();
    this.showLegend = chartService.getShowLegend();
    this.showXAxis = chartService.getShowXAxis();
    this.showYAxis = chartService.getShowYAxis();
    this.showXAxisLabel = chartService.getShowXAxisLabel();
    this.showYAxisLabel = chartService.getShowYAxisLabel();
    this.showGridLine = chartService.getShowGridLine();
    this.legendPositionIndex = chartService.getLegendPositionIndex();
    this.tooltipDisabled = chartService.getTooltipDisabled();
    this.schemeTypeIndex = chartService.getShemeTypeIndex();
    this.schemeColorSelected = chartService.getColorScheme();
  }

  ngOnInit(): void {}

  changeLegendTitle(event: any) {
    this.chartService.setLegendTitle(event.target.value);
    console.log(event.target.value);
  }
  changeShowLegend(event: any) {
    console.log(event.target.checked);
    this.chartService.setShowLegend(event.target.checked);
  }
  changeShowXAxis(event: any) {
    this.chartService.setShowXAxis(event.target.checked);
  }
  changeShowYAxis(event: any) {
    this.chartService.setShowYAxis(event.target.checked);
  }
  changeShowXAxisLabel(event: any) {
    this.chartService.setShowXAxisLabel(event.target.checked);
  }
  changeShowYAxisLabel(event: any) {
    this.chartService.setShowYAxisLabel(event.target.checked);
  }

  changeLegendPosition(event: any) {
    if (this.legendPositionIndex == '0')
      this.chartService.setLegendPosition(LegendPosition.Below);
    else if (this.legendPositionIndex == '1')
      this.chartService.setLegendPosition(LegendPosition.Right);
  }
  changeShowGridLine(event: any) {
    this.chartService.setShowGridLine(event.target.checked);
  }
  changeTooltipDisabled(event: any) {
    this.chartService.setTooltipDisabled(event.target.checked);
  }
  changeShemeType(event: any) {
    if (this.schemeTypeIndex == '0')
      this.chartService.setShemeType(ScaleType.Ordinal);
    else if (this.schemeTypeIndex == '1')
      this.chartService.setShemeType(ScaleType.Linear);
  }
  changeShemeColor(event: any) {
    console.log(event);
    this.chartService.setColorScheme(event);
  }
  onClose() {
    this.dialogRef.close();
  }
}
