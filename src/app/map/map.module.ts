import { NgModule } from '@angular/core';

import { LeafletModule }     from '@asymmetrik/ngx-leaflet';
import { MapComponent }      from './map.component';
import { MapRoutingModule }  from './map-routing.module';
import { MatButtonModule }   from "@angular/material/button";
import { MatIconModule }     from "@angular/material/icon";
import { MatToolbarModule }  from "@angular/material/toolbar";
import { HeaderComponent }   from './components/header/header.component';
import { FilterComponent }   from './components/filter/filter.component';
import { RecenterComponent } from './components/recenter/recenter.component';
import { MaterialModule }    from "../material.model";
import { FormsModule }       from "@angular/forms";
import { FilterSelectorComponent } from './components/filter-selector/filter-selector.component';

@NgModule({
  declarations: [MapComponent, HeaderComponent, FilterComponent, RecenterComponent, FilterSelectorComponent],
  imports: [LeafletModule, MapRoutingModule, MatButtonModule, MatIconModule, MatToolbarModule, MaterialModule, FormsModule],
  providers: [],
  bootstrap: [],
})
export class MapModule {
}
