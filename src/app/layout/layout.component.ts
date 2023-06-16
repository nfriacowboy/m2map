import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Location }                                 from "@angular/common";
import { NavigationEnd, Router }                    from "@angular/router";
import { filter }                                   from "rxjs/operators";
import { UntilDestroy, untilDestroyed }             from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  isRootPage = true;
  @ViewChild('contentWrapper', { static: false }) contentWrapper!: ElementRef;

  constructor(private location: Location, private router: Router) {
    this.router.events.pipe(untilDestroyed(this),
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.isRootPage = this.router.url === '/';
    });
  }

  ngOnInit() {
    this.router.events.pipe(untilDestroyed(this),
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // this.contentWrapper.nativeElement.scrollTo(0, 0);
    });
  }


  goBack() {
    this.location.back();
  }
}
