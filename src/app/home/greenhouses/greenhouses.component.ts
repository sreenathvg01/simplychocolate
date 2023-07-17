import { Component, OnInit } from '@angular/core';
var $: any
import { MAT_TABS_CONFIG } from '@angular/material/tabs';
const tabConfig: any = {
  animationDuration: '500ms',
  dynamicHeight: true,
  fitInkBarToContent: true,
  forceHeight: false,
  barPosition: 'below'
};
@Component({
  selector: 'app-greenhouses',
  templateUrl: './greenhouses.component.html',
  styleUrls: ['./greenhouses.component.scss']
})
export class GreenhousesComponent implements OnInit {
  tabConfig : any = tabConfig
  ngOnInit(): void {
    this.__runInitializers()
  }
  __runInitializers() {
    $(document).ready(function () {
      $('.tab-a').click(function (this: any) {
        $(".tab").removeClass('tab-active');
        $(".tab[data-id='" + $(this).attr('data-id') + "']").addClass("tab-active");
        $(".tab-a").removeClass('active-a');
        $(this).parent().find(".tab-a").addClass('active-a');
      });
    });
  }
}

