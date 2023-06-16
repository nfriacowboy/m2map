import { NgModule }                         from '@angular/core';
import { CommonModule, NgOptimizedImage }   from '@angular/common';
import { StartComponent }                   from './start/start.component';
import { ItemComponent }                    from './item/item.component';
import { BrowserAnimationsModule }          from "@angular/platform-browser/animations";
import { BrowserModule }                    from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule }                 from "@angular/common/http";
import { MatNativeDateModule }              from "@angular/material/core";
import { MaterialModule }                   from "../material.model";
import { StartItemComponent }               from './start-item/start-item.component';
import { FlexLayoutModule }                 from "@angular/flex-layout";
import { RouterLink }                       from "@angular/router";
import { LeafletModule }                    from "@asymmetrik/ngx-leaflet";


@NgModule({
  declarations: [
    StartComponent,
    ItemComponent,
    StartItemComponent,

  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    NgOptimizedImage,
    RouterLink,
    LeafletModule
  ]
})
export class HomeModule {
}
