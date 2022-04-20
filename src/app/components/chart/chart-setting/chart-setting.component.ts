import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ChartService } from 'src/app/service/chart.service';

@Component({
  selector: 'app-chart-setting',
  templateUrl: './chart-setting.component.html',
  styleUrls: ['./chart-setting.component.css']
})
export class ChartSettingComponent implements OnInit {
  legendTitle!:string
  legend!: boolean
  constructor(private chartService: ChartService,
      private dialogRef:MatDialogRef<ChartSettingComponent>
    ) {
      this.legendTitle=chartService.getLegendTitle()
      this.legend=chartService.getLegend()
    }

  ngOnInit(): void {
  }
  changeLegendTitle(event:any){
    this.chartService.setLegendTitle(event.target.value)
    console.log(event.target.value)
  }
  changeLegend(event:any){
    console.log(event.target.checked)
    this.chartService.setLegend(event.target.checked)
  }
  onClose(){
    this.dialogRef.close()
  }

}
