import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainHeaderComponent } from './main-header/main-header.component';
import { MainFooterComponent } from './main-footer/main-footer.component';
import { MainLayutComponent } from './main-layut/main-layut.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { HeaderItemsComponent } from './header-items/header-items.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { TopPopupComponent } from './top-popup/top-popup.component';
// import { MatDividerModule } from '@angular/material/divider';

// import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [
    MainHeaderComponent,
    MainFooterComponent,
    MainLayutComponent,
    HeaderItemsComponent,
    TopPopupComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([]),
    MaterialModule,
    SlickCarouselModule
  ],
  exports: [MainLayutComponent],
  // entryComponents : [TopPopupComponent],
})
export class LayoutModule { }
