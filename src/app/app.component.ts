import { Component } from '@angular/core';
import { AppService } from './service/app.service';
import { ChartService } from './service/chart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CoronaInfo';
  public stats: any;
  public regions: any;
  public country: any;
  public timeseries: any;
  public chosenCountryName:any =0;
  public currentCountry:any;
  constructor(private appService: AppService, private chartService:ChartService) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.appService.getStats().subscribe((data) => {
      this.stats = data;
    })
    this.appService.getRegions().subscribe((data) => {
      this.regions = data;
    })
    this.appService.getTimeseries().subscribe((data) => {
      this.timeseries = data;
    })

    // initiate current country defaut value
    this.currentCountry={
      "countryregion":'',
      "lastupdate":'',
      "location":{},
      "countrycode":{},
      "confirmed":"",
      "deaths":"",
      "recovered":""
    };
  }

  public getCountry(country: any) {
    this.country = country;
  }

  // set current country = chosen country name
  selectCountryHandler(){
    this.currentCountry=this.regions.filter((event:any)=>{
      return event.countryregion==this.chosenCountryName
    })[0];
    this.chartService.setData(this.chosenCountryName);
  }
}
