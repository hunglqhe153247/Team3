import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/service/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
})
export class WeatherComponent implements OnInit {
  constructor(private weatherService: WeatherService) {}

  weather!: any;

  ngOnInit(): void {
    this.weatherService.weatherSubject.subscribe((data) => {
      if (data !== undefined) {
        this.weather = data;
      }
    });
  }
}
