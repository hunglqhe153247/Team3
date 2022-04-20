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
  legendTitle:any
  countryDATA:any[]

  constructor(private dialog:MatDialog,
    private chartService:ChartService){



    chartService.legendSubject.subscribe((event:any)=>{
      this.legend=event
    })
    chartService.legendTitleSubject.subscribe((event:any)=>{
      this.legendTitle=event
    })
    chartService.countryDATASubject.subscribe((event:any)=>{
      this.countryDATA=event

      // console.log('da thay doi')
      // console.log(this.countryDATA)
    })
  }
  ngOnInit(): void {

    this.countryDATA=this.chartService.countryDATA
    this.view=this.chartService.view
    this.legendTitle=this.chartService.legendTitle
    this.legend=this.chartService.legend
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
