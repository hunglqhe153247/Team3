import { Component, OnInit } from '@angular/core';
import { circle, latLng, LayerGroup, tileLayer } from 'leaflet';
import { AppService } from 'src/app/service/app.service';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  constructor(private AppService: AppService) {}
  regions: any = [];
  options: any;
  regionCircle: any = [];
  ngOnInit(): void {
    this.options = {
      layers: [
        tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors',
        }),
      ],
      zoom: 1,
      center: latLng([0, 0]),
    };
    this.AppService.getRegions().subscribe((data) => {
      this.regions = data;
      for (var val of this.regions) {
        this.regionCircle.push(val);
      }
    });
    console.log(this.regionCircle);
    this.options.layers.push(circle([46.95, -122], { radius: 5000 }));
  }
}
