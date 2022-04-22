import { Injectable } from '@angular/core';
import { LegendPosition } from '@swimlane/ngx-charts';
import { Subject } from 'rxjs';
import { AppService } from './app.service';
import { ScaleType } from '@swimlane/ngx-charts';
@Injectable({
  providedIn: 'root',
})
export class ChartService {
  showXAxisLabel: boolean;
  showXAxisLabelSubject = new Subject<boolean>();
  showYAxisLabel: boolean;
  showYAxisLabelSubject = new Subject<boolean>();
  showXAxis: boolean;
  showXAxisSubject = new Subject<boolean>();
  showYAxis: boolean;
  showYAxisSubject = new Subject<boolean>();
  showGridLine: boolean;
  showGridLineSubject = new Subject<boolean>();

  tooltipDisabled: boolean;
  tooltipDisabledSubject = new Subject<boolean>();

  legendPosition: LegendPosition;
  legendPositionSubject = new Subject<LegendPosition>();
  showLegend!: boolean;
  showLegendSubject = new Subject<boolean>();
  legendTitle!: string;
  legendTitleSubject = new Subject<string>();

  schemeType!: ScaleType;
  schemeTypeSubject = new Subject<ScaleType>();
  colorScheme!: any;
  colorSchemeSubject = new Subject<any>();

  timeseries: any;
  countryDATA!: any;
  countryDATASubject = new Subject<any>();

  constructor(private appService: AppService) {
    this.appService.getTimeseries().subscribe((data) => {
      this.timeseries = data;
    });

    this.showLegend = true;
    this.legendTitle = 'Legend Title';
    this.legendPosition = LegendPosition.Below;
    this.showXAxis = true;
    this.showYAxis = true;
    this.showXAxisLabel = true;
    this.showYAxisLabel = true;
    this.showGridLine = true;
    this.tooltipDisabled = false;
    this.schemeType = ScaleType.Ordinal;
    this.colorScheme = 'horizon';
  }

  setData(countryName: string) {
    this.countryDATA = this.timeseries.filter((event: any) => {
      return event.countryregion == countryName;
    })[0];

    var dateArray = Object.getOwnPropertyNames(this.countryDATA.timeseries);
    var confirmedSeries: any[] = [];
    var deathsSeries: any[] = [];
    var recoveredSeries: any[] = [];
    dateArray.forEach((element: any) => {
      confirmedSeries.push({
        value: this.countryDATA.timeseries[element].confirmed,
        name: element,
      });
    });
    dateArray.forEach((element: any) => {
      deathsSeries.push({
        value: this.countryDATA.timeseries[element].deaths,
        name: element,
      });
    });
    dateArray.forEach((element: any) => {
      recoveredSeries.push({
        value: this.countryDATA.timeseries[element].recovered,
        name: element,
      });
    });
    this.countryDATA = [
      {
        name: 'confirmed',
        series: confirmedSeries,
      },
      {
        name: 'deaths',
        series: deathsSeries,
      },
      {
        name: 'recovered',
        series: recoveredSeries,
      },
    ];
    // console.log('hahaha')
    // console.log(this.countryDATA)
    this.countryDATASubject.next(this.countryDATA);
  }
  getData() {
    return this.countryDATA;
  }

  setShowYAxis(element: boolean) {
    this.showYAxis = element;
    this.showYAxisSubject.next(this.showYAxis);
  }
  getShowYAxis() {
    return this.showYAxis;
  }
  setShowXAxis(element: boolean) {
    this.showXAxis = element;
    this.showXAxisSubject.next(this.showXAxis);
  }
  getShowXAxis() {
    return this.showXAxis;
  }

  setShowXAxisLabel(element: boolean) {
    this.showXAxisLabel = element;
    this.showXAxisLabelSubject.next(this.showXAxisLabel);
  }
  getShowXAxisLabel() {
    return this.showXAxisLabel;
  }

  setShowYAxisLabel(element: boolean) {
    this.showYAxisLabel = element;
    this.showYAxisLabelSubject.next(this.showYAxisLabel);
  }
  getShowYAxisLabel() {
    return this.showYAxisLabel;
  }
  setShowGridLine(element: boolean) {
    this.showGridLine = element;
    this.showGridLineSubject.next(this.showGridLine);
  }
  getShowGridLine() {
    return this.showGridLine;
  }

  setLegendPosition(element: LegendPosition) {
    this.legendPosition = element;
    this.legendPositionSubject.next(this.legendPosition);
  }
  getLegendPosition() {
    return this.legendPosition;
  }
  getLegendPositionIndex() {
    if (this.legendPosition == LegendPosition.Below) {
      return '0';
    } else {
      return '1';
    }
  }
  setShowLegend(element: boolean) {
    this.showLegend = element;
    this.showLegendSubject.next(this.showLegend);
  }
  getShowLegend() {
    return this.showLegend;
  }
  setLegendTitle(legendTitle: string) {
    this.legendTitle = legendTitle;
    this.legendTitleSubject.next(this.legendTitle);
  }
  getLegendTitle() {
    return this.legendTitle;
  }
  setTooltipDisabled(element: any) {
    this.tooltipDisabled = element;
    this.tooltipDisabledSubject.next(this.tooltipDisabled);
  }
  getTooltipDisabled() {
    return this.tooltipDisabled;
  }

  setShemeType(element: ScaleType) {
    this.schemeType = element;
    this.schemeTypeSubject.next(this.schemeType);
  }
  getShemeType() {
    return this.schemeType;
  }
  getShemeTypeIndex() {
    if (this.schemeType == ScaleType.Ordinal) {
      return '0';
    } else if (this.schemeType == ScaleType.Linear) {
      return '1';
    } else return '-1';
  }

  setColorScheme(element: string) {
    this.colorScheme = element;
    this.colorSchemeSubject.next(this.colorScheme);
    console.log('dang o service');
  }
  getColorScheme() {
    return this.colorScheme;
  }
}
