import { Component }     from '@angular/core';
import { FilterService } from "../../services/filter.service";


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})


export class FilterComponent {

  constructor(
    public filterService: FilterService) {
  }


  onFilterChange(value: string) {
    this.filterService.updateFilter(value);
  }

}
