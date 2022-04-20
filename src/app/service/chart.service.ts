import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  view!: [number, number];
  legend!: boolean;

  legendTitle!: string;

  legendSubject = new Subject<boolean>();
  legendTitleSubject = new Subject<string>();

  timeseries: any;
  countryDATA!: any;
  countryDATASubject =new Subject<any>();

  constructor(private appService: AppService) {
    this.appService.getTimeseries().subscribe((data) => {
      this.timeseries = data;
    });

    this.view = [900, 400];

    this.legend = true;
    this.legendTitle = '';
  }

  setData(countryName: string) {
    this.countryDATA = this.timeseries.filter((event: any) => {
      return (event.countryregion == countryName);
    })[0];

    var dateArray=Object.getOwnPropertyNames(this.countryDATA.timeseries)
    var confirmedSeries :any[]=[];
    var deathsSeries:any[]=[];
    var recoveredSeries:any[]=[];
    dateArray.forEach((element:any)=>{
      confirmedSeries.push({value:this.countryDATA.timeseries[element].confirmed,name:element})
    })
    dateArray.forEach((element:any)=>{
      deathsSeries.push({value:this.countryDATA.timeseries[element].deaths,name:element})
    })
    dateArray.forEach((element:any)=>{
      recoveredSeries.push({value:this.countryDATA.timeseries[element].recovered,name:element})
    })
    this.countryDATA= [
      {
        name: 'confirmed',
        series: confirmedSeries
      },
      {
        name: 'deaths',
        series: deathsSeries
      },
      {
        name: 'recovered',
        series: recoveredSeries
      },
    ];
    // console.log('hahaha')
    // console.log(this.countryDATA)
    this.countryDATASubject.next(this.countryDATA)
  }
  getData() {
    return this.countryDATA
  }

  setView(view: [number, number]) {
    this.view = view;
  }
  setLegend(legend: boolean) {
    this.legend = legend;
    this.legendSubject.next(this.legend);
  }
  getLegend() {
    return this.legend;
  }
  setLegendTitle(legendTitle: string) {
    this.legendTitle = legendTitle;
    this.legendTitleSubject.next(this.legendTitle);
  }
  getLegendTitle() {
    return this.legendTitle;
  }
}
