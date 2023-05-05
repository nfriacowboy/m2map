import { NgModule } from '@angular/core';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MapComponent } from './map.component';
import { MapRoutingModule } from './map-routing.module';

@NgModule({
  declarations: [MapComponent],
  imports: [LeafletModule, MapRoutingModule],
  providers: [],
  bootstrap: [],
})
export class MapModule {}
