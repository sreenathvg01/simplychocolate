import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-dashboard',
  templateUrl: './home-dashboard.component.html',
  styleUrls: ['./home-dashboard.component.scss']
})
export class HomeDashboardComponent implements OnInit{
  constructor(){

  }

  ngOnInit(): void {
    console.log(1)
  }
  ngAfterViewInit(): void {
    console.clear()
    // this.ready()
  }
}
