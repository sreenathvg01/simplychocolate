import { Component, OnInit } from '@angular/core';
declare var $: any;
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { TopPopupComponent } from '../top-popup/top-popup.component';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss']
})
export class MainHeaderComponent implements OnInit {
  
  constructor(private modalService: NgbModal) {

  }

  ngOnInit(): void {
    // this.initializeJquery()
    // this.onevnt()
  }
  onevnt(){
    const mouseTarget = document.querySelector("#mouseTarget");

    this.modalService.open(TopPopupComponent, { size: 'xl'});
  }
  initializeJquery() {
    $(document).ready(function () {
      $("#my-modal").dialog({
        autoOpen: false,
        modal: true,
        buttons: {
          "Close": function () {
            $(this).dialog("close");
          }
        }
      });

      $("#hover-element").hover(
        function () {
          $("#my-modal").dialog("open");
        },
        function () {
          $("#my-modal").dialog("close");
        }
      );
    });

  }
}
