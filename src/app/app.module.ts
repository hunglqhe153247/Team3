import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppService } from './service/app.service';
import { MapComponent } from './components/map/map.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import {  MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule} from '@angular/material/select';
import { ChartComponent } from './components/chart/chart.component';
import{MatIconModule} from '@angular/material/icon';
import { ChartSettingComponent } from './components/chart/chart-setting/chart-setting.component'
@NgModule({
  declarations: [AppComponent , MapComponent, ChartComponent, ChartSettingComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LeafletModule,
    FormsModule,
    BrowserAnimationsModule,
    NgxChartsModule,
    MatDialogModule,
    MatSelectModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
