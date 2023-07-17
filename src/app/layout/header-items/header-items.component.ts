import { Component, HostListener, ComponentRef, ComponentFactoryResolver, ViewChild, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { SkillTooltipComponent } from './skill-tooltip/skill-tooltip.component';
// import { PopupHostDirective } from './directives/host.directive';
import { TopheaderhoverItemsComponent } from 'src/app/components/topheaderhover-items/topheaderhover-items.component';
import { TopPopupComponent } from '../top-popup/top-popup.component';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { NgbDatepickerModule, NgbOffcanvas, OffcanvasDismissReasons } from '@ng-bootstrap/ng-bootstrap';
declare var $: any
@Component({
  selector: 'app-header-items',
  templateUrl: './header-items.component.html',
  styleUrls: ['./header-items.component.scss'],
  animations: [
    trigger('slide_in_out', [
      state('slide_in', style({
        width: '350px',
        // css styles when the element is in slide_in
      })),
      state('slide_out', style({
        width: '0px'
        // css styles when the element is in slide_out
      })),
      // animation effect when transitioning from one state to another
      transition('slide_in <=> slide_out', animate(300))
    ]),
  ]
})
export class HeaderItemsComponent implements OnInit {
  closeResult: any = ''
  slides = [342, 453, 846, 855, 234, 564, 744, 243];

  slideConfig = {
    "slidesToShow": 3,
    "slidesToScroll": 3,
    "dots": true,
    "infinite": false
  };
  constructor(private modalService: NgbModal,
    private offcanvasService: NgbOffcanvas) {

  }
  ngOnInit(): void {
    const mouseTarget = document.querySelector("#mouseTarget");
    // 
  }
  onevnt() {
    console.log('1')
    const mouseTarget = document.querySelector("#mouseTarget");

    this.modalService.open(TopPopupComponent, {
      size: 'xl',
      
    });
  }
  open(content: any) {
    console.log('wwww')
    this.offcanvasService.open(content, { ariaLabelledBy: 'offcanvas-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }
  private getDismissReason(reason: any): string {
    if (reason === OffcanvasDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === OffcanvasDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on the backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  ngAfterViewInit(): void {
    console.clear()
    // this.ready()
  }
  ready() {
    $("#dialog").dialog({
      modal: true,
      autoOpen: false,
      title: "jQuery Dialog",
      width: 300,
      height: 150
    });
    $('#txtPopUp').on('mouseover', function () {
      console.log('eeeeee')
      // if (document.cookie.indexOf("cookies") < 0) {
      //   document.cookie = "cookies=yes; max-age=" + (5 * 365 * 24 * 60 * 60);
      $("#dialog").dialog("open");
      $('.ui-widget-overlay').hide()

      // }
    });
  }
}
