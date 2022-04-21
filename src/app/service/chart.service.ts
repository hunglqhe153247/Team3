import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  view!: [number, number];

  showXAxisLabel: boolean;
  showXAxisLabelSubject = new Subject<boolean>();
  showYAxisLabel: boolean;
  showYAxisLabelSubject = new Subject<boolean>();
  showXAxis: boolean;
  showXAxisSubject = new Subject<boolean>();
  showYAxis: boolean;
  showYAxisSubject = new Subject<boolean>();

  showLegend!: boolean;
  legendTitle!: string;

  showLegendSubject = new Subject<boolean>();
  legendTitleSubject = new Subject<string>();

  timeseries: any;
  countryDATA!: any;
  countryDATASubject = new Subject<any>();

  constructor(private appService: AppService) {
    this.appService.getTimeseries().subscribe((data) => {
      this.timeseries = data;
    });

    this.view = [900, 400];

    this.showLegend = true;
    this.legendTitle = 'Legend Title';
    this.showXAxis = true;
    this.showYAxis = true;
    this.showXAxisLabel = true;
    this.showYAxisLabel = true;
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

  setView(view: [number, number]) {
    this.view = view;
  }
  setShowLegend(element: boolean) {
    this.showLegend = element;
    this.showLegendSubject.next(this.showLegend);
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
  getLegend() {
    return this.showLegend;
  }
  setLegendTitle(legendTitle: string) {
    this.legendTitle = legendTitle;
    this.legendTitleSubject.next(this.legendTitle);
  }
  getLegendTitle() {
    return this.legendTitle;
  }
}
