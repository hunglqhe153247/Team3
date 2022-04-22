import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  country!: string;
  countrySubject = new Subject<string>();
  constructor(private http: HttpClient) {
    this.country = 'VietNam';
  }
  private httpOption = {
    headers: new HttpHeaders({
      Accept: 'application/json',
    }),
  };
  private apiKey = 'd825a11828e5447cb83171251222104';
  public getWeather(location: string) {
    let weatherapiUrl =
      'http://api.weatherapi.com/v1/forecast.json?key=' +
      this.apiKey +
      '&q=' +
      location +
      '&days=5&aqi=no&alerts=yes';
    return this.http.get<any>(weatherapiUrl, this.httpOption);
  }
  setCountry(element: string) {
    this.country = element;
    this.countrySubject.next(this.country);
  }
  getCountry() {
    return this.country;
  }
}
