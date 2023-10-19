import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  swipe$: BehaviorSubject<number> = new BehaviorSubject(
    Hammer.DIRECTION_NONE as number
  );
  constructor() {}

  swipeLeft() {
    this.swipe$.next(Hammer.DIRECTION_LEFT);
  }

  swipeRight() {
    this.swipe$.next(Hammer.DIRECTION_RIGHT);
  }
}
