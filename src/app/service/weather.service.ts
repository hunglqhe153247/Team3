import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  weather!: any;
  weatherSubject: BehaviorSubject<any> = new BehaviorSubject<any>(this.weather);

  private BaseUrl =
    'https://api.weatherapi.com/v1/current.json?key=0cd42df25e9542969c0134606222704';

  getWeather(country: string) {
    let currentWeather!: any;
    this.weatherSubject.next(currentWeather);
    this.http
      .get(`${this.BaseUrl}&q=${country}&aqi=yes`)
      .subscribe((data: any) => {
        this.weather = data;
        this.weatherSubject.next(this.weather);
      });
  }
}
