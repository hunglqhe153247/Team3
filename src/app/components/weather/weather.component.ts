import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/service/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
weather:any=[]
  constructor(private WeatherService:WeatherService) { }

  ngOnInit(): void {
    this.WeatherService.getWeather("vietnam").subscribe((data) => {
      this.weather = data;
      console.log(this.weather)
    });

  }

}
