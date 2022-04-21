import { AfterViewInit, Component, OnInit } from '@angular/core';
import 'leaflet/dist/leaflet.css';
import * as L from 'leaflet';
import { AppService } from 'src/app/service/app.service';
@Component({
  selector: 'app-map2',
  templateUrl: './map2.component.html',
  styleUrls: ['./map2.component.css'],
})
export class Map2Component implements AfterViewInit {
  title = 'leaf-let';
  regions: any = [];
  private map: any;

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map').setView([0, 0], 2);

    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }
    ).addTo(this.map);

    tiles.addTo(this.map);

    // (L.Control as any).geocoder().addTo(this.map);

    this.AppService.getRegions().subscribe((data) => {
      this.regions = data;
      for (var val of this.regions) {
        var circle = L.circle([val.location.lat, val.location.lng], {
          radius: val.confirmed / 25,
          color: 'red',
        }).addTo(this.map);
      }
    });
  }
  constructor(private AppService: AppService) {}
}
