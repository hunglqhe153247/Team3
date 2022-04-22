import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient) {}
  private httpOption = {
    headers: new HttpHeaders({
      Accept: 'application/json',
    }),
  };
  private apiKey = 'd825a11828e5447cb83171251222104';
  public getWeather(location: string): Observable<any> {
    let weatherapiUrl =
      'http://api.weatherapi.com/v1/forecast.json?key='+this.apiKey+'&q=' +
      location +
      '&days=5&aqi=no&alerts=yes';
    return this.http.get<any>(weatherapiUrl, this.httpOption);
  }
}
