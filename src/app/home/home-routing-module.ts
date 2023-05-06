import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartComponent }       from "./start/start.component";
import { ItemComponent }        from "./item/item.component";

const routes: Routes = [
  {
    path: '',
    component: StartComponent,
    pathMatch: 'full',
  },
  {
    path: 'item',
    component: ItemComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {
}
