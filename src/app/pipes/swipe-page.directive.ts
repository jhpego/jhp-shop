import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Directive,
} from '@angular/core';
import { AppService } from '../services/app.service';

@Component({
  // selector: 'app-swipable',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwipablePageComponent {
  constructor(private appService: AppService, public cdr: ChangeDetectorRef) {
    this.init();
  }

  currPageIdx: number = 0;
  pages: any[] = [];

  ngOnInit() {
    console.log('base ngOnInit');
    this.appService.swipe$.subscribe((swipe) => {
      console.warn('swiped: ', swipe);

      if (swipe == Hammer.DIRECTION_LEFT) {
        if (this.currPageIdx < this.pages.length - 1) {
          this.currPageIdx++;
        } else {
          this.currPageIdx = 0;
        }
      } else if (swipe == Hammer.DIRECTION_RIGHT) {
        if (this.currPageIdx == 0) {
          this.currPageIdx = this.pages.length - 1;
        } else {
          this.currPageIdx--;
        }
      }
      this.cdr.detectChanges();
    });
  }

  init() {}

  get currPage() {
    return this.pages[this.currPageIdx];
  }
}
