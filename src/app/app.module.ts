import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from 'src/app/layout/layout.module';
import { HomeDashboardComponent } from './home/home-dashboard/home-dashboard.component';
import { HomeModule } from './home/home.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from './material/material.module';
import { NotFoundComponent } from './components/not-found/not-found.component';
// import { TopheaderhoverItemsComponent } from './components/topheaderhover-items/topheaderhover-items.component';
import { PopupHostDirectiveDirective } from './directives/popup-host-directive.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { OfficialtextComponent } from './home/officialtext/officialtext.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { MAT_TABS_CONFIG, MatTabsModule, MatTabsConfig } from '@angular/material/tabs';
const tabConfig: any = {
  animationDuration: '500ms',
  dynamicHeight: true,
  fitInkBarToContent: true,
  // forceHeight: false,
  _MatInkBarPositioner: 'below'
};
@NgModule({
  declarations: [
    AppComponent,
    // TopheaderhoverItemsComponent,
    PopupHostDirectiveDirective
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    HomeModule,
    NgbModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    SlickCarouselModule
    
  ],
  // providers: [
  //   { provide: MAT_TABS_CONFIG, useValue: { animationDuration: 100 }}
  // ]
  bootstrap: [AppComponent],
  exports:[],
  // entryComponents : []
  // entryComponents: [ TopheaderhoverItemsComponent ]
})
export class AppModule { }
