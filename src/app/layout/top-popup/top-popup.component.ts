import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-popup',
  templateUrl: './top-popup.component.html',
  styleUrls: ['./top-popup.component.scss']
})

export class TopPopupComponent implements OnInit {
  slides = [1, 2, 3, 4];

  slideConfig = {
    "slidesToShow": 4,
    "slidesToScroll": 1,
    "dots": true,
    "infinite": false
  };


  constructor() {

  }
  ngOnInit(): void {

  }
  addSlide() {
    this.slides.push(488)
  }

  removeSlide() {
    this.slides.length = this.slides.length - 1;
  }

  slickInit(e: any) {
    console.log('slick initialized');
  }

  breakpoint(e: any) {
    console.log('breakpoint');
  }

  afterChange(e: any) {
    console.log('afterChange');
  }

  beforeChange(e: any) {
    console.log('beforeChange');
  }
}
