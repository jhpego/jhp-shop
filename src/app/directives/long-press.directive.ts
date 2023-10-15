import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription, fromEvent, switchMap, timer, takeUntil } from 'rxjs';

@Directive({
  selector: '[longPress]',
})
export class LongPressDirective implements OnInit, OnDestroy {
  @Input() duration = 500;
  @Output() longPress = new EventEmitter<void>();

  sub!: Subscription;
  constructor(private el: ElementRef) {}
  ngOnInit(): void {
    const mouseDown$ = fromEvent(this.el.nativeElement, 'mousedown');
    const mouseUp$ = fromEvent(this.el.nativeElement, 'mouseup');
    this.sub = mouseDown$
      .pipe(switchMap(() => timer(this.duration).pipe(takeUntil(mouseUp$))))
      .subscribe(() => this.longPress.emit());
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}

@Directive({
  selector: '[longTouch]',
})
export class LongTouchDirective {
  @Output() longTouch = new EventEmitter<Event>();

  private timer!: number;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.elementRef.nativeElement.addEventListener('touchstart', () => {
      this.timer = setTimeout(() => {
        this.longTouch.emit(new Event('longTouch'));
      }, 500);
    });

    this.elementRef.nativeElement.addEventListener('touchend', () => {
      clearTimeout(this.timer);
    });
  }
}
