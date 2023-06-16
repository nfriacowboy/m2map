import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent }      from "./layout/layout.component";

const routes: Routes = [

  {
    path: '',
    component: LayoutComponent,
    loadChildren: () =>
      import('./home/home-routing-module').then((m) => m.HomeRoutingModule),
  },
  {
    path: 'map',
    loadChildren: () =>
      import('./map/map-routing.module').then((m) => m.MapRoutingModule),
  }, {
    path: 'map/:trackId',
    loadChildren: () =>
      import('./map/map-routing.module').then((m) => m.MapRoutingModule),
  },
  { path: '**', redirectTo: '' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'top',
  })],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
