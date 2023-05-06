import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'map',
    loadChildren: () =>
      import('./map/map-routing.module').then((m) => m.MapRoutingModule),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home-routing-module').then((m) => m.HomeRoutingModule),
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
