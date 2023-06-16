import { Injectable }          from '@angular/core';
import { Observable, Subject } from "rxjs";
import { environment }         from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  selectedFilters: Map<string, boolean> = environment.filters;
  private changeFilter = new Subject<string>();

  constructor() {
  }

  updateFilter(value: string) {
    this.selectedFilters.set(value, !this.selectedFilters.get(value));
    this.changeFilter.next(value);
  }

  onFilterChange(): Observable<string> {
    return this.changeFilter.asObservable();
  }
}
