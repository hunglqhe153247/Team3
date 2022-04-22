import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/service/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
})
export class WeatherComponent implements OnInit {
  checkHidden: boolean = true;
  weather: any = [];
  country: any;
  constructor(private WeatherService: WeatherService) {
    this.country = this.WeatherService.getCountry();
    this.WeatherService.countrySubject.subscribe((data) => {
      this.country = data;
      this.checkHidden = false;
      this.WeatherService.getWeather(this.country).subscribe((data) => {
        this.weather = data;
        console.log(this.weather);
      });
    });
    this.WeatherService.getWeather(this.country).subscribe((data) => {
      this.weather = data;
      console.log(this.weather);
    });
  }

  ngOnInit(): void {
    console.log(this.WeatherService.getWeather('VietNam'));
  }
}
