import { Component, OnInit } from '@angular/core';
import { DashboardStats } from '../../../core/models/dashboard.model';
import { DashboardService } from './services/dashboard.service';

@Component({

selector:'app-dashboard',

standalone:true,

templateUrl:'./home.html',

styleUrl:'./home.scss'

})
export class DashboardComponent implements OnInit{

stats! : DashboardStats

constructor(private dashboardService: DashboardService){}

ngOnInit(){
this.loadStats();
}
loadStats(){
  this.dashboardService.getStats().subscribe({
    next: (stats)=>{
      this.stats = stats as DashboardStats
    },
    error: (err)=>{
      console.error(err)
    }
  })
}
}