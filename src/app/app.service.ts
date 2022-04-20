import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private httpOption = {
    headers: new HttpHeaders({
      'Accept': 'application/json'
    })
  }
  constructor(private http: HttpClient) { }

  public getStats(): Observable<any> {
    let statURL = 'https://master-covid-19-api-laeyoung.endpoint.ainize.ai/jhu-edu/brief';
    return this.http.get<any>(statURL, this.httpOption);
  }

  public getRegions() {
    let regionURL = 'https://master-covid-19-api-laeyoung.endpoint.ainize.ai/jhu-edu/latest?onlyCountries=true';
    return this.http.get<any>(regionURL, this.httpOption);
  }

  public getTimeseries() {
    let timeseriesURL = 'https://master-covid-19-api-laeyoung.endpoint.ainize.ai/jhu-edu/timeseries?onlyCountries=true'
    return this.http.get<any>(timeseriesURL, this.httpOption);
  }
}
