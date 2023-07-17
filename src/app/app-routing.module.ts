import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeDashboardComponent } from './home/home-dashboard/home-dashboard.component';
import { MainLayutComponent } from './layout/main-layut/main-layut.component';
import { OfficialtextComponent } from './home/officialtext/officialtext.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
//   {
//     path: '',
//     component: MainLayutComponent,
//     children: [
//         { path: 'home', component: HomeDashboardComponent },
//         { path: '', component: HomeDashboardComponent }
//     ],
// },
{
  path: '',
  component: MainLayutComponent,
  children: [
            { path: 'home', component: HomeDashboardComponent },
            { path: '', component: HomeDashboardComponent }
        ],
  // loadChildren: () =>
  //     import('./home/home.module').then((m) => m.HomeModule),
},
{
  path: '**',
  component: NotFoundComponent,
  children: [
      { path: '**', component: NotFoundComponent }
  ],
  // component: NotFoundComponent
}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
