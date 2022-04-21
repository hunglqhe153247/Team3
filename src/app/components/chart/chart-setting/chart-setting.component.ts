import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ChartService } from 'src/app/service/chart.service';

@Component({
  selector: 'app-chart-setting',
  templateUrl: './chart-setting.component.html',
  styleUrls: ['./chart-setting.component.css'],
})
export class ChartSettingComponent implements OnInit {
  legendTitleValue: string = '';

  legendTitle!: string;
  showLegend!: boolean;
  showXAxis!: boolean;
  showYAxis!: boolean;
  showXAxisLabel!: boolean;
  showYAxisLabel!: boolean;

  constructor(
    private chartService: ChartService,
    private dialogRef: MatDialogRef<ChartSettingComponent>
  ) {
    this.legendTitle = chartService.getLegendTitle();
    this.showLegend = chartService.getLegend();
    this.showXAxis = chartService.getShowXAxis();
    this.showYAxis = chartService.getShowYAxis();
    this.showXAxisLabel = chartService.getShowXAxisLabel();
    this.showYAxisLabel = chartService.getShowYAxisLabel();
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
  onClose() {
    this.dialogRef.close();
  }
}
