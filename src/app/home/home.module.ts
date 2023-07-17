import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { OfficialtextComponent } from './officialtext/officialtext.component';
import { HomeDashboardComponent } from './home-dashboard/home-dashboard.component';
import { DoYouWantComponent } from './do-you-want/do-you-want.component';
import { SmallChocolatesComponent } from './small-chocolates/small-chocolates.component';
import { PremiumComponent } from './premium/premium.component';
import { ChocolatebarsComponent } from './chocolatebars/chocolatebars.component';
import { NaturalProteinsComponent } from './natural-proteins/natural-proteins.component';
import { ProteinPacksComponent } from './protein-packs/protein-packs.component';
import { GreenhousesComponent } from './greenhouses/greenhouses.component';
import { MAT_TABS_CONFIG, MatTabsModule, MatTabsConfig } from '@angular/material/tabs';
import { SlickCarouselModule } from 'ngx-slick-carousel';

const tabConfig: any = {
  animationDuration: '500ms',
  dynamicHeight: true,
  fitInkBarToContent: true,
  forceHeight: false,
  barPosition: 'below'
};

@NgModule({
  declarations: [
    HomeDashboardComponent,
    OfficialtextComponent,
    DoYouWantComponent,
    SmallChocolatesComponent,
    PremiumComponent,
    ChocolatebarsComponent,
    NaturalProteinsComponent,
    ProteinPacksComponent,
    GreenhousesComponent,
    
  ],
  imports: [
    CommonModule,HomeRoutingModule, MatTabsModule, SlickCarouselModule
  ],
  providers: [
    { provide: MAT_TABS_CONFIG, useValue: tabConfig }
  ]
  // exports:[OfficialtextComponent]
})
export class HomeModule { }
