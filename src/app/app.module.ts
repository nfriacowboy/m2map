import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule }        from './app-routing.module';
import { AppComponent }            from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeModule }              from "./home/home.module";
import { MaterialModule }          from "./material.model";
import { MapModule }               from "./map/map.module";
import { LayoutComponent }         from './layout/layout.component';
import { FlexLayoutModule }        from "@angular/flex-layout";

@NgModule({
  declarations: [AppComponent, LayoutComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    MapModule,
    HomeModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
