import { Component } from '@angular/core';
import { AppService } from './app.service';

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

  constructor(private appService: AppService) { }

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
  }

  public getCountry(country: any) {
    this.country = country;
  }

}
