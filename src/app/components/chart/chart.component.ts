import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ChartService } from 'src/app/service/chart.service';
import { productSales } from '../../data/data';
import { ChartSettingComponent } from './chart-setting/chart-setting.component';
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  @ViewChild('someTag') myDiv!: ElementRef;
  view!:[number,number];
  legend!:boolean;
  legendTitle=this.chartService.getLegendTitle()
  countryDATA!:any[]

  constructor(private dialog:MatDialog,
    private chartService:ChartService){
    console.log('dang o chart component')


    this.view=chartService.view
    this.legendTitle=chartService.legendTitle
    this.legend=chartService.legend

    chartService.legendSubject.subscribe((event:any)=>{
      this.legend=event
    })
    chartService.legendTitleSubject.subscribe((event:any)=>{
      this.legendTitle=event
    })
  }
  ngOnInit(): void {
    this.legendTitle=this.chartService.legendTitle
  }

  // config pop
  create(event:any){
      const dialogConfig=new MatDialogConfig()
      dialogConfig.disableClose=false;
      dialogConfig.autoFocus=true;
      dialogConfig.width="50%";
      dialogConfig.height="50%";
      dialogConfig.position = {
        top: '0',
        right: '0'
    };
      this.dialog.open(ChartSettingComponent,dialogConfig)
  }

}
